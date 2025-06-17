package com.example.onboarding.exception;

public class CollaboratorNotFoundException extends RuntimeException {
    public CollaboratorNotFoundException(String message) {
        super(message);
    }
    
    public CollaboratorNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
    
    public static CollaboratorNotFoundException byId(Long id) {
        return new CollaboratorNotFoundException("Colaborador no encontrado con ID: " + id);
    }
}
