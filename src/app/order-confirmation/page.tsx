// app/order-confirmation/page.tsx
'use client';
import { Suspense } from 'react';
import OrderConfirmation from '@/components/OrderConfirmation';

function OrderConfirmationContent(): JSX.Element {
  return <OrderConfirmation />;
}

export default function OrderConfirmationPage(): JSX.Element {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  );
}