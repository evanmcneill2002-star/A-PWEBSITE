import Link from "next/link";
import { useAuth } from "./AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Layout({ children }) {
  const { user } = useAuth();
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold">A&P Prep</Link>
          <nav className="space-x-4">
            <Link href="/general" className="hover:underline">General</Link>
            <Link href="/airframe" className="hover:underline">Airframe</Link>
            <Link href="/powerplant" className="hover:underline">Powerplant</Link>
            {user ? (
              <>
                <Link href="/dashboard" className="font-medium">Dashboard</Link>
                <button
                  onClick={async () => { await signOut(auth); window.location.href = "/login"; }}
                  className="ml-2 text-sm bg-white/10 px-3 py-1 rounded hover:bg-white/20"
                >Log Out</button>
              </>
            ) : (
              <Link href="/login" className="font-medium">Sign In</Link>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="max-w-6xl mx-auto p-4">{children}</div>
      </main>
    </div>
  );
}
