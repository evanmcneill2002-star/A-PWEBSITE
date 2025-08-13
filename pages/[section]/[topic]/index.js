import Layout from "@/components/Layout";
import { getTopicData } from "@/lib/content";
import { useRouter } from "next/router";
import Calculator from "@/components/Calculator";
import MultimeterSimulator from "@/components/MultimeterSimulator";
import DragDropTrainer from "@/components/DragDropTrainer";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";

export default function TopicPage() {
  const router = useRouter();
  const { section, topic } = router.query;
  const data = (section && topic) ? getTopicData(section, topic) : null;
  const { user } = useAuth();

  if (!section || !topic) return null;
  if (!data) return (
    <Layout><p>Topic not found.</p></Layout>
  );

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">{data.title}</h1>
      {data.sections.map((sec, i) => (
        <section key={i} className="mb-6 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">{sec.heading}</h2>
          {sec.texts?.map((p, idx) => <p key={idx} className="mb-2">{p}</p>)}
          {sec.calculator && <div className="mt-3"><Calculator /></div>}
          {sec.multimeter && <div className="mt-3"><MultimeterSimulator /></div>}
          {sec.dragDrop && <div className="mt-3"><DragDropTrainer data={sec.dragDrop} /></div>}
        </section>
      ))}
      <div className="mt-6 p-4 bg-yellow-50 border rounded">
        <h3 className="font-semibold mb-2">Practice & Review</h3>
        <div className="flex gap-3">
          <Link href={`/${section}/${topic}/flashcards`} className="px-3 py-1 bg-gray-700 text-white rounded">Flashcards</Link>
          <Link href={`/${section}/${topic}/quiz`} className="px-3 py-1 bg-blue-700 text-white rounded">Quiz</Link>
        </div>
      </div>
      {!user && <p className="mt-3 text-sm">Log in to save your progress.</p>}
    </Layout>
  );
}
