package com.upp.nc.listener;

import com.upp.nc.service.EmailService;
import org.camunda.bpm.engine.IdentityService;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.camunda.bpm.engine.identity.User;
import org.springframework.stereotype.Service;

@Service("sendMailAuthorMainEditor")
public class SendMailAuthorMainEditor implements JavaDelegate {
    private final IdentityService identityService;
    private final EmailService emailService;

    public SendMailAuthorMainEditor(IdentityService identityService, EmailService emailService) {
        this.identityService = identityService;
        this.emailService = emailService;
    }

    @Override
    public void execute(DelegateExecution delegateExecution) throws Exception {
        String author = (String) delegateExecution.getVariable("initiator");
        String mainEditor = (String) delegateExecution.getVariable("glavni_urednik");

        User authorUser = this.identityService.createUserQuery().userId(author).singleResult();
        User mainEditorUser = this.identityService.createUserQuery().userId(mainEditor).singleResult();

        sendMail(authorUser.getEmail());
        sendMail(mainEditorUser.getEmail());

    }

    private void sendMail(String email) {
        String subject = "Obrada rada";

        StringBuilder message = new StringBuilder();
        message.append("Rad je poslat na obradu glavnom uredniku");
        message.append("\n\n");
        message.append("Naucna centrala");
        this.emailService.sendMail(email, subject, message.toString());
    }
}
