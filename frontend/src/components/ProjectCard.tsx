"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Project } from "@/types";
import axios from "axios";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { user } = useAuth(); // get logged-in user from auth context

  // ensure project.owner exists and check if the logged-in user is the owner
  const isOwner = user && project.owner && user.email === project.owner.email;

  console.log(user)

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to delete a project.");
        return;
      }

      await axios.delete(`http://localhost:8080/api/projects/${project.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      window.location.reload();
    } catch (err) {
      alert("Failed to delete project");
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {project.name}
        </h2>
        <p className="text-gray-600 mb-4">{project.description}</p>
        <p className="text-sm text-gray-500">Owner: {project.owner?.email}</p>

        {/* show buttons only if user is the owner */}
        {isOwner && (
          <div className="flex justify-end space-x-4 mt-4">
            <Link
              href={`/projects/${project.id}/edit`}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
