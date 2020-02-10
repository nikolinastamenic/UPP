package com.upp.nc.listener;

import com.upp.nc.service.EmailService;
import org.camunda.bpm.engine.IdentityService;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.camunda.bpm.engine.identity.User;
import org.springframework.stereotype.Service;

@Service("sendMailWorkAccepted")
public class SendMailWorkAcceptedDelegate implements JavaDelegate {

    private final IdentityService identityService;
    private final EmailService emailService;

    public SendMailWorkAcceptedDelegate(IdentityService identityService, EmailService emailService) {
        this.identityService = identityService;
        this.emailService = emailService;
    }

    @Override
    public void execute(DelegateExecution delegateExecution) throws Exception {
        String author = (String) delegateExecution.getVariable("initiator");
        User authorUser = this.identityService.createUserQuery().userId(author).singleResult();

        String email = authorUser.getEmail();
        String subject = "Uspesna registracija";

        StringBuilder message = new StringBuilder();
        message.append("Registracija naucnog rada je uspesno izvrsena!");
        message.append("\n\n");
        message.append("Naucna centrala");
        this.emailService.sendMail(email, subject, message.toString());

    }
}
