package com.ibraheemdawod.teamconnnect.backend.repository;

import com.ibraheemdawod.teamconnnect.backend.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByOwnerId(Long ownerId); // Get all projects by a specific user
}
