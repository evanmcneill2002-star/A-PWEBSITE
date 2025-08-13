import { db } from "@/lib/firebase";
import {
  writeBatch, doc, collection, getDocs, query, where, limit,
  serverTimestamp
} from "firebase/firestore";

/**
 * JSON shape:
 * { written:[{section,subject,subcategory,acs,stem,choices,correctIndex,explanation,refs[]}],
 *   oral:[{section,subject,task,expectedPoints[],pitfalls[],refs[]}],
 *   practical:[{section,subject,task,tools[],standards[],safety[],refs[]}],
 *   flashcards:[{section,subject,front,back,refs[]}] }
 */

export async function importContentJSON(json) {
  const batch = writeBatch(db);
  const stamp = serverTimestamp();

  if (Array.isArray(json.written)) {
    json.written.forEach((q) => {
      const ref = doc(collection(db, "written"));
      batch.set(ref, { ...q, type: "written", updatedAt: stamp });
    });
  }
  if (Array.isArray(json.oral)) {
    json.oral.forEach((o) => {
      const ref = doc(collection(db, "oral"));
      batch.set(ref, { ...o, type: "oral", updatedAt: stamp });
    });
  }
  if (Array.isArray(json.practical)) {
    json.practical.forEach((p) => {
      const ref = doc(collection(db, "practical"));
      batch.set(ref, { ...p, type: "practical", updatedAt: stamp });
    });
  }
  if (Array.isArray(json.flashcards)) {
    json.flashcards.forEach((f) => {
      const ref = doc(collection(db, "flashcards"));
      batch.set(ref, { ...f, type: "flashcard", updatedAt: stamp });
    });
  }

  await batch.commit();
}

export async function fetchWritten({ sections = [], subjects = [], count = 60 }) {
  const col = collection(db, "written");
  let qs = [];
  if (!sections.length) {
    const snap = await getDocs(query(col, limit(1000)));
    snap.forEach((d) => qs.push({ id: d.id, ...d.data() }));
  } else {
    for (const s of sections) {
      const snap = await getDocs(query(col, where("section", "==", s), limit(1000)));
      snap.forEach((d) => qs.push({ id: d.id, ...d.data() }));
    }
  }
  if (subjects.length) {
    qs = qs.filter((q) => subjects.includes((q.subject || "").toLowerCase()));
  }
  for (let i = qs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [qs[i], qs[j]] = [qs[j], qs[i]];
  }
  return qs.slice(0, count);
}
