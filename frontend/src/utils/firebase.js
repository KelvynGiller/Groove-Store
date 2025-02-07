import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB6ezHvYJssTR1Y2_CsOG6SwDUBMXwlVrw",
  authDomain: "groove-store.firebaseapp.com",
  projectId: "groove-store",
  storageBucket: "groove-store.firebasestorage.app",
  messagingSenderId: "758679430515",
  appId: "1:758679430515:web:7bfcfbbd807a5fdcbb1106"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);