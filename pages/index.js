import Layout from "@/components/Layout";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      <div className="bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-2">A&P Exam Prep</h1>
        <p className="mb-4">Study General, Airframe, and Powerplant with interactive tools, flashcards, and quizzes.</p>
        <div className="flex gap-3">
          <Link href="/general" className="px-4 py-2 bg-blue-600 text-white rounded">General</Link>
          <Link href="/airframe" className="px-4 py-2 bg-blue-600 text-white rounded">Airframe</Link>
          <Link href="/powerplant" className="px-4 py-2 bg-blue-600 text-white rounded">Powerplant</Link>
        </div>
        <p className="mt-4">
          New here? <Link href="/signup">Create an account</Link> or <Link href="/login">sign in</Link>.
        </p>
      </div>
    </Layout>
  );
}
