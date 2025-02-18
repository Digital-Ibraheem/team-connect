import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/projects" className="text-xl font-bold text-gray-900">
              ProjectHub
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              href="/login" 
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Login
            </Link>
            <Link 
              href="/register" 
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}