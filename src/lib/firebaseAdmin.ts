import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

let db: ReturnType<typeof getFirestore> | null = null;

if (!getApps().length) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (privateKey && privateKey.startsWith("\"") && privateKey.endsWith("\"")) {
    // Remove surrounding quotes if present (common in .env files)
    privateKey = privateKey.slice(1, -1);
  }
  if (privateKey) {
    privateKey = privateKey.replace(/\\n/g, "\n");
  }

  if (projectId && clientEmail && privateKey) {
    try {
      initializeApp({
        credential: cert({ projectId, clientEmail, privateKey }),
      });
      db = getFirestore();
    } catch (error) {
      console.error("Failed to initialize Firebase Admin:", error);
    }
  } else {
    console.warn("Firebase Admin environment variables are missing. Some features may not work.");
  }
} else {
  db = getFirestore();
}

export { db };

