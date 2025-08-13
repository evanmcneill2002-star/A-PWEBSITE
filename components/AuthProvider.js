import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined); // undefined = loading
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const ref = doc(db, "users", firebaseUser.uid);
        const unsubDoc = onSnapshot(ref, (snap) => {
          setUserData(snap.exists() ? snap.data() : {});
        });
        return () => unsubDoc();
      } else {
        setUser(null);
        setUserData(null);
      }
    });
    return () => unsubAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userData }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
