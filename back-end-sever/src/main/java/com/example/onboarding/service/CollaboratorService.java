package com.example.onboarding.service;

import java.util.List;
import java.util.stream.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.onboarding.persistence.CollaboratorPersistence;
import com.example.onboarding.exception.CollaboratorNotFoundException;
import com.example.onboarding.exception.CollaboratorValidationException;
import com.example.onboarding.exception.DatabaseException;
import com.example.onboarding.model.*;

@Service
@Transactional
public class CollaboratorService { 

    private static final Logger logger = LoggerFactory.getLogger(CollaboratorService.class);
    private final CollaboratorPersistence collaboratorPersistence;

    @Autowired
    public CollaboratorService(CollaboratorPersistence collaboratorPersistence){
        this.collaboratorPersistence = collaboratorPersistence;
    }
    @Transactional(readOnly = true)
    public List<Collaborator> findAll(){
        try {
            logger.info("Obteniendo todos los colaboradores");
            return this.collaboratorPersistence.findAll();
        } catch (DatabaseException e) {
            logger.error("Error al obtener todos los colaboradores",e);
            throw new DatabaseException("Error al obtener la lista de colaboradores", e);
        }
    }
    @Transactional(readOnly = true)
    public Collaborator getCollaboratorById(Long id){
        try {
            validateId(id);
            logger.info("Buscando colaborador con ID: {}", id);
            return collaboratorPersistence.findById(id)
                .orElseThrow(()-> CollaboratorNotFoundException.byId(id));
        } catch (DatabaseException e) {
            logger.error("Error al buscar colaborador con ID: {}",id, e);
            throw new DatabaseException("Error al buscar al colaborador", e);
        }
    }
    public Collaborator createCollaborator(Collaborator collaborator){
        try {
            logger.info("Creando nuevo colaborador: {}", collaborator.getName());
            return collaboratorPersistence.save(collaborator);
        } catch (DatabaseException e) {
            logger.error("Error al crear colaborador {}",collaborator.getName(), e);
            throw new DatabaseException("Error al crear colaborador", e);
        }
    }
    public Collaborator updateCollaborator(Long id, Collaborator collaboratorDetails){

        logger.info("llega: " +collaboratorDetails);

        try {
            logger.info("Actualizando colaborador con ID{}",id);

            Collaborator collaborator = collaboratorPersistence.findById(id)
                .orElseThrow(()->CollaboratorNotFoundException.byId(id));
            collaborator.setName(collaboratorDetails.getName());
            collaborator.setMail(collaboratorDetails.getMail());
            collaborator.setAdmissionDate(collaboratorDetails.getAdmissionDate());
            collaborator.setAssignedTechinicalOnboardingDate(collaboratorDetails.getAssignedTechinicalOnboardingDate());
            collaborator.setWelcomeOnboardingState(collaboratorDetails.getWelcomeOnboardingState());
            collaborator.setTechnicalOnboardingState(collaboratorDetails.getTechnicalOnboardingState());

            logger.info("sale: " +collaboratorDetails);
            return collaboratorPersistence.save(collaborator);

        } catch (CollaboratorNotFoundException e) {
            throw e;
        } catch (DatabaseException e){
            logger.error("Error al actualizar colaborador con ID" , id, e);
            throw new DatabaseException("Error al actualizar el colaborador",e);
        }
    }
    public void deleteCollaborator(Long id){
        validateId(id);

        try {
            logger.info("Borrando registro colaborador con ID: {}", id);

            if(!collaboratorPersistence.existsById(id)){
                throw CollaboratorNotFoundException.byId(id);
            }

            collaboratorPersistence.deleteById(id);
        } catch (Exception e) {
            logger.error("Error borrando registro de colaborador con ID: {}", id, e);
            throw new DatabaseException("Error al borrar registro del colaborador",e);
        }
    }
    @Transactional(readOnly = true)
    public List<Collaborator> searchCollaborator(String searchTerm, Boolean welcomeOnboardingState, Boolean technicalOnboardingState){
        try {
            logger.info("Buscando colaboradores con criterios - Término: {}, Welcome: {}, Technical: {}", 
                    searchTerm, welcomeOnboardingState, technicalOnboardingState);
            List<Collaborator> collaborators = collaboratorPersistence.findAll();

            return collaborators.stream()
                    .filter(collaborator -> matchesString(collaborator, searchTerm) &&
                            welcomeOnboardingCompleted(collaborator, welcomeOnboardingState) &&
                            technicalOnboardingCompleted(collaborator, technicalOnboardingState)
                            )
                    .collect(Collectors.toList());
        } catch (DatabaseException e) {
            logger.error("Error al buscar colaboradores", e);
            throw new DatabaseException("Error al realizar la busqueda de colaboradores", e);
        }catch(Exception e){
            logger.error("Error inesperado al buscar colaboradores", e);
            throw new CollaboratorValidationException("Error en los criterios de busqueda",e);
        }
    }
    private boolean matchesString(Collaborator collaborator, String searchTerm){
        if(searchTerm == null){
            return true;
        }
        String lowerCaseTerm = searchTerm.toLowerCase();

        return collaborator.getName().toLowerCase().contains(lowerCaseTerm) ||
               collaborator.getMail().toLowerCase().contains(lowerCaseTerm);
    }
    private boolean welcomeOnboardingCompleted(Collaborator collaborator, Boolean welcomeOnboardingState){
        return welcomeOnboardingState == null ||
                collaborator.getWelcomeOnboardingState() == welcomeOnboardingState;
    }
    private boolean technicalOnboardingCompleted(Collaborator collaborator, Boolean technicalOnboardingState){
        return technicalOnboardingState == null ||
                collaborator.getTechnicalOnboardingState() == technicalOnboardingState;
    }

    private void validateId(Long id) {
        if (id == null || id <= 0) {
            throw new CollaboratorValidationException("El ID debe ser un número positivo");
        }
    }
    
}
