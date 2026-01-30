"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { 
  User, 
  onAuthStateChanged, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, googleProvider } from "@/lib/firebase";

interface UserData {
  uid: string;
  email: string;
  displayName: string;
  coins: number;
  isAdmin: boolean;
  completedLessons: string[];
  currentLanguage: string | null;
  streak: number;
  lastLoginDate: string;
  createdAt: any;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateCoins: (amount: number) => Promise<void>;
  completeLesson: (lessonId: string) => Promise<boolean>;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_EMAIL = "erenalmali@icloud.com";
const DAILY_FREE_COINS = 5;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAndResetDailyCoins = async (uid: string, currentData: UserData) => {
    const today = new Date().toISOString().split('T')[0];
    
    if (currentData.lastLoginDate !== today && !currentData.isAdmin) {
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, {
        coins: DAILY_FREE_COINS,
        lastLoginDate: today,
        streak: currentData.lastLoginDate === getPreviousDate(today) 
          ? currentData.streak + 1 
          : 1
      });
      return {
        ...currentData,
        coins: DAILY_FREE_COINS,
        lastLoginDate: today,
        streak: currentData.lastLoginDate === getPreviousDate(today) 
          ? currentData.streak + 1 
          : 1
      };
    }
    return currentData;
  };

  const getPreviousDate = (dateStr: string) => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() - 1);
    return date.toISOString().split('T')[0];
  };

  const fetchUserData = async (uid: string, email: string, displayName?: string) => {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      let data = userSnap.data() as UserData;
      
      // Always check if user should be admin (in case they weren't set before)
      const shouldBeAdmin = email === ADMIN_EMAIL;
      if (shouldBeAdmin && !data.isAdmin) {
        await updateDoc(userRef, { isAdmin: true, coins: 999999 });
        data.isAdmin = true;
        data.coins = 999999;
      }
      
      if (!data.isAdmin) {
        data = await checkAndResetDailyCoins(uid, data);
      }
      setUserData(data);
    } else {
      const isAdmin = email === ADMIN_EMAIL;
      const today = new Date().toISOString().split('T')[0];
      const newUserData: UserData = {
        uid,
        email,
        displayName: displayName || email.split('@')[0],
        coins: isAdmin ? 999999 : DAILY_FREE_COINS,
        isAdmin,
        completedLessons: [],
        currentLanguage: null,
        streak: 1,
        lastLoginDate: today,
        createdAt: serverTimestamp()
      };
      await setDoc(userRef, newUserData);
      setUserData(newUserData);
    }
  };

  const refreshUserData = async () => {
    if (user) {
      await fetchUserData(user.uid, user.email || "");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        await fetchUserData(user.uid, user.email || "", user.displayName || undefined);
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await fetchUserData(result.user.uid, email, displayName);
  };

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const logout = async () => {
    await signOut(auth);
    setUserData(null);
  };

  const updateCoins = async (amount: number) => {
    if (!user || !userData) return;
    if (userData.isAdmin) return;
    
    const newCoins = userData.coins + amount;
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, { coins: newCoins });
    setUserData({ ...userData, coins: newCoins });
  };

  const completeLesson = async (lessonId: string): Promise<boolean> => {
    if (!user || !userData) return false;
    
    const completedLessons = userData.completedLessons || [];
    
    if (completedLessons.includes(lessonId)) {
      return true;
    }
    
    if (!userData.isAdmin && userData.coins < 1) {
      return false;
    }
    
    const userRef = doc(db, "users", user.uid);
    const newCompletedLessons = [...completedLessons, lessonId];
    const newCoins = userData.isAdmin ? userData.coins : userData.coins - 1;
    
    await updateDoc(userRef, { 
      completedLessons: newCompletedLessons,
      coins: newCoins
    });
    
    setUserData({ 
      ...userData, 
      completedLessons: newCompletedLessons,
      coins: newCoins
    });
    
    return true;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      userData, 
      loading, 
      signIn, 
      signUp, 
      signInWithGoogle,
      logout,
      updateCoins,
      completeLesson,
      refreshUserData
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
