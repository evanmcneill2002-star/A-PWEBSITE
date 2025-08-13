import Layout from "@/components/Layout";
import { getTopicData } from "@/lib/content";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { db } from "@/lib/firebase";
import { doc, setDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function QuizPage() {
  const router = useRouter();
  const { section, topic } = router.query;
  const data = (section && topic) ? getTopicData(section, topic) : null;
  const { user } = useAuth();

  const questions = data?.quiz || [];
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  if (!section || !topic) return null;

  const handleSelect = (qid, idx) => {
    setAnswers(prev => ({ ...prev, [qid]: idx }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let correct = 0;
    questions.forEach(q => { if (answers[q.id] === q.answerIndex) correct++; });
    const pct = Math.round((correct / (questions.length || 1)) * 100);
    setScore(pct);
    setSubmitted(true);

    if (user) {
      // Save attempt
      await addDoc(collection(db, "users", user.uid, "quizzes"), {
        section, topic, score: pct, total: questions.length, correct,
        createdAt: serverTimestamp()
      });
      // Mark completion
      await setDoc(doc(db, "users", user.uid), {
        [`completed.${section}.${topic}`]: true
      }, { merge: true });
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Quiz: {data?.title || topic}</h1>
      {!data ? <p>Topic not found.</p> : (
        !submitted ? (
          <form onSubmit={handleSubmit}>
            {questions.map(q => (
              <div key={q.id} className="mb-6 bg-white p-4 rounded shadow">
                <p className="font-medium">{q.question}</p>
                <ul className="mt-2 space-y-1">
                  {q.options.map((opt, idx) => (
                    <li key={idx}>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`q-${q.id}`}
                          value={idx}
                          checked={answers[q.id] === idx}
                          onChange={() => handleSelect(q.id, idx)}
                          required
                        />
                        <span>{opt}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <button className="px-4 py-2 bg-blue-600 text-white rounded">Submit Answers</button>
          </form>
        ) : (
          <div className="bg-white p-4 rounded shadow">
            <p className="text-xl mb-2">Your Score: <strong>{score}%</strong></p>
            {questions.map(q => (
              <div key={q.id} className="mt-3">
                <p className="font-semibold">Q: {q.question}</p>
                <p>Your answer: {q.options[answers[q.id]]} {answers[q.id] === q.answerIndex ? "✅" : "❌"}</p>
                {answers[q.id] !== q.answerIndex && (
                  <p className="text-green-700">Correct: {q.options[q.answerIndex]}</p>
                )}
              </div>
            ))}
            <button onClick={() => { setSubmitted(false); setAnswers({}); setScore(null); }}
                    className="mt-4 px-4 py-2 bg-gray-600 text-white rounded">
              Retake Quiz
            </button>
          </div>
        )
      )}
      {!user && <p className="mt-3 text-sm">Log in to save your score.</p>}
    </Layout>
  );
}
