import { useAuth } from "@/components/AuthProvider";
import Layout from "@/components/Layout";
import { importContentJSON } from "@/lib/firestoreContent";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

export default function AdminPage() {
  const { user } = useAuth();

  if (!user) return <Layout><p>Please sign in to access admin.</p></Layout>;
  if (user.email !== ADMIN_EMAIL) return <Layout><p>Unauthorized.</p></Layout>;

  const handleUpload = async (e) => {
    e.preventDefault();
    const text = e.target.json.value.trim();
    if (!text) { alert("Paste JSON first."); return; }
    try {
      const parsed = JSON.parse(text);
      await importContentJSON(parsed);
      alert("Uploaded! Check Firestore collections.");
      e.target.reset();
    } catch (err) {
      console.error(err);
      alert("Invalid JSON or upload failed. See console.");
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-2">Admin Uploader</h1>
      <p className="mb-4">Paste your content JSON below and click Upload.</p>
      <form onSubmit={handleUpload}>
        <textarea name="json" rows={16} className="w-full border rounded p-2 font-mono"
                  placeholder='{"written":[...],"oral":[...],"practical":[...],"flashcards":[...]}' />
        <div className="mt-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Upload</button>
        </div>
      </form>
    </Layout>
  );
}
