package com.example.onboarding.infra;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Component
public class MailManager {
 
    JavaMailSender javaMailSender;
    
    @Value("${spring.mail.username}")
    private String sender;

    public MailManager(JavaMailSender javaMailSender){
        this.javaMailSender = javaMailSender;
    }

    public void sendMessage(String email, String messageEmail){

        MimeMessage message = javaMailSender.createMimeMessage();

        try{
            message.setSubject("Prueba de correo para Onboarding");
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(email);
            helper.setText(messageEmail);
            helper.setFrom(sender);
            javaMailSender.send(message);

        }catch(MessagingException e){
            throw new RuntimeException(e);
        }

    }

    public void sendMessageWithSubject(String email, String messageEmail, String subject){

        MimeMessage message = javaMailSender.createMimeMessage();

        try{
            message.setSubject(subject);
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(email);
            helper.setText(messageEmail);
            helper.setFrom(sender);
            javaMailSender.send(message);

        }catch(MessagingException e){
            throw new RuntimeException(e);
        }

    }

}
