package com.ibraheemdawod.teamconnnect.backend.service;

import com.ibraheemdawod.teamconnnect.backend.model.Project;
import com.ibraheemdawod.teamconnnect.backend.model.User;
import com.ibraheemdawod.teamconnnect.backend.repository.ProjectRepository;
import com.ibraheemdawod.teamconnnect.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Project> getAllProjects() {
        return projectRepository.findAll(); // Public projects
    }

    public List<Project> getUserProjectsByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.map(value -> projectRepository.findByOwnerId(value.getId())).orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public Optional<Project> getProjectById(Long id) {
        return projectRepository.findById(id);
    }

    public Project createProject(Project project, String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            project.setOwner(user.get());
            return projectRepository.save(project);
        } else {
            throw new IllegalArgumentException("User not found");
        }
    }

    public Project updateProject(Long projectId, Project updatedProject, String email) {
        Optional<Project> existingProject = projectRepository.findById(projectId);
        if (existingProject.isPresent()) {
            Project project = existingProject.get();
            if (!project.getOwner().getEmail().equals(email)) {
                throw new IllegalArgumentException("Unauthorized to update this project");
            }
            project.setName(updatedProject.getName());
            project.setDescription(updatedProject.getDescription());
            return projectRepository.save(project);
        } else {
            throw new IllegalArgumentException("Project not found");
        }
    }

    public void deleteProject(Long projectId, String email) {
        Optional<Project> project = projectRepository.findById(projectId);
        if (project.isPresent()) {
            if (!project.get().getOwner().getEmail().equals(email)) {
                throw new IllegalArgumentException("Unauthorized to delete this project");
            }
            projectRepository.deleteById(projectId);
        } else {
            throw new IllegalArgumentException("Project not found");
        }
    }
}
