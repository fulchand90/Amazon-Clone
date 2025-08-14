// utils/hooks/useAuth.ts
'use client';
import { useState, useEffect } from 'react';
import { getSession, getCurrentUser, signOut as authSignOut } from '@/utils/auth';

interface User {
  name: string;
  email: string;
  id: string;
}

interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signOut: () => void;  // ✅ Add this
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const currentUser = getCurrentUser();
      setUser(currentUser);
      setIsLoading(false);
    };

    checkAuth();

    // Listen for storage changes (e.g., login/logout in other tabs)
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const signOut = () => {
    authSignOut();
    setUser(null);
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    signOut  // ✅ Return signOut function
  };
};
