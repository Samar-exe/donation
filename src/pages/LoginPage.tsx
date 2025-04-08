import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';

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
    "The Prophet Muhammad (peace be upon him) said: \"Charity does not decrease wealth, no one forgives another except that Allah increases his honor, and no one humbles himself for the sake of Allah except that Allah raises his status.\" (Muslim)",
    
    "And whatever you spend in good, it will be repaid to you in full, and you shall not be wronged. (Quran 2:272)",
    
    "The Prophet said: \"The upper hand is better than the lower hand. The upper hand is the one that gives, and the lower hand is the one that takes.\" (Bukhari and Muslim)",
    
    "Those who spend their wealth in charity day and night, secretly and openly—their reward is with their Lord. And there will be no fear for them, nor will they grieve. (Quran 2:274)",
    
    "The Prophet said: \"Give charity without delay, for it stands in the way of calamity.\" (Tirmidhi)",
    
    "Who is he that will lend to Allah a beautiful loan which Allah will double unto his credit and multiply it many times? (Quran 2:245)",
    
    "The Prophet said: \"Save yourself from hellfire by giving even half a date in charity.\" (Bukhari)",
    
    "By no means shall you attain righteousness unless you give freely of that which you love. (Quran 3:92)"
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

  const handleFacebookLogin = () => {
    // Facebook login logic would go here
    console.log('Facebook login not implemented yet');
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
        
        {/* Right side - Login Form */}
        <div className="w-full md:w-1/2 bg-white p-8 md:p-12 shadow-lg">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Login</h1>
          
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email or mobile number"
                className={`w-full px-4 py-2 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
            </div>
            
            <div className="mb-6">
              <input
                type="password"
                placeholder="Password"
                className={`w-full px-4 py-2 border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition duration-200 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          
          <div className="mt-6">
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-600">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            
            <div className="mt-6 space-y-4">
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
                onClick={handleFacebookLogin}
                disabled={loading}
                className="w-full flex items-center justify-center bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition duration-200 disabled:opacity-50"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
                <span>Sign in with Facebook</span>
              </button>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-green-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 