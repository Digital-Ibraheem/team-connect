'use client';

import Link from 'next/link';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 border border-gray-200 rounded-lg shadow-sm text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Something went wrong!</h2>
        <p className="text-gray-600 mb-6">{error.message}</p>
        <div className="space-x-4">
          <button
            onClick={reset}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Try again
          </button>
          <Link
            href="/projects"
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            Back to Projects
          </Link>
        </div>
      </div>
    </div>
  );
}