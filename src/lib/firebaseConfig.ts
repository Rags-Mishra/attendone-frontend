// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC6id3avpxR63dsVhCGhb12tntC9aTwLOI",
  authDomain: "attendone-6248c.firebaseapp.com",
  projectId: "attendone-6248c",
  storageBucket: "attendone-6248c.firebasestorage.app",
  messagingSenderId: "695024131673",
  appId: "1:695024131673:web:1f6772885e93e7f66a1b48",
  measurementId: "G-YT78E3VBP6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
