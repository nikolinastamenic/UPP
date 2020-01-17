package com.upp.nc.controller;

import com.upp.nc.dto.AssignedTasksDto;
import com.upp.nc.dto.FormFieldsDto;
import com.upp.nc.dto.FormSubmissionDto;
import com.upp.nc.dto.UserDto;
import org.camunda.bpm.engine.*;
import org.camunda.bpm.engine.form.FormField;
import org.camunda.bpm.engine.form.TaskFormData;
import org.camunda.bpm.engine.identity.Group;
import org.camunda.bpm.engine.identity.User;
import org.camunda.bpm.engine.runtime.ProcessInstance;
import org.camunda.bpm.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Controller
@RequestMapping("/process")
@CrossOrigin(value = "http://localhost:4200")
public class ProcessController {

    @Autowired
    IdentityService identityService;

    @Autowired
    private RuntimeService runtimeService;

    @Autowired
    private RepositoryService repositoryService;

    @Autowired
    TaskService taskService;

    @Autowired
    FormService formService;

    @GetMapping(path = "/start/{processId}/{userId}", produces = "application/json")
    public @ResponseBody FormFieldsDto get(@PathVariable String processId, @PathVariable String userId) {
        //provera da li korisnik sa id-jem pera postoji
        //List<User> users = identityService.createUserQuery().userId("pera").list();
        ProcessInstance pi = runtimeService.startProcessInstanceByKey(processId);
        runtimeService.setVariable(pi.getId(), "initiator", userId);
        Task task = taskService.createTaskQuery().processInstanceId(pi.getId()).list().get(0);

        TaskFormData tfd = formService.getTaskFormData(task.getId());
        List<FormField> properties = tfd.getFormFields();
        for(FormField fp : properties) {
            System.out.println(fp.getId() + fp.getType());
        }

        return new FormFieldsDto(task.getId(), pi.getId(), properties, task.getTaskDefinitionKey());
    }

    @GetMapping(path = "/get/{taskId}/{processInstanceId}", produces = "application/json")
    public @ResponseBody FormFieldsDto getFormForTask(@PathVariable String taskId, @PathVariable String processInstanceId) {
        //provera da li korisnik sa id-jem pera postoji
        //List<User> users = identityService.createUserQuery().userId("pera").list();

        Task task = taskService.createTaskQuery().processInstanceId(processInstanceId).list().get(0);
      //  Task task = taskService.createTaskQuery().taskDefinitionKey(taskId).singleResult();
        TaskFormData tfd = formService.getTaskFormData(task.getId());
        List<FormField> properties = tfd.getFormFields();
        for(FormField fp : properties) {
            System.out.println(fp.getId() + fp.getType());
        }

        return new FormFieldsDto(task.getId(), processInstanceId, properties, task.getTaskDefinitionKey());
    }

    @GetMapping(path = "/get-active/{processInstanceId}", produces = "application/json")
    public @ResponseBody FormFieldsDto getActiveTask(@PathVariable String processInstanceId) {
        if (taskService.createTaskQuery().processInstanceId(processInstanceId).list().size() == 0)
        {
            return null;
        }
        Task task = taskService.createTaskQuery().processInstanceId(processInstanceId).list().get(0);

        TaskFormData tfd = formService.getTaskFormData(task.getId());
        List<FormField> properties = tfd.getFormFields();
        for(FormField fp : properties) {
            System.out.println(fp.getId() + fp.getType());
        }

        return new FormFieldsDto(task.getId(), processInstanceId, properties, task.getTaskDefinitionKey());
    }

    @PostMapping(path = "/post/{processInstanceId}/{initiator}", produces = "application/json")
    public @ResponseBody
    ResponseEntity post(@RequestBody List<FormSubmissionDto> dto, @PathVariable String processInstanceId, @PathVariable String initiator) {
        HashMap<String, Object> map = this.mapListToDto(dto);

        Task task = taskService.createTaskQuery().processInstanceId(processInstanceId).list().get(0);
//        if (task.getAssignee() == null) {
//            task.setAssignee(userId);
//        }
        try {
            formService.submitTaskForm(task.getId(), map);
            if (taskService.createTaskQuery().processInstanceId(processInstanceId).list().size() != 0) {
                task = taskService.createTaskQuery().processInstanceId(processInstanceId).list().get(0);
                if (task.getAssignee() == null) {
                    if (task.getTaskDefinitionKey().equals("Ispravak_podataka")) {
                        task.setAssignee((runtimeService.getVariable(processInstanceId, "initiator")).toString());
                    } else {
                        task.setAssignee(initiator);
                    }
                    taskService.saveTask(task);
                }
            }
        } catch(RuntimeException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(path = "/get-assigned-tasks/{userId}", produces = "application/json")
    public @ResponseBody List<AssignedTasksDto> getAssignedTasks(@PathVariable String userId) {
      //  String userId = identityService.getCurrentAuthentication().getUserId();

        List<ProcessInstance> processInstances = runtimeService.createProcessInstanceQuery().active().list();

        List<AssignedTasksDto> assignedTasksDtos = new ArrayList<>();
        for (ProcessInstance processInstance : processInstances) {
            List<Task> tasks = taskService.createTaskQuery().processInstanceId(processInstance.getId()).active().list();
            if (tasks.size() != 0) {
                Task task = tasks.get(0);
                if (task.getAssignee() != null) {
                    if (task.getAssignee().equals(userId)) {
                        assignedTasksDtos.add(new AssignedTasksDto(processInstance.getId(), task.getTaskDefinitionKey()));
                    }
                }
            }
        }

        return assignedTasksDtos;
    }

    private HashMap<String, Object> mapListToDto(List<FormSubmissionDto> list)
    {
        HashMap<String, Object> map = new HashMap<String, Object>();
        for(FormSubmissionDto temp : list){
            map.put(temp.getFieldId(), temp.getFieldValue());
        }

        return map;
    }

    @GetMapping(path = "/editor", produces = "application/json")
    public @ResponseBody List<UserDto> getUrednici() {

        List<User> users = this.identityService.createUserQuery().list();
        List<UserDto> urednici = new ArrayList<>();

        for (User userTemp : users) {
            if (userTemp.getId().startsWith("editor")) {
                urednici.add(new UserDto(userTemp.getId(), userTemp.getFirstName(), userTemp.getLastName(), userTemp.getEmail()));
//                identityService.createMembership(userTemp.getId(), "editors");
            }
        }
        return urednici;
    }

    @GetMapping(path = "/reviewer", produces = "application/json")
    public @ResponseBody List<UserDto> getRecenzenti() {
        List<User> users = this.identityService.createUserQuery().list();
        List<UserDto> recenzenti = new ArrayList<>();

        for (User userTemp : users) {
            if (userTemp.getId().startsWith("recenzent")) {
                recenzenti.add(new UserDto(userTemp.getId(), userTemp.getFirstName(), userTemp.getLastName(), userTemp.getEmail()));
              //  identityService.createMembership(userTemp.getId(), "reviewers");
            }
        }
        return recenzenti;
    }
}
