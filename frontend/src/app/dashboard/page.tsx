"use client";

import { useState } from "react";

export default function DashboardPage() {
  // Mock data for projects and invitations
  const mockProjects = [
    { id: 1, name: "Project Alpha" },
    { id: 2, name: "Project Beta" },
  ];

  const mockInvitations = [
    { id: 1, projectName: "Project Gamma", senderName: "Alice" },
    { id: 2, projectName: "Project Delta", senderName: "Bob" },
  ];

  // Use mock data instead of API calls
  const [projects, setProjects] = useState(mockProjects);
  const [invitations, setInvitations] = useState(mockInvitations);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome to your dashboard.</p>

      {/* Ongoing Projects */}
      <section className="mt-4">
        <h2 className="text-lg font-semibold">Ongoing Projects</h2>
        <ul>
          {projects.length > 0 ? (
            projects.map((project) => (
              <li key={project.id} className="border p-2 mb-2 rounded shadow">
                {project.name}
              </li>
            ))
          ) : (
            <p>No ongoing projects.</p>
          )}
        </ul>
      </section>

      {/* Pending Invitations */}
      <section className="mt-4">
        <h2 className="text-lg font-semibold">Pending Invitations</h2>
        <ul>
          {invitations.length > 0 ? (
            invitations.map((invite) => (
              <li key={invite.id} className="border p-2 mb-2 rounded shadow">
                {invite.projectName} - <span className="text-gray-500">{invite.senderName}</span>
              </li>
            ))
          ) : (
            <p>No pending invitations.</p>
          )}
        </ul>
      </section>
    </div>
  );
}
