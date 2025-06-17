package com.example.onboarding.model;

public  class WelcomeEmailRequest {
    private String email;
    private String message;
    private String collaboratorName;

    // Getters y Setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    
    public String getCollaboratorName() { return collaboratorName; }
    public void setCollaboratorName(String collaboratorName) { this.collaboratorName = collaboratorName; }
}