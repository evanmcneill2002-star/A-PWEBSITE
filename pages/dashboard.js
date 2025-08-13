import Layout from "@/components/Layout";
import { useAuth } from "@/components/AuthProvider";
import { requireAuth } from "@/components/requireAuth";
import Link from "next/link";
import { sections } from "@/lib/content";

function Dashboard() {
  const { user, userData } = useAuth();

  const sectionArr = Object.entries(sections).map(([id, d]) => ({
    id,
    name: d.title,
    total: d.topics.length,
    completed: Object.values(userData?.completed?.[id] || {}).filter(Boolean).length
  }));

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
      <p className="mb-6">Welcome, {user?.email || "Student"}!</p>
      <div className="grid md:grid-cols-3 gap-4">
        {sectionArr.map(sec => (
          <div key={sec.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-1">{sec.name}</h2>
            <p className="mb-2">{sec.completed} of {sec.total} topics completed</p>
            <div className="w-full bg-gray-300 h-3 rounded">
              <div className="bg-blue-600 h-3 rounded" style={{ width: `${(sec.completed/sec.total)*100}%` }} />
            </div>
            <Link href={`/${sec.id}`} className="inline-block mt-3 px-3 py-1 bg-blue-500 text-white text-sm rounded">
              Go to {sec.name}
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default requireAuth(Dashboard);
