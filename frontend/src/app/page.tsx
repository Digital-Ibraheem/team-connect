export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold">Welcome to TeamConnect</h1>
      <p className="text-lg text-gray-600 mt-4">Collaborate with developers and work on projects together.</p>
      <button className="mt-6 px-6 py-3 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600">
        Get Started
      </button>
    </div>
  );
}