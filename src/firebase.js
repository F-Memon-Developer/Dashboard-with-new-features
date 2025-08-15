import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "dashboard-11807.firebaseapp.com",
  projectId: "dashboard-11807",
  storageBucket: "dashboard-11807.firebasestorage.app",
  messagingSenderId: "428832791856",
  appId: "1:428832791856:web:5e65572598359ce26fbcf5"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);