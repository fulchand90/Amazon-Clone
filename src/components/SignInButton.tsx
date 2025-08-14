// components/SignInButton.tsx
'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SignInButton: React.FC = () => {
  return (
    <Link 
      href="/signin" 
      className="headerItem"
    >
      <div className="text-xs">
        <p>Hello, sign in</p>
        <p className="text-white font-bold">Account & Lists</p>
      </div>
    </Link>
  );
};

export default SignInButton;

