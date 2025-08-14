// / utils/auth.ts
interface User {
  name: string;
  email: string;
  id: string;
}

interface Session {
  user: User;
  token: string;
}

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    const session = localStorage.getItem('amazonSession');
    return !!session;
  } catch {
    return false;
  }
};

// Get current user session
export const getSession = (): Session | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const session = localStorage.getItem('amazonSession');
    return session ? JSON.parse(session) : null;
  } catch {
    return null;
  }
};

// Get current user
export const getCurrentUser = (): User | null => {
  const session = getSession();
  return session?.user || null;
};

// Sign out user
export const signOut = (): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('amazonSession');
  localStorage.removeItem('cart'); // Optional: clear cart
  
  // Redirect to home page
  window.location.href = '/';
};

// Require authentication (for protected pages)
export const requireAuth = (redirectTo: string = '/signin') => {
  if (typeof window === 'undefined') return;
  
  if (!isAuthenticated()) {
    const currentPath = window.location.pathname + window.location.search;
    window.location.href = `${redirectTo}?redirect=${encodeURIComponent(currentPath)}`;
  }
};