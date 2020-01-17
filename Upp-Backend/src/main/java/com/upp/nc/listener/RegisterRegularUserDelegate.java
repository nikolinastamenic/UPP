package com.upp.nc.listener;

import com.upp.nc.repository.MagazineRepository;
import com.upp.nc.repository.UserRepository;
import org.camunda.bpm.engine.*;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.camunda.bpm.engine.identity.User;
import org.camunda.bpm.engine.runtime.ProcessInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("registerUser")
public class RegisterRegularUserDelegate implements JavaDelegate {

    private final MagazineRepository magazineRepository;

    private final IdentityService identityService;

    private final RuntimeService runtimeService;

    private final RepositoryService repositoryService;

    private final TaskService taskService;

    private final FormService formService;

    private final UserRepository userRepository;


    @Autowired
    public RegisterRegularUserDelegate(MagazineRepository magazineRepository, IdentityService identityService, RuntimeService runtimeService, RepositoryService repositoryService, TaskService taskService, FormService formService, UserRepository userRepository) {
        this.magazineRepository = magazineRepository;
        this.identityService = identityService;
        this.runtimeService = runtimeService;
        this.repositoryService = repositoryService;
        this.taskService = taskService;
        this.formService = formService;
        this.userRepository = userRepository;
    }

    @Override
    public void execute(DelegateExecution delegateExecution) throws Exception {
        String processInstanceId = delegateExecution.getProcessInstance().getProcessInstanceId();
        ProcessInstance processInstance = runtimeService.createProcessInstanceQuery().processInstanceId(processInstanceId).singleResult();

        identityService.clearAuthentication();
        Object username = runtimeService.getVariable(processInstanceId, "username");
        Object ime = runtimeService.getVariable(processInstanceId, "ime");
        Object prezime = runtimeService.getVariable(processInstanceId, "prezime");
        Object email = runtimeService.getVariable(processInstanceId, "email");
        Object password = runtimeService.getVariable(processInstanceId, "password");
        Object grad = runtimeService.getVariable(processInstanceId, "grad");
        Object drzava = runtimeService.getVariable(processInstanceId, "drzava");
        Object titula = runtimeService.getVariable(processInstanceId, "titula");
        Object naucnaOblast = runtimeService.getVariable(processInstanceId, "FormField_0cggv01");

        com.upp.nc.model.User myUser = new com.upp.nc.model.User();

        User singleResult = identityService.createUserQuery().userId(username.toString()).singleResult();
        if (singleResult != null) {
            return;
        }

        User camundaUser = identityService.newUser(username.toString());
        if (ime != null) {
            camundaUser.setFirstName(ime.toString());
            myUser.setIme(ime.toString());
        }
        if (prezime != null) {
            camundaUser.setLastName(prezime.toString());
            myUser.setPrezime(prezime.toString());
        }
        if (email != null) {
            camundaUser.setEmail(email.toString());
            myUser.setEmail(email.toString());
        }
        if (password != null) {
            camundaUser.setPassword(password.toString());
            myUser.setPassword(password.toString());
        }
        if (grad != null) {
            myUser.setGrad(grad.toString());
        }
        if (drzava != null) {
            myUser.setDrzava(drzava.toString());
        }
        if (titula != null) {
            myUser.setTitula(titula.toString());
        }
        if (naucnaOblast != null) {
            myUser.getNaucneOblasti().add(naucnaOblast.toString());
        }
        identityService.saveUser(camundaUser);
        userRepository.save(myUser);
    }
}
