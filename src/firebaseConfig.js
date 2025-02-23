// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiAC2uUaRLcn2R6hKvcJcKpdsi3sK-Xqo",
  authDomain: "i-like-hacking.firebaseapp.com",
  projectId: "i-like-hacking",
  storageBucket: "i-like-hacking.firebasestorage.app",
  messagingSenderId: "948893635059",
  appId: "1:948893635059:web:300857fdc3d8c006900286",
  measurementId: "G-NRRQPZ110L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore using the initialized app
const db = getFirestore(app);
export { db };
