import { mockProjects } from '@/lib/mockData';
import Link from 'next/link';
import ProjectCard from '@/components/ProjectCard';

export default function ProjectsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        <Link
          href="/projects/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium transition-colors duration-200"
        >
          Create Project
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}