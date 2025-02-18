"use client";

import { useState } from "react";

export default function ProjectsPage() {
  // Mock projects (temporary for frontend setup)
  const mockProjects = [
    { id: 1, name: "Project Alpha", description: "First project", teamSize: 3 },
    { id: 2, name: "Project Beta", description: "Second project", teamSize: 5 },
  ];

  // Use mock data for now
  const [projects, setProjects] = useState(mockProjects);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDesc, setNewProjectDesc] = useState("");

  // Simulate project creation (without API)
  const handleCreateProject = () => {
    const newProject = {
      id: projects.length + 1, // Temporary unique ID
      name: newProjectName,
      description: newProjectDesc,
      teamSize: Math.floor(Math.random() * 5) + 1, // Random team size
    };
    setProjects([...projects, newProject]);
    setNewProjectName("");
    setNewProjectDesc("");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Projects</h1>
      <p>View and manage your projects.</p>

      {/* Create New Project */}
      <section className="mt-4">
        <h2 className="text-lg font-semibold">Create a New Project</h2>
        <input
          type="text"
          placeholder="Project Name"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          className="border p-2 mb-2 block w-full"
        />
        <input
          type="text"
          placeholder="Project Description"
          value={newProjectDesc}
          onChange={(e) => setNewProjectDesc(e.target.value)}
          className="border p-2 mb-2 block w-full"
        />
        <button
          onClick={handleCreateProject}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Project
        </button>
      </section>

      {/* List Existing Projects */}
      <section className="mt-4">
        <h2 className="text-lg font-semibold">Existing Projects</h2>
        <ul>
          {projects.length > 0 ? (
            projects.map((project) => (
              <li key={project.id} className="border p-2 mb-2 rounded shadow">
                <h3 className="font-semibold">{project.name}</h3>
                <p>{project.description}</p>
                <p className="text-sm text-gray-500">Members: {project.teamSize}</p>
                <button className="bg-gray-200 px-2 py-1 mt-2 rounded">
                  View Details
                </button>
              </li>
            ))
          ) : (
            <p>No projects found.</p>
          )}
        </ul>
      </section>
    </div>
  );
}
