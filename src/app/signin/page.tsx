// app/signin/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { logo } from '@/assets';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailStep, setIsEmailStep] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{email?: string; password?: string; general?: string}>({});
  const [rememberMe, setRememberMe] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  useEffect(() => {
    // Check if user is already signed in
    const session = localStorage.getItem('amazonSession');
    if (session) {
      router.push(redirect);
    }
  }, [router, redirect]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailContinue = async () => {
    setErrors({});
    
    if (!email.trim()) {
      setErrors({ email: 'Enter your email or mobile phone number' });
      return;
    }
    
    if (!validateEmail(email)) {
      setErrors({ email: 'Enter a valid email address' });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call to check if email exists
    setTimeout(() => {
      setIsLoading(false);
      setIsEmailStep(false);
    }, 800);
  };

  const handleSignIn = async () => {
    setErrors({});
    
    if (!password.trim()) {
      setErrors({ password: 'Enter your password' });
      return;
    }
    
    if (password.length < 6) {
      setErrors({ password: 'Your password is incorrect' });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      // Create fake session
      const fakeSession = {
        user: {
          email: email,
          name: email.split('@')[0],
          id: Math.random().toString(36).substring(7)
        },
        token: 'fake-jwt-token-' + Date.now()
      };
      
      localStorage.setItem('amazonSession', JSON.stringify(fakeSession));
      
      setIsLoading(false);
      router.push(redirect);
    }, 1000);
  };

  const handleBackToEmail = () => {
    setIsEmailStep(true);
    setPassword('');
    setErrors({});
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter') {
      action();
    }
  };

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
          <h1 className="text-2xl font-normal mb-4">
            {isEmailStep ? 'Sign in' : 'Enter your password'}
          </h1>

          {isEmailStep ? (
            /* Email Step */
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
                  onKeyPress={(e) => handleKeyPress(e, handleEmailContinue)}
                  className={`w-full px-3 py-2 border rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email ? 'border-red-600' : 'border-gray-400'
                  }`}
                  autoComplete="email"
                  autoFocus
                />
                {errors.email && (
                  <div className="mt-1 text-xs text-red-600 flex items-center">
                    <span className="mr-1">⚠</span>
                    {errors.email}
                  </div>
                )}
              </div>

              <button
                onClick={handleEmailContinue}
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
                    Checking...
                  </div>
                ) : (
                  'Continue'
                )}
              </button>

              <div className="text-xs text-gray-600">
                By continuing, you agree to Amazon&apos;s{' '}
                <Link href="/conditions" className="text-blue-600 hover:text-red-600 hover:underline">
                  Conditions of Use
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-blue-600 hover:text-red-600 hover:underline">
                  Privacy Notice
                </Link>
                .
              </div>
            </div>
          ) : (
            /* Password Step */
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center text-sm">
                    <span className="text-gray-600 mr-2">{email}</span>
                    <button
                      onClick={handleBackToEmail}
                      className="text-blue-600 hover:text-red-600 hover:underline text-xs"
                    >
                      Change
                    </button>
                  </div>
                </div>
                
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, handleSignIn)}
                    className={`w-full px-3 py-2 border rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 ${
                      errors.password ? 'border-red-600' : 'border-gray-400'
                    }`}
                    autoComplete="current-password"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-blue-600 hover:text-red-600 hover:underline"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                {errors.password && (
                  <div className="mt-1 text-xs text-red-600 flex items-center">
                    <span className="mr-1">⚠</span>
                    {errors.password}
                  </div>
                )}
              </div>

              <button
                onClick={handleSignIn}
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
                    Signing in...
                  </div>
                ) : (
                  'Sign in'
                )}
              </button>

              <div className="flex items-center">
                <input
                  id="rememberMe"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-3 w-3 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                />
                <label htmlFor="rememberMe" className="text-xs text-gray-600">
                  Keep me signed in.{' '}
                  <Link href="/help" className="text-blue-600 hover:text-red-600 hover:underline">
                    Details
                  </Link>
                </label>
              </div>

              <Link 
                href="/forgot-password"
                className="block text-xs text-blue-600 hover:text-red-600 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">New to Amazon?</span>
          </div>
        </div>

        {/* Create Account Button */}
        <Link 
          href="/register"
          className="w-full inline-flex justify-center py-2 px-4 border border-gray-400 rounded-sm bg-gradient-to-b from-gray-50 to-gray-200 text-black text-sm font-medium hover:bg-gray-100 transition-colors duration-200"
        >
          Create your Amazon account
        </Link>
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