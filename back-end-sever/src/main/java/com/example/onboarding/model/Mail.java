package com.example.onboarding.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Mail {
    
    private String emailUser;
    private String message;
    private String code;

    public String getEmailUser(){
        return this.emailUser;
    }

    public String getMessage(){
        return this.message;
    }

    public String getCode(){
        return this.code;
    }

}
