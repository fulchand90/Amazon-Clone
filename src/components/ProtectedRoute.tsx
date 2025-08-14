// components/ProtectedRoute.tsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/utils/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  fallback?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectTo = '/signin',
  fallback = (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amazonBlue"></div>
    </div>
  )
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isAuthenticated();
      setIsAuthed(authenticated);
      
      if (!authenticated) {
        const currentPath = window.location.pathname + window.location.search;
        router.push(`${redirectTo}?redirect=${encodeURIComponent(currentPath)}`);
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, [router, redirectTo]);

  if (isLoading) {
    return <>{fallback}</>;
  }

  if (!isAuthed) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
