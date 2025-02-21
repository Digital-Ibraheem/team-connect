package com.ibraheemdawod.teamconnnect.backend.service;

import com.ibraheemdawod.teamconnnect.backend.model.Project;
import com.ibraheemdawod.teamconnnect.backend.model.User;
import com.ibraheemdawod.teamconnnect.backend.repository.ProjectRepository;
import com.ibraheemdawod.teamconnnect.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public List<Project> getUserProjects(Long userId) {
        return projectRepository.findByOwnerId(userId);
    }

    public Optional<Project> getProjectById(Long id) {
        return projectRepository.findById(id);
    }

    public Project createProject(Project project, Long userId) {
        Optional<User> user = userRepository.findById(userId);

        if(user.isPresent()) {
            project.setOwner(user.get());
            return projectRepository.save(project);
        } else {
            throw new IllegalArgumentException("User not found");
        }
    }

    public Project updateProject(Long projectId, Project updatedProject, Long userId) {
        Optional<Project> existingProject = projectRepository.findById(projectId);

        if (existingProject.isPresent()) {
            Project project = existingProject.get();

            if (!project.getOwner().getId().equals(userId)) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized: You are not the owner of this project");
            }

            project.setName(updatedProject.getName());
            project.setDescription(updatedProject.getDescription());
            return projectRepository.save(project);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found");
        }

    }

    public void deleteProject(Long projectId, Long userId) {
        Optional<Project> project = projectRepository.findById(projectId);

        if(project.isPresent() && project.get().getOwner().getId().equals(userId)) {
            projectRepository.deleteById(projectId);
        } else {
            throw new IllegalArgumentException("Unauthorized or Project not found");
        }
    }
}
