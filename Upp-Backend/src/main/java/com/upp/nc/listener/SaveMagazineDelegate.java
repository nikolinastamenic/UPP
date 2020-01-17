package com.upp.nc.listener;

import com.upp.nc.model.Magazine;
import com.upp.nc.repository.MagazineRepository;
import org.camunda.bpm.engine.*;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.camunda.bpm.engine.identity.User;
import org.camunda.bpm.engine.runtime.ProcessInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("createMagazine")
public class SaveMagazineDelegate implements JavaDelegate {


    private final MagazineRepository magazineRepository;
    IdentityService identityService;

    private final RuntimeService runtimeService;

    private final RepositoryService repositoryService;

    private final TaskService taskService;

    private final FormService formService;

    @Autowired
    public SaveMagazineDelegate(MagazineRepository magazineRepository, RuntimeService runtimeService, RepositoryService repositoryService, TaskService taskService, FormService formService) {
        this.magazineRepository = magazineRepository;
        this.runtimeService = runtimeService;
        this.repositoryService = repositoryService;
        this.taskService = taskService;
        this.formService = formService;
    }

    @Override
    public void execute(DelegateExecution delegateExecution) throws Exception {

        String processInstanceId = delegateExecution.getProcessInstance().getProcessInstanceId();
        ProcessInstance processInstance = runtimeService.createProcessInstanceQuery().processInstanceId(processInstanceId).singleResult();

        Magazine magazine = new Magazine();

        magazine.setNaziv(runtimeService.getVariable(processInstanceId, "naziv").toString());
        magazine.setGlavniUrednik(runtimeService.getVariable(processInstanceId, "initiator").toString());
        magazine.setISSNBroj(runtimeService.getVariable(processInstanceId, "ISSN_broj").toString());
        magazine.setNacinNaplacivanja(runtimeService.getVariable(processInstanceId, "nacin_naplacivanja").toString());
        magazine.getNaucneOblasti().add(runtimeService.getVariable(processInstanceId, "naucna_oblast").toString());

        magazine.getUrednici().add(runtimeService.getVariable(processInstanceId, "urednik1").toString());
        if(runtimeService.getVariable(processInstanceId, "urednik2") != null) {magazine.getUrednici().add(runtimeService.getVariable(processInstanceId, "urednik2").toString());}

        magazine.getRecenzenti().add(runtimeService.getVariable(processInstanceId, "recenzent1").toString());
        if(runtimeService.getVariable(processInstanceId, "recenzent2") != null) {magazine.getRecenzenti().add(runtimeService.getVariable(processInstanceId, "recenzent2").toString());}

        this.magazineRepository.save(magazine);

    }
}
