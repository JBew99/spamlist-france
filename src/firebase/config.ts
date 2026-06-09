'use client';

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDCYfbyfkEwYtKrj6ntKkuSy6-rRhEA3MY",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "studio-1923690172-41344.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "studio-1923690172-41344",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "studio-1923690172-41344.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "149030899912",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:149030899912:web:5a09121ebf99f5bf2c95fd",
};
