import Layout from "@/components/Layout";
import { getTopicData } from "@/lib/content";
import { useRouter } from "next/router";
import { useState } from "react";

export default function FlashcardsPage() {
  const router = useRouter();
  const { section, topic } = router.query;
  const data = (section && topic) ? getTopicData(section, topic) : null;
  const cards = data?.flashcards || [];
  const [idx, setIdx] = useState(0);
  const [show, setShow] = useState(false);

  if (!section || !topic) return null;

  const next = () => { setShow(false); setIdx((i) => (i + 1) % (cards.length || 1)); };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Flashcards: {data?.title || topic}</h1>
      {!cards.length ? <p>No flashcards yet.</p> : (
        <div className="flex flex-col items-center">
          <div className="w-80 h-52 bg-white rounded shadow flex items-center justify-center text-center p-4">
            {show ? <span>{cards[idx].a}</span> : <span>{cards[idx].q}</span>}
          </div>
          <div className="mt-4 flex gap-3">
            <button onClick={() => setShow(s => !s)} className="px-4 py-2 bg-blue-600 text-white rounded">
              {show ? "Hide Answer" : "Show Answer"}
            </button>
            <button onClick={next} className="px-4 py-2 bg-gray-600 text-white rounded">
              Next
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
