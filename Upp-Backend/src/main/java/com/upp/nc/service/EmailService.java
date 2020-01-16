package com.upp.nc.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmailService {
    private final JavaMailSender javaMailSender;

    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @Async
    public void sendMail(String to, String subject, String message) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setSubject(subject);
        msg.setText(message);
        msg.setTo(to);
        System.out.println("To: ".concat(to));
        javaMailSender.send(msg);
    }
}
