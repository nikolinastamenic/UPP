package com.upp.nc.listener;

import com.upp.nc.service.EmailService;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("sendMailInvalidRegistrationData")
public class SendMailInvalidRegistrationData implements JavaDelegate {

    private final EmailService emailService;


    @Autowired
    public SendMailInvalidRegistrationData(EmailService emailService) {
        this.emailService = emailService;
    }

    @Override
    public void execute(DelegateExecution delegateExecution) throws Exception {
        String processInstanceId = delegateExecution.getProcessInstance().getProcessInstanceId();

        String email = delegateExecution.getVariable("email").toString();
        String subject = "Nevalidni podaci";

        StringBuilder message = new StringBuilder();
        message.append("Podaci za registraciju nisu validni!");
        message.append("\n\n");
        message.append("Naucna centrala");
        this.emailService.sendMail(email, subject, message.toString());
    }
}
