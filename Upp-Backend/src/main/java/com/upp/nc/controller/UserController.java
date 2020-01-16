package com.upp.nc.controller;

import com.upp.nc.dto.LoginDto;
import org.camunda.bpm.engine.*;
import org.camunda.bpm.engine.form.FormField;
import org.camunda.bpm.engine.form.TaskFormData;
import org.camunda.bpm.engine.identity.User;
import org.camunda.bpm.engine.runtime.ProcessInstance;
import org.camunda.bpm.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/user")
@CrossOrigin(value = "http://localhost:4200")
public class UserController {

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

    @PostMapping(path = "/login")
    public ResponseEntity login(@RequestBody LoginDto loginDto) {

        boolean authentication = identityService.checkPassword(loginDto.getUsername(), loginDto.getPassword());
        if (authentication) {
            identityService.setAuthenticatedUserId(loginDto.getUsername());
            Map<String, String> map = new HashMap<>();

            if (loginDto.getUsername().equals("demo")) {
                map.put("role", "admin");
            } else {
                map.put("role", "author");
            }
            return ResponseEntity.ok(map);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

    }


//    @PostMapping(path = "/register")
//    public ResponseEntity login(@PathVariable String processId) {
//
//        boolean authentication = identityService.checkPassword(loginDto.getUsername(), loginDto.getPassword());
//        if (authentication) {
//            identityService.setAuthenticatedUserId(loginDto.getUsername());
//            Map<String, String> map = new HashMap<>();
//
//            if (loginDto.getUsername().equals("demo")) {
//                map.put("role", "admin");
//            } else {
//                map.put("role", "author");
//            }
//            return ResponseEntity.ok(map);
//        }
//        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//
//    }



}
