package com.example.onboarding.service;

import org.springframework.stereotype.Service;

import com.example.onboarding.infra.MailManager;

@Service
public class MailService {
    
    MailManager mailManager;

    public MailService(MailManager mailManager){
        this.mailManager = mailManager;
    }

    public void sendMessageUser(String email, String message){
        mailManager.sendMessage(email, message);
    }

    public void sendMessageUserWithSubject(String email, String message, String subject){
        mailManager.sendMessageWithSubject(email, message, subject);
    }

}
