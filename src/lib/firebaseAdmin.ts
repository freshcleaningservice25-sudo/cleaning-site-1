import { App, cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

let app: App | undefined;

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

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error("Missing Firebase Admin environment variables");
  }

  app = initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });
}

export const db = getFirestore();

