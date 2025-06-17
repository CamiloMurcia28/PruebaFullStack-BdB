package com.example.onboarding;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

import java.util.Collections;
@SpringBootApplication
@EnableCaching
public class CollaboratorOnboardingApplication {

	public static void main(String[] args) {
        SpringApplication app = new SpringApplication(CollaboratorOnboardingApplication.class);
        app.setDefaultProperties(Collections.singletonMap("server.port", getPort()));
        
        app.run(args);
    }
    private static int getPort() {
        String port = System.getenv("PORT");
        if (port != null) {
            return Integer.parseInt(port);
        }
        return 9000;
    }
}
