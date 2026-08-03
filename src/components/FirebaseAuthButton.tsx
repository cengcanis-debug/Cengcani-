import React, { useState, useEffect } from 'react';
import { User, LogIn, LogOut, Cloud, ShieldCheck } from 'lucide-react';
import { auth, googleProvider, db, OperationType, handleFirestoreError } from '../lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export function FirebaseAuthButton() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Sync user profile to Firestore
        try {
          const userRef = doc(db, 'users', currentUser.uid);
          const userSnap = await getDoc(userRef);
          if (!userSnap.exists()) {
            await setDoc(userRef, {
              uid: currentUser.uid,
              email: currentUser.email || '',
              displayName: currentUser.displayName || 'Sifiso Learner',
              createdAt: new Date().toISOString()
            });
          }
        } catch (error) {
          try {
            handleFirestoreError(error, OperationType.WRITE, `users/${currentUser.uid}`);
          } catch (e) {
            console.error(e);
          }
        }
      }
    });
    return unsubscribe;
  }, []);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Sign-in error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign-out error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
        <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
          {user.displayName?.[0] || 'U'}
        </div>
        <div className="hidden sm:block text-left">
          <div className="text-xs font-bold text-emerald-900 truncate max-w-[120px]">{user.displayName || 'Learner'}</div>
          <div className="text-[10px] text-emerald-600 flex items-center gap-1">
            <Cloud size={10} /> Cloud Sync Active
          </div>
        </div>
        <button
          onClick={handleSignOut}
          disabled={loading}
          className="ml-2 text-slate-500 hover:text-red-600 p-1 transition cursor-pointer"
          title="Sign Out"
        >
          <LogOut size={14} />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleSignIn}
      disabled={loading}
      className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
      title="Sign in with Google for Cloud Persistence"
    >
      <LogIn size={14} />
      <span>Sign In (Firebase)</span>
    </button>
  );
}
