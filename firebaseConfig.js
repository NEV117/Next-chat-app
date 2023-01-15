// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKvuLo1zHJvN-FBXXDV_7WMGBbfv-a5BM",
  authDomain: "next-chat-app-9f64b.firebaseapp.com",
  projectId: "next-chat-app-9f64b",
  storageBucket: "next-chat-app-9f64b.appspot.com",
  messagingSenderId: "742970922403",
  appId: "1:742970922403:web:9951c440efb0c177507616",
  measurementId: "G-LM0Y1E317E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db, firebaseConfig };
