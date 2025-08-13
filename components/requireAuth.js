import { useRouter } from "next/router";
import { useAuth } from "./AuthProvider";
import { useEffect } from "react";

export function requireAuth(Component) {
  return function Protected(props) {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (user === null) router.push("/login");
    }, [user, router]);

    if (user === undefined) {
      return <p className="text-center mt-10">Loading…</p>;
    }
    if (!user) return null;

    return <Component {...props} />;
  };
}
