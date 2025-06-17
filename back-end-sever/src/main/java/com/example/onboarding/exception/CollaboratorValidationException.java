package com.example.onboarding.exception;

public class CollaboratorValidationException extends RuntimeException {
    public CollaboratorValidationException(String message) {
        super(message);
    }
    
    public CollaboratorValidationException(String message, Throwable cause) {
        super(message, cause);
    }
}