import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import Link from "next/link";

function isValidPassword(pw) {
  return pw.length >= 7 && /[A-Z]/.test(pw) && /\d/.test(pw);
}

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!isValidPassword(pw)) {
      setErr("Password must be 7+ chars, include 1 uppercase and 1 number.");
      return;
    }
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, pw);
      const user = cred.user;
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        completed: {},
        quizScores: {}
      }, { merge: true });
      window.location.href = "/dashboard";
    } catch (error) {
      if (error.code === "auth/email-already-in-use") setErr("Email already in use.");
      else setErr(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={submit} className="bg-white p-6 rounded shadow w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4">Create Account</h1>
        {err && <p className="text-red-600 mb-2">{err}</p>}
        <label className="block mb-1 font-medium">Email</label>
        <input type="email" className="w-full border px-3 py-2 rounded mb-3" required
               value={email} onChange={e=>setEmail(e.target.value)} />
        <label className="block mb-1 font-medium">Password</label>
        <input type="password" className="w-full border px-3 py-2 rounded mb-4" required
               placeholder="Min 7 chars, 1 uppercase, 1 number"
               value={pw} onChange={e=>setPw(e.target.value)} />
        <button className="w-full bg-blue-600 text-white py-2 rounded">Sign Up</button>
        <p className="mt-3 text-sm">Have an account? <Link href="/login">Sign in</Link></p>
      </form>
    </div>
  );
}
