// app/forgot-password/page.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { logo } from '@/assets';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    setError('');
    
    if (!email.trim()) {
      setError('Enter your email or mobile phone number');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="border-b border-gray-200">
          <div className="max-w-md mx-auto py-4 px-4">
            <Link href="/" className="flex justify-center">
              <Image
                src={logo}
                alt="Amazon"
                width={100}
                height={30}
                className="h-8 w-auto"
              />
            </Link>
          </div>
        </header>

        {/* Success Message */}
        <main className="max-w-sm mx-auto px-4 py-8">
          <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-sm">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              
              <h1 className="text-xl font-normal mb-4 text-gray-900">
                Password assistance sent
              </h1>
              
              <p className="text-sm text-gray-600 mb-6">
                We&#39;ve sent password reset instructions to <strong>{email}</strong>
              </p>
              
              <div className="text-sm text-gray-600 space-y-2 mb-6">
                <p>• Check your email and click the reset link</p>
                <p>• The link will expire in 24 hours</p>
                <p>• Check your spam folder if you don&#39;t see it</p>
              </div>

              <Link 
                href="/signin"
                className="w-full inline-flex justify-center py-2 px-4 bg-[#ff9f00] hover:bg-[#e88900] text-black rounded-sm text-sm font-medium transition-colors duration-200"
              >
                Back to Sign In
              </Link>
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Didn&#39;t receive the email?{' '}
              <button 
                onClick={() => setIsSubmitted(false)}
                className="text-blue-600 hover:text-red-600 hover:underline"
              >
                Try again
              </button>
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-300 mt-12 pt-6 pb-12">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex justify-center space-x-6 text-xs text-blue-600 mb-4">
              <Link href="/conditions" className="hover:text-red-600 hover:underline">
                Conditions of Use
              </Link>
              <Link href="/privacy" className="hover:text-red-600 hover:underline">
                Privacy Notice
              </Link>
              <Link href="/help" className="hover:text-red-600 hover:underline">
                Help
              </Link>
            </div>
            <div className="text-center text-xs text-gray-500">
              © 1996-2024, Amazon.com, Inc. or its affiliates
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-md mx-auto py-4 px-4">
          <Link href="/" className="flex justify-center">
            <Image
              src={logo}
              alt="Amazon"
              width={100}
              height={30}
              className="h-8 w-auto"
            />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-sm mx-auto px-4 py-8">
        <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-sm">
          <h1 className="text-2xl font-normal mb-4">Password assistance</h1>
          
          <p className="text-sm text-gray-600 mb-4">
            Enter the email or mobile phone number associated with your Amazon account.
          </p>

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email or mobile phone number
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                className={`w-full px-3 py-2 border rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  error ? 'border-red-600' : 'border-gray-400'
                }`}
                autoComplete="email"
                autoFocus
              />
              {error && (
                <div className="mt-1 text-xs text-red-600 flex items-center">
                  <span className="mr-1">⚠</span>
                  {error}
                </div>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full py-2 px-4 rounded-sm text-sm font-medium transition-colors duration-200 ${
                isLoading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#ff9f00] hover:bg-[#e88900] text-black'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-2"></div>
                  Sending...
                </div>
              ) : (
                'Continue'
              )}
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <h2 className="text-sm font-medium text-gray-900 mb-2">Has your email or phone number changed?</h2>
            <p className="text-xs text-gray-600 mb-3">
              If you no longer use the email or phone number associated with your Amazon account, you may contact{' '}
              <Link href="/help/customer-service" className="text-blue-600 hover:text-red-600 hover:underline">
                Customer Service
              </Link>{' '}
              for help restoring access to your account.
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link 
            href="/signin"
            className="text-blue-600 hover:text-red-600 hover:underline text-sm"
          >
            ← Back to Sign In
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-300 mt-12 pt-6 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-center space-x-6 text-xs text-blue-600 mb-4">
            <Link href="/conditions" className="hover:text-red-600 hover:underline">
              Conditions of Use
            </Link>
            <Link href="/privacy" className="hover:text-red-600 hover:underline">
              Privacy Notice
            </Link>
            <Link href="/help" className="hover:text-red-600 hover:underline">
              Help
            </Link>
          </div>
          <div className="text-center text-xs text-gray-500">
            © 1996-2024, Amazon.com, Inc. or its affiliates
          </div>
        </div>
      </footer>
    </div>
  );
}