package com.example.onboarding.model;

import java.io.Serializable;
import java.sql.Date;
import java.text.SimpleDateFormat;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "collaborator")
public class Collaborator implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String mail;
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date admissionDate;
    private boolean welcomeOnboardingState;
    private boolean technicalOnboardingState;
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date assignedTechinicalOnboardingDate;
    public Collaborator(){}
    public Collaborator(String name, String mail, Date admissionDate, boolean welcomeOnboardingState, boolean technicalOnboardingState, Date assignedTechinicalOnboardingDate) {
        this.name = name;
        this.mail = mail;
        this.admissionDate = admissionDate;
        this.welcomeOnboardingState = welcomeOnboardingState;
        this.technicalOnboardingState = technicalOnboardingState;
        this.assignedTechinicalOnboardingDate = assignedTechinicalOnboardingDate;
    }
    public Long getId(){
        return this.id;
    }
    public String getName(){
        return this.name;
    }
    public String getMail(){
        return this.mail;
    }
    public Date getAdmissionDate(){
        return this.admissionDate;
    }
    public boolean getWelcomeOnboardingState(){
        return this.welcomeOnboardingState;
    }
    public Boolean getTechnicalOnboardingState(){
        return this.technicalOnboardingState;
    }
    public Date getAssignedTechinicalOnboardingDate(){
        return this.assignedTechinicalOnboardingDate;
    }
    public void setId(Long id){
        this.id = id;
    }
    public void setName(String name){
        this.name = name;
    }
    public void setMail(String mail){
        this.mail = mail;
    }
    public void setAdmissionDate(Date admissionDate){
        this.admissionDate = admissionDate;
    }
    public void setWelcomeOnboardingState(boolean welcomeOnboardingState){
        this.welcomeOnboardingState = welcomeOnboardingState;
    }
    public void setTechnicalOnboardingState(Boolean technicalOnboardingState){
        this.technicalOnboardingState = technicalOnboardingState;
    }
    public void setAssignedTechinicalOnboardingDate(Date assignedTechinicalOnboardingDate){
        this.assignedTechinicalOnboardingDate = assignedTechinicalOnboardingDate;
    }
    @Override
    public String toString() {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        String formattedAdmissionDate = formatter.format(admissionDate);
        String formattedAssignedTechinicalOnboardingDate = formatter.format(assignedTechinicalOnboardingDate);

        return String.format(
            "Collaborator[id=%d, name='%s', mail='%s', admissionDate='%s', welcomeOnboardingState=%b, technicalOnboardingState=%b, assignedTechinicalOnboardingDate='%s']",
            id, name, mail, formattedAdmissionDate, welcomeOnboardingState, technicalOnboardingState, formattedAssignedTechinicalOnboardingDate
        );
    }
}