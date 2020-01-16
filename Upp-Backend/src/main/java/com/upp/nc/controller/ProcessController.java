package com.upp.nc.controller;

import com.upp.nc.dto.FormFieldsDto;
import com.upp.nc.dto.FormSubmissionDto;
import org.camunda.bpm.engine.*;
import org.camunda.bpm.engine.form.FormField;
import org.camunda.bpm.engine.form.TaskFormData;
import org.camunda.bpm.engine.runtime.ProcessInstance;
import org.camunda.bpm.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping(path = "/start/{processId}", produces = "application/json")
    public @ResponseBody FormFieldsDto get(@PathVariable String processId) {
        //provera da li korisnik sa id-jem pera postoji
        //List<User> users = identityService.createUserQuery().userId("pera").list();
        ProcessInstance pi = runtimeService.startProcessInstanceByKey(processId);

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
        Task task = taskService.createTaskQuery().processInstanceId(processInstanceId).list().get(0);

        TaskFormData tfd = formService.getTaskFormData(task.getId());
        List<FormField> properties = tfd.getFormFields();
        for(FormField fp : properties) {
            System.out.println(fp.getId() + fp.getType());
        }

        return new FormFieldsDto(task.getId(), processInstanceId, properties, task.getTaskDefinitionKey());
    }

    @PostMapping(path = "/post/{processInstanceId}", produces = "application/json")
    public @ResponseBody
    ResponseEntity post(@RequestBody List<FormSubmissionDto> dto, @PathVariable String processInstanceId) {
        HashMap<String, Object> map = this.mapListToDto(dto);

        // list all running/unsuspended instances of the process
//		    ProcessInstance processInstance =
//		        runtimeService.createProcessInstanceQuery()
//		            .processDefinitionKey("Process_1")
//		            .active() // we only want the unsuspended process instances
//		            .list().get(0);

//			Task task = taskService.createTaskQuery().processInstanceId(processInstance.getId()).list().get(0);


        Task task = taskService.createTaskQuery().processInstanceId(processInstanceId).list().get(0);
//        Task task = taskService.createTaskQuery().taskId(taskId).singleResult();
//        String processInstanceId = task.getProcessInstanceId();
        runtimeService.setVariable(processInstanceId, "registration", dto);
        try {
            formService.submitTaskForm(task.getId(), map);
        } catch(RuntimeException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    private HashMap<String, Object> mapListToDto(List<FormSubmissionDto> list)
    {
        HashMap<String, Object> map = new HashMap<String, Object>();
        for(FormSubmissionDto temp : list){
            map.put(temp.getFieldId(), temp.getFieldValue());
        }

        return map;
    }
}
