'use client';

import Link from 'next/link';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const handleDelete = () => {
    // TODO: Implement delete logic
    console.log('Delete project:', project.id);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {project.title}
        </h2>
        <p className="text-gray-600 mb-4">
          {project.description}
        </p>
        <div className="flex justify-end space-x-4">
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
      </div>
    </div>
  );
}
