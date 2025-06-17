package com.example.onboarding.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.onboarding.model.*;

@Repository
public interface CollaboratorPersistence extends JpaRepository <Collaborator, Long>{
 
}
