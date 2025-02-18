import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-6">
      <h2 className="text-lg font-bold mb-4">Menu</h2>
      <ul>
        <li className="mb-2">
          <Link href="/dashboard">
            <span className="block p-2 hover:bg-gray-700 rounded">Dashboard</span>
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/projects">
            <span className="block p-2 hover:bg-gray-700 rounded">Projects</span>
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/profile">
            <span className="block p-2 hover:bg-gray-700 rounded">Profile</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}
