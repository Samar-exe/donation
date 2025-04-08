import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axiosConfig';
import { useAuth } from '../context/AuthContext';

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
  const navigate = useNavigate();
  const { register, loading, error, clearError } = useAuth();
  
  // Collection of hadiths and Quran verses about goodwill and charity
  const verses = [
    "The Prophet Muhammad (peace be upon him) said: \"Charity does not decrease wealth, no one forgives another except that Allah increases his honor, and no one humbles himself for the sake of Allah except that Allah raises his status.\" (Muslim)",
    
    "And whatever you spend in good, it will be repaid to you in full, and you shall not be wronged. (Quran 2:272)",
    
    "The Prophet said: \"The upper hand is better than the lower hand. The upper hand is the one that gives, and the lower hand is the one that takes.\" (Bukhari and Muslim)",
    
    "Those who spend their wealth in charity day and night, secretly and openly—their reward is with their Lord. And there will be no fear for them, nor will they grieve. (Quran 2:274)",
    
    "The Prophet said: \"Give charity without delay, for it stands in the way of calamity.\" (Tirmidhi)",
    
    "Who is he that will lend to Allah a beautiful loan which Allah will double unto his credit and multiply it many times? (Quran 2:245)",
    
    "The Prophet said: \"Save yourself from hellfire by giving even half a date in charity.\" (Bukhari)",
    
    "By no means shall you attain righteousness unless you give freely of that which you love. (Quran 3:92)"
  ];

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
      await register(name, email, password);
      setSuccess('Registration successful! Please check your email to verify your account.');
      
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

  const handleGoogleSignUp = () => {
    // Google sign up logic is handled by the login page
    navigate('/login');
  };

  const handleFacebookSignUp = () => {
    // Facebook sign up logic would go here
    console.log('Sign up with Facebook clicked');
  };

  return (
    <div className="min-h-screen bg-blue-100 flex">
      <div className="w-full flex flex-col md:flex-row max-w-7xl mx-auto">
        {/* Left side - Verses and Info */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12">
          <div className="max-w-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Our donation app helps you connect and share with those in need in your community.
            </h2>
            <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
              <p className="text-lg text-gray-700 italic">{currentVerse}</p>
            </div>
          </div>
        </div>
        
        {/* Right side - Sign Up Form */}
        <div className="w-full md:w-1/2 bg-white p-8 md:p-12 shadow-lg">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Create an account</h1>
          <p className="mb-6 text-center text-gray-600">Join our community of donors</p>
          
          {error && (
            <div className="mb-4 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          {success && (
            <div className="mb-4 bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{success}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                className={`w-full px-4 py-2 border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              {formErrors.name && (
                <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address *
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email address"
                className={`w-full px-4 py-2 border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {formErrors.email && (
                <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password *
              </label>
              <input
                id="password"
                type="password"
                placeholder="Create a password (min. 6 characters)"
                className={`w-full px-4 py-2 border ${formErrors.password ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {formErrors.password && (
                <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
              )}
            </div>
            
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm password *
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className={`w-full px-4 py-2 border ${formErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {formErrors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{formErrors.confirmPassword}</p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition duration-200 disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>
          
          <div className="mt-6">
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-600">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            
            <div className="mt-6 space-y-4">
              <button
                onClick={handleGoogleSignUp}
                className="w-full flex items-center justify-center bg-white border border-gray-300 rounded px-4 py-2 hover:bg-gray-50 transition duration-200"
              >
                <img 
                  src="https://www.svgrepo.com/show/475656/google-color.svg" 
                  alt="Google logo" 
                  className="w-6 h-6 mr-2"
                />
                <span>Sign up with Google</span>
              </button>
              
              <button
                onClick={handleFacebookSignUp}
                className="w-full flex items-center justify-center bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition duration-200"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
                <span>Sign up with Facebook</span>
              </button>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-green-600 hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 