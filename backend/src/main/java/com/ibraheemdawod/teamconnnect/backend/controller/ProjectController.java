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

    // get all projects (public)
    @GetMapping
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }

    // get authenticated user's projects
    @GetMapping("/my")
    public List<Project> getUserProjects(Authentication authentication) {
        String email = authentication.getName();
        return projectService.getUserProjectsByEmail(email);
    }

    // get project by id
    @GetMapping("/{id}")
    public Optional<Project> getProjectById(@PathVariable Long id) {
        return projectService.getProjectById(id);
    }

    // create a new project (auth required)
    @PostMapping
    public Project createProject(@RequestBody Project project, Authentication authentication) {
        String email = authentication.getName();
        return projectService.createProject(project, email);
    }

    // update an existing project (auth required)
    @PutMapping("/{projectId}")
    public Project updateProject(@PathVariable Long projectId, @RequestBody Project updatedProject, Authentication authentication) {
        String email = authentication.getName();
        return projectService.updateProject(projectId, updatedProject, email);
    }

    // delete a project (auth required)
    @DeleteMapping("/{projectId}")
    public void deleteProject(@PathVariable Long projectId, Authentication authentication) {
        String email = authentication.getName();
        projectService.deleteProject(projectId, email);
    }
}
