package com.ibraheemdawod.teamconnnect.backend.controller;

import com.ibraheemdawod.teamconnnect.backend.model.Project;
import com.ibraheemdawod.teamconnnect.backend.service.ProjectService;
import com.ibraheemdawod.teamconnnect.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping
    public List<Project> getAllProjects() {
        return projectService.getAllProjects(); // Public: anyone can view projects
    }

    @GetMapping("/my-projects")
    public List<Project> getUserProjects(Authentication authentication) {
        String email = authentication.getName(); // Get the authenticated user's email
        return projectService.getUserProjectsByEmail(email);
    }

    @GetMapping("/{id}")
    public Optional<Project> getProjectById(@PathVariable Long id) {
        return projectService.getProjectById(id);
    }

    @PostMapping("/create")
    public Project createProject(@RequestBody Project project, Authentication authentication) {
        String email = authentication.getName(); // Get authenticated user's email
        return projectService.createProject(project, email);
    }

    @PutMapping("/update/{projectId}")
    public Project updateProject(@PathVariable Long projectId, @RequestBody Project updatedProject, Authentication authentication) {
        String email = authentication.getName();
        return projectService.updateProject(projectId, updatedProject, email);
    }

    @DeleteMapping("/delete/{projectId}")
    public void deleteProject(@PathVariable Long projectId, Authentication authentication) {
        String email = authentication.getName();
        projectService.deleteProject(projectId, email);
    }
}
