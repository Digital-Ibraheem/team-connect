package com.ibraheemdawod.teamconnnect.backend.controller;

import com.ibraheemdawod.teamconnnect.backend.model.Project;
import com.ibraheemdawod.teamconnnect.backend.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @GetMapping
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }

    @GetMapping("/user/{userId}")
    public List<Project> getUserProjects(@PathVariable Long userId) {
        return projectService.getUserProjects(userId);
    }

    @GetMapping("/{id}")
    public Optional<Project> getProjectById(@PathVariable Long id) {
        return projectService.getProjectById(id);
    }

    @PostMapping("/create/{userId}")
    public Project createProject(@RequestBody Project project, @PathVariable Long userId) {
        return projectService.createProject(project, userId);
    }

    @PutMapping("/update/{projectId}/{userId}")
    public Project updateProject(@RequestBody Project updatedProject, @PathVariable Long projectId, @PathVariable Long userId) {
        return projectService.updateProject(projectId, updatedProject, userId);
    }

    @DeleteMapping("/delete/{projectId}/{userId}")
    public void deleteProject(@PathVariable Long projectId, @PathVariable Long userId) {
        projectService.deleteProject(projectId, userId);
    }
}
