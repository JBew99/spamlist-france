'use client';

import React, { useState } from 'react';
import { initializeFirebase } from './index';
import { FirebaseProvider } from './provider';
import { FirebaseApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { Auth } from 'firebase/auth';

type Instances = {
  firebaseApp: FirebaseApp;
  firestore: Firestore;
  auth: Auth;
};

export const FirebaseClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize synchronously on the client so the UI renders immediately
  // instead of blocking the whole page behind a `null` return.
  const [instances] = useState<Instances | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      return initializeFirebase();
    } catch (e) {
      console.log('[v0] Firebase init failed:', e);
      return null;
    }
  });

  return (
    <FirebaseProvider
      firebaseApp={instances?.firebaseApp ?? null}
      firestore={instances?.firestore ?? null}
      auth={instances?.auth ?? null}
    >
      {children}
    </FirebaseProvider>
  );
};
