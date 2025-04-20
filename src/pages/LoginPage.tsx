import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { Fuel as Mosque } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [currentVerse, setCurrentVerse] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login, googleLogin, loading, error, clearError } = useAuth();
  
  // Collection of hadiths and Quran verses about goodwill and charity
  const verses = [
    "The Prophet said: \"Give charity without delay, for it stands in the way of calamity.\" (Tirmidhi)",
    
    "And whatever you spend in good, it will be repaid to you in full, and you shall not be wronged. (Quran 2:272)",
    
    "The Prophet said: \"The upper hand is better than the lower hand. The upper hand is the one that gives, and the lower hand is the one that takes.\" (Bukhari and Muslim)",
    
    "Those who spend their wealth in charity day and night, secretly and openly—their reward is with their Lord. And there will be no fear for them, nor will they grieve. (Quran 2:274)"
  ];

  // Reset errors when page changes
  useEffect(() => {
    clearError();
  }, [location.pathname, clearError]);

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

  const validateForm = () => {
    let valid = true;
    
    // Validate email
    if (!email) {
      setEmailError('Email is required');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email is invalid');
      valid = false;
    } else {
      setEmailError('');
    }
    
    // Validate password
    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    } else {
      setPasswordError('');
    }
    
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      // Error is handled by the AuthContext
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
      
      {/* Right side - Login Form */}
      <div className="md:w-1/2 flex justify-center items-center p-8">
        <div className="max-w-md w-full">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">Login to Your Account</h1>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm text-gray-600 mb-1">Email Address</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={`w-full px-4 py-2 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500`}
                  required
                />
                {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="password" className="block text-sm text-gray-600">Password</label>
                  <Link to="/forgot-password" className="text-xs text-emerald-600 hover:underline">
                    Forgot your password?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={`w-full px-4 py-2 border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500`}
                  required
                />
                {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition duration-200 font-medium disabled:opacity-70"
              >
                {loading ? 'Signing in...' : 'Sign In'}
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
                Don't have an account?{' '}
                <Link to="/register" className="text-emerald-600 font-medium hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 