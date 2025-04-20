import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { Fuel as Mosque } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentVerse, setCurrentVerse] = useState('');
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [success, setSuccess] = useState<string | null>(null);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { register, loading, error, clearError, googleLogin } = useAuth();
  
  // Collection of hadiths and Quran verses about goodwill and charity
  const verses = [
    "The Prophet said: \"Give charity without delay, for it stands in the way of calamity.\" (Tirmidhi)",
    
    "And whatever you spend in good, it will be repaid to you in full, and you shall not be wronged. (Quran 2:272)",
    
    "The Prophet said: \"The upper hand is better than the lower hand. The upper hand is the one that gives, and the lower hand is the one that takes.\" (Bukhari and Muslim)",
    
    "Those who spend their wealth in charity day and night, secretly and openly—their reward is with their Lord. And there will be no fear for them, nor will they grieve. (Quran 2:274)"
  ];

  // Extract referral code from URL if present
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const ref = searchParams.get('ref');
    if (ref) {
      setReferralCode(ref);
    }
  }, [location]);

  // Change verse every 10 seconds
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * verses.length);
    setCurrentVerse(verses[randomIndex]);
    
    const intervalId = setInterval(() => {
      const newIndex = Math.floor(Math.random() * verses.length);
      setCurrentVerse(verses[newIndex]);
    }, 10000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Clear previous errors when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  const validateForm = () => {
    const errors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    let isValid = true;
    
    // Clear previous errors
    clearError();
    setFormErrors({});
    
    if (!name || name.trim().length < 2) {
      errors.name = 'Full name is required (minimum 2 characters)';
      isValid = false;
    }
    
    if (!email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }
    
    if (!password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
      isValid = false;
    }
    
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    clearError();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await register(name, email, password, referralCode || undefined);
      
      // If there was a referral code, mention it in the success message
      if (referralCode) {
        const successMessage = 'Registration successful! Please check your email to verify your account. Your referral code will be applied after verification.';
        setSuccess(successMessage);
      } else {
        setSuccess('Registration successful! Please check your email to verify your account.');
      }
      
      // Clear form fields
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      
      // After 3 seconds, redirect to login page
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      // Error is handled in AuthContext
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Left side - Background with quote */}
      <div className="md:w-1/2 bg-emerald-50 flex flex-col items-center justify-center p-8 md:p-12">
        <div className="max-w-md">
          <div className="flex items-center mb-6">
            <Mosque className="h-8 w-8 text-emerald-600" />
            <span className="ml-2 text-xl font-bold text-emerald-800">IslamicHub</span>
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Our donation app helps you connect and share with those in need in your community.
          </h2>
          
          <div className="mt-4 p-6 bg-white rounded-lg shadow-sm">
            <p className="text-gray-700 italic">{currentVerse}</p>
          </div>
        </div>
      </div>
      
      {/* Right side - Sign Up Form */}
      <div className="md:w-1/2 flex justify-center items-center p-8">
        <div className="max-w-md w-full">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h1 className="text-2xl font-semibold mb-2 text-center text-gray-800">Create an Account</h1>
            <p className="mb-6 text-center text-gray-500 text-sm">Join our community of donors</p>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded">
                {error}
              </div>
            )}
            
            {success && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 border border-green-400 rounded">
                {success}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm text-gray-600 mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-2 border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                {formErrors.name && (
                  <p className="mt-1 text-xs text-red-600">{formErrors.name}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  className={`w-full px-4 py-2 border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {formErrors.email && (
                  <p className="mt-1 text-xs text-red-600">{formErrors.email}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm text-gray-600 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Create a password (min. 6 characters)"
                  className={`w-full px-4 py-2 border ${formErrors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {formErrors.password && (
                  <p className="mt-1 text-xs text-red-600">{formErrors.password}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm text-gray-600 mb-1">
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  className={`w-full px-4 py-2 border ${formErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500`}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {formErrors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-600">{formErrors.confirmPassword}</p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition duration-200 font-medium disabled:opacity-70"
              >
                {loading ? 'Creating account...' : 'Sign Up'}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">or</p>
            </div>
            
            <div className="mt-4">
              <div className="w-full flex justify-center">
                <GoogleLogin
                  onSuccess={async (credentialResponse) => {
                    try {
                      if (credentialResponse.credential) {
                        await googleLogin(credentialResponse.credential);
                        navigate('/');
                      } else {
                        console.error('No credential received from Google');
                      }
                    } catch (err) {
                      // Error is handled by the AuthContext
                    }
                  }}
                  onError={() => {
                    console.error('Google Login Failed');
                  }}
                  useOneTap
                />
              </div>
              
              <button
                type="button"
                className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
                Continue with Facebook
              </button>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-emerald-600 font-medium hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 