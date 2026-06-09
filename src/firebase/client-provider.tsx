'use client';

import React, { useEffect, useState } from 'react';
import { initializeFirebase } from './index';
import { FirebaseProvider } from './provider';
import { FirebaseApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { Auth } from 'firebase/auth';

export const FirebaseClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [instances, setInstances] = useState<{
    firebaseApp: FirebaseApp;
    firestore: Firestore;
    auth: Auth;
  } | null>(null);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const { firebaseApp, firestore, auth } = initializeFirebase();
      setInstances({ firebaseApp, firestore, auth });
    } catch (error: any) {
      setLoadingError(error?.message || 'Erreur d’initialisation Firebase');
    }
  }, []);

  if (loadingError) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-12">
        <div className="max-w-xl rounded-3xl border border-red-500/40 bg-red-500/10 p-8 shadow-2xl shadow-red-900/10">
          <h1 className="text-3xl font-black text-red-200 mb-4">Erreur de configuration</h1>
          <p className="text-sm text-red-100 leading-7 mb-4">
            Le site ne peut pas se connecter à Firebase. Vérifie les variables d'environnement dans Vercel et ton fichier <code className="font-mono bg-white/5 px-1 py-0.5 rounded">.env.local</code>.
          </p>
          <p className="text-sm text-red-100 break-words">{loadingError}</p>
        </div>
      </div>
    );
  }

  if (!instances) return null;

  return (
    <FirebaseProvider
      firebaseApp={instances.firebaseApp}
      firestore={instances.firestore}
      auth={instances.auth}
    >
      {children}
    </FirebaseProvider>
  );
};
