import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await signInWithEmailAndPassword(auth, email, pw);
      window.location.href = "/dashboard";
    } catch (error) {
      if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
        setErr("Invalid email or password.");
      } else {
        setErr(error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={submit} className="bg-white p-6 rounded shadow w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        {err && <p className="text-red-600 mb-2">{err}</p>}
        <label className="block mb-1 font-medium">Email</label>
        <input type="email" className="w-full border px-3 py-2 rounded mb-3" required
               value={email} onChange={e=>setEmail(e.target.value)} />
        <label className="block mb-1 font-medium">Password</label>
        <input type="password" className="w-full border px-3 py-2 rounded mb-4" required
               value={pw} onChange={e=>setPw(e.target.value)} />
        <button className="w-full bg-blue-600 text-white py-2 rounded">Log In</button>
        <p className="mt-3 text-sm">No account? <Link href="/signup">Sign up</Link></p>
      </form>
    </div>
  );
}
