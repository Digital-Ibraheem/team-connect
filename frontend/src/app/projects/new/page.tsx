"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function NewProjectPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [error, setError] = useState<string | null>(null);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to create a project.");
        return;
      }

      await axios.post("http://localhost:8080/api/projects", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      router.push("/projects");
    } catch (err) {
      setError("Failed to create project");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Create New Project</h1>
        <Link href="/projects" className="text-gray-600 hover:text-gray-900 font-medium">
          Back to Projects
        </Link>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
        <form onSubmit={handleCreateProject} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Title
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
}
