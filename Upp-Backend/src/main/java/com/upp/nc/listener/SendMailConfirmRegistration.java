package com.upp.nc.listener;

import com.upp.nc.service.EmailService;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.ExecutionListener;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;


@Service("sendMailConfirmRegistration")
public class SendMailConfirmRegistration implements JavaDelegate {

    private final EmailService emailService;

    @Autowired
    public SendMailConfirmRegistration(EmailService emailService) {
        this.emailService = emailService;
    }

    @Override
    public void execute(DelegateExecution delegateExecution) throws Exception {
//        engineServices = execution.getProcessEngineServices();
        String processInstanceId = delegateExecution.getProcessInstance().getProcessInstanceId();
//        def processDefinitionKey = engineServices .getRepositoryService().getProcessDefinition(superExecution.getProcessDefinitionId()).getKey();

        String email = delegateExecution.getVariable("email").toString();
        String subject = "Potvrda registracije";

        StringBuilder message = new StringBuilder();
        message.append("Potvrdite registraciju:  ");
        message.append("\n\n");
        message.append("http://localhost:4200/potvrda-registracije/"+processInstanceId+"\n\n");
        message.append("Naucna centrala");
        this.emailService.sendMail(email, subject, message.toString());


    }
}
