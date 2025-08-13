import Layout from "@/components/Layout";
import { getSectionData } from "@/lib/content";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SectionLanding() {
  const router = useRouter();
  const { section } = router.query;
  const data = section ? getSectionData(section) : null;

  if (!section) return null;
  if (!data) return (
    <Layout>
      <p>Section not found.</p>
    </Layout>
  );

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">{data.title} Section</h1>
      <ul className="grid md:grid-cols-2 gap-3">
        {data.topics.map(t => (
          <li key={t.slug} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">{t.title}</h3>
            <div className="flex gap-3">
              <Link href={`/${section}/${t.slug}`} className="px-3 py-1 bg-blue-600 text-white rounded">Study</Link>
              <Link href={`/${section}/${t.slug}/flashcards`} className="px-3 py-1 bg-gray-600 text-white rounded">Flashcards</Link>
              <Link href={`/${section}/${t.slug}/quiz`} className="px-3 py-1 bg-emerald-600 text-white rounded">Quiz</Link>
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
