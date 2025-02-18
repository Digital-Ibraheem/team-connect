import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-gray-200 min-h-screen bg-white">
      <div className="p-4">
        <nav className="space-y-1">
          <Link
            href="/projects"
            className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md font-medium"
          >
            Projects
          </Link>
          <Link
            href="/projects/new"
            className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md font-medium"
          >
            Create Project
          </Link>
        </nav>
      </div>
    </aside>
  );
}