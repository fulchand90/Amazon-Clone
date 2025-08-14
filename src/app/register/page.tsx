// app/register/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { logo } from '@/assets';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
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

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Enter your name';
    } else if (formData.name.trim().length < 1) {
      newErrors.name = 'Enter your name';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Enter your password';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Passwords must be at least 6 characters';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Re-enter your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Create fake session
      const fakeSession = {
        user: {
          email: formData.email,
          name: formData.name,
          id: Math.random().toString(36).substring(7)
        },
        token: 'fake-jwt-token-' + Date.now()
      };
      
      localStorage.setItem('amazonSession', JSON.stringify(fakeSession));
      
      setIsLoading(false);
      router.push(redirect);
    }, 1200);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
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
          <h1 className="text-2xl font-normal mb-4">Create account</h1>

          <div className="space-y-4">
            {/* Your name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Your name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                onKeyPress={handleKeyPress}
                className={`w-full px-3 py-2 border rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.name ? 'border-red-600' : 'border-gray-400'
                }`}
                autoComplete="name"
                autoFocus
                placeholder="First and last name"
              />
              {errors.name && (
                <div className="mt-1 text-xs text-red-600 flex items-center">
                  <span className="mr-1">⚠</span>
                  {errors.name}
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onKeyPress={handleKeyPress}
                className={`w-full px-3 py-2 border rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.email ? 'border-red-600' : 'border-gray-400'
                }`}
                autoComplete="email"
              />
              {errors.email && (
                <div className="mt-1 text-xs text-red-600 flex items-center">
                  <span className="mr-1">⚠</span>
                  {errors.email}
                </div>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  onKeyPress={handleKeyPress}
                  className={`w-full px-3 py-2 border rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 ${
                    errors.password ? 'border-red-600' : 'border-gray-400'
                  }`}
                  autoComplete="new-password"
                  placeholder="At least 6 characters"
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
              <div className="mt-1 text-xs text-gray-600">
                ⓘ Passwords must be at least 6 characters.
              </div>
            </div>

            {/* Re-enter password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Re-enter password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  onKeyPress={handleKeyPress}
                  className={`w-full px-3 py-2 border rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 ${
                    errors.confirmPassword ? 'border-red-600' : 'border-gray-400'
                  }`}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-blue-600 hover:text-red-600 hover:underline"
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="mt-1 text-xs text-red-600 flex items-center">
                  <span className="mr-1">⚠</span>
                  {errors.confirmPassword}
                </div>
              )}
            </div>

            {/* Submit Button */}
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
                  Creating account...
                </div>
              ) : (
                'Create your Amazon account'
              )}
            </button>

            {/* Terms */}
            <div className="text-xs text-gray-600 leading-relaxed">
              By creating an account, you agree to Amazon&apos;s{' '}
              <Link href="/conditions" className="text-blue-600 hover:text-red-600 hover:underline">
                Conditions of Use
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-blue-600 hover:text-red-600 hover:underline">
                Privacy Notice
              </Link>
              .
            </div>

            {/* Buying for work */}
            <div className="border-t pt-4 mt-6">
              <div className="text-xs text-gray-600 mb-2">
                Buying for work?
              </div>
              <Link 
                href="/business"
                className="text-xs text-blue-600 hover:text-red-600 hover:underline"
              >
                Create a free business account
              </Link>
            </div>

            {/* Already have account */}
            <div className="border-t pt-4 mt-4">
              <div className="text-xs text-gray-600">
                Already have an account?{' '}
                <Link 
                  href="/signin"
                  className="text-blue-600 hover:text-red-600 hover:underline"
                >
                  Sign in ›
                </Link>
              </div>
            </div>
          </div>
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