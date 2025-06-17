package com.example.onboarding.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.onboarding.model.*;
import com.example.onboarding.service.MailService;

@RestController
@RequestMapping("/mail")
@CrossOrigin("*")
public class MailController {

    private final MailService mailService;

    public MailController(MailService mailService){
        this.mailService = mailService;
    }
    
    @PostMapping("/send")
    public ResponseEntity<Object> sendEmail(@RequestBody Mail mailToSend){
        try {
            mailService.sendMessageUser(mailToSend.getEmailUser(), mailToSend.getMessage());
            return ResponseEntity.ok()
                .body("Correo enviado exitosamente.");
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body("Error al enviar correo: " + e.getMessage());
        }
    }

    @PostMapping("/send-welcome")
    public ResponseEntity<Object> sendWelcomeEmail(@RequestBody WelcomeEmailRequest request){
        try {
            String subject = "¡Bienvenido/a a la empresa! - Información de Onboarding";
            mailService.sendMessageUserWithSubject(
                request.getEmail(), 
                request.getMessage(), 
                subject
            );
            return ResponseEntity.ok()
                .body("Correo de bienvenida enviado exitosamente.");
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body("Error al enviar correo de bienvenida: " + e.getMessage());
        }
    }

    @PostMapping("/send-alert")
    public ResponseEntity<Object> sendAlertEmail(@RequestBody AlertEmailRequest request){
        try {
            String subject = "🔔 ALERTA - Onboarding próximo: " + request.getCollaboratorName();
            mailService.sendMessageUserWithSubject(
                request.getEmail(), 
                request.getMessage(), 
                subject
            );
            return ResponseEntity.ok()
                .body("Alerta de onboarding enviada exitosamente.");
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body("Error al enviar alerta: " + e.getMessage());
        }
    }
}