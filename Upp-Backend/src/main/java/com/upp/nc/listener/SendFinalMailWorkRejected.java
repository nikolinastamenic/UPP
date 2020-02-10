package com.upp.nc.listener;

import com.upp.nc.service.EmailService;
import org.camunda.bpm.engine.IdentityService;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.camunda.bpm.engine.identity.User;
import org.springframework.stereotype.Service;

@Service("sendFinalMailWorkRejected")
public class SendFinalMailWorkRejected implements JavaDelegate {
    private final IdentityService identityService;
    private final EmailService emailService;

    public SendFinalMailWorkRejected(IdentityService identityService, EmailService emailService) {
        this.identityService = identityService;
        this.emailService = emailService;
    }

    @Override
    public void execute(DelegateExecution delegateExecution) throws Exception {
        String author = (String) delegateExecution.getVariable("initiator");
        User authorUser = this.identityService.createUserQuery().userId(author).singleResult();

        String email = authorUser.getEmail();
        String subject = "Rad je odbijen";

        StringBuilder message = new StringBuilder();
        message.append("Rad je odbijen!");
        message.append("\n\n");
        message.append("Naucna centrala");
        this.emailService.sendMail(email, subject, message.toString());
    }
}
