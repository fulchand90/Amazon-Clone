// components/SignOutButton.tsx
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  name: string;
  email: string;
  id: string;
}

const SignOutButton: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const session = localStorage.getItem('amazonSession');
    if (session) {
      const parsedSession = JSON.parse(session);
      setUser(parsedSession.user);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('amazonSession');
    localStorage.removeItem('cart'); // Optional: clear cart on logout
    setUser(null);
    setShowDropdown(false);
    router.push('/');
    router.refresh();
  };

  const getFirstName = (fullName: string): string => {
    return fullName.split(' ')[0] || fullName;
  };

  if (!user) return null;

  return (
    <div className="headerItem relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="text-left focus:outline-none"
      >
        <div className="text-xs">
          <p>Hello, {getFirstName(user.name)}</p>
          <p className="text-white font-bold">Account & Lists</p>
        </div>
      </button>

      {showDropdown && (
        <div className="absolute top-full right-0 mt-1 w-80 bg-white border border-gray-300 shadow-lg rounded-sm z-50">
          {/* Account Section */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-base text-gray-900">Your Account</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <button 
                onClick={() => setShowDropdown(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm">
              <Link 
                href="/account" 
                className="text-blue-600 hover:text-red-600 hover:underline py-1"
                onClick={() => setShowDropdown(false)}
              >
                Your Account
              </Link>
              <Link 
                href="/orders" 
                className="text-blue-600 hover:text-red-600 hover:underline py-1"
                onClick={() => setShowDropdown(false)}
              >
                Your Orders
              </Link>
              <Link 
                href="/wishlist" 
                className="text-blue-600 hover:text-red-600 hover:underline py-1"
                onClick={() => setShowDropdown(false)}
              >
                Your Wish List
              </Link>
              <Link 
                href="/recommendations" 
                className="text-blue-600 hover:text-red-600 hover:underline py-1"
                onClick={() => setShowDropdown(false)}
              >
                Your Recommendations
              </Link>
              <Link 
                href="/prime" 
                className="text-blue-600 hover:text-red-600 hover:underline py-1"
                onClick={() => setShowDropdown(false)}
              >
                Prime
              </Link>
              <Link 
                href="/subscriptions" 
                className="text-blue-600 hover:text-red-600 hover:underline py-1"
                onClick={() => setShowDropdown(false)}
              >
                Subscriptions
              </Link>
            </div>
          </div>

          {/* Lists Section */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-bold text-base text-gray-900 mb-3">Your Lists</h3>
            <div className="grid grid-cols-1 gap-1 text-sm">
              <Link 
                href="/lists/create" 
                className="text-blue-600 hover:text-red-600 hover:underline py-1"
                onClick={() => setShowDropdown(false)}
              >
                Create a List
              </Link>
              <Link 
                href="/lists/wishlist" 
                className="text-blue-600 hover:text-red-600 hover:underline py-1"
                onClick={() => setShowDropdown(false)}
              >
                Find a List or Registry
              </Link>
            </div>
          </div>

          {/* Sign Out Section */}
          <div className="p-4">
            <button
              onClick={handleSignOut}
              className="w-full text-left text-blue-600 hover:text-red-600 hover:underline text-sm py-1 font-medium"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignOutButton;
