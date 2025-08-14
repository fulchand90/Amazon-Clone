// app/account/page.tsx
'use client';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/utils/hooks/useAuth';

export default function AccountPage() {
  return (
    <ProtectedRoute>
      <AccountContent />
    </ProtectedRoute>
  );
}

function AccountContent() {
  const { user } = useAuth();
  
  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <p>Your email: {user?.email}</p>
    </div>
  );
}