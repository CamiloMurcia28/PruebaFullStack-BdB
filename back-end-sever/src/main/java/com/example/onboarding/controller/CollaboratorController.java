package com.example.onboarding.controller;

import java.util.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.onboarding.service.*;
import com.example.onboarding.model.*;

@RestController
@RequestMapping("/api/collaborators")
@CrossOrigin("*")
public class CollaboratorController {
    
    private static final Logger logger = LoggerFactory.getLogger(CollaboratorController.class);
    private final CollaboratorService collaboratorService;

    @Autowired
    public CollaboratorController(CollaboratorService collaboratorService){
        this.collaboratorService = collaboratorService;
    }
    @GetMapping
    public List<Collaborator> getAllCollaborators(){
        logger.info("GET /api/collaborators - Obteniendo todos los colaboradores");
        List<Collaborator> collaborators = collaboratorService.findAll();
        return collaborators;
    }
    @GetMapping("/{id}")
    public ResponseEntity<Collaborator> getCollaboratorById(@PathVariable Long id){
        logger.info("GET /api/collaborators/{} - Obteniendo colaborador por ID", id);
        Collaborator collaborator = collaboratorService.getCollaboratorById(id);
        if(collaborator != null){
            return new ResponseEntity<>(collaborator, HttpStatus.OK);
        }
        
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @PostMapping(value = "/create")
    public ResponseEntity<Collaborator> createCollaborator(@RequestBody Collaborator collaborator) {
        logger.info("POST /api/collaborators/create - Creando nuevo colaborador");
        collaboratorService.createCollaborator(collaborator);

        return new ResponseEntity<>(collaborator,HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Collaborator> updateCollaborator(@PathVariable Long id, @RequestBody Collaborator collaboratorDetails) {
        logger.info("PUT /api/collaborators/{} - Actualizando colaborador", id);
        collaboratorService.updateCollaborator(id, collaboratorDetails);
        Collaborator updatedCollaborator = collaboratorService.getCollaboratorById(id);
        return ResponseEntity.ok(updatedCollaborator);
    }
    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteCollaborator(@PathVariable Long id) {
        logger.info("DELETE /api/collaborators/{} - Eliminando colaborador", id);
        collaboratorService.deleteCollaborator(id);
        
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/search")
    public ResponseEntity<List<Collaborator>> searchCollaborator(
                                @RequestParam(required = false) String searchTerm,
                                @RequestParam(required = false) Boolean welcomeOnboardingState,
                                @RequestParam(required = false) Boolean technicalOnboardingState) {
        logger.info("GET /api/collaborators/search - Buscando colaboradores con filtros - searchTerm: {}, welcomeOnboarding: {}, technicalOnboarding: {}", 
                searchTerm, welcomeOnboardingState, technicalOnboardingState);
        List<Collaborator> collaborators = collaboratorService.searchCollaborator(searchTerm, welcomeOnboardingState, technicalOnboardingState);
        
        logger.info("Encontrados {} colaboradores que cumplen los criterios", collaborators.size());
        return ResponseEntity.ok(collaborators);
    }
}
