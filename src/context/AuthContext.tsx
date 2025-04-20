import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from '../api/axiosConfig';

// Define types
interface User {
  id: string;
  email: string;
  name?: string;
  profilePicture?: string;
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithToken: (token: string, userData: any) => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  googleLogin: (credential: string) => Promise<void>;
  logout: () => void;
  verifyEmail: (token: string) => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  clearError: () => void;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Load user from localStorage
const loadUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch (error) {
    console.error('Error parsing user from localStorage', error);
    return null;
  }
};

// Auth provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(loadUser());
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);

  // Check token validity on mount
  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          setLoading(true);
          const response = await axios.get('/api/auth/me');
          const userData = response.data;
          setUser({
            id: userData._id,
            email: userData.email,
            name: userData.name,
            profilePicture: userData.profilePicture,
            isVerified: userData.isVerified
          });
          localStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
          console.error('Token validation error', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
        } finally {
          setLoading(false);
          setInitialized(true);
        }
      } else {
        setInitialized(true);
      }
    };

    validateToken();
  }, []);

  // Register function
  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      await axios.post('/api/auth/register', { name, email, password });
      // Don't set user here - user needs to verify email first
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Registration failed';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post('/api/auth/login', { email, password });
      const { token, user: userData } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      setUser({
        id: userData.id,
        email: userData.email,
        name: userData.name,
        profilePicture: userData.profilePicture,
        isVerified: userData.isVerified
      });
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Login failed';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Login with token (for verification process)
  const loginWithToken = (token: string, userData: any) => {
    try {
      setLoading(true);
      setError(null);
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      setUser({
        id: userData._id || userData.id,
        email: userData.email,
        name: userData.name,
        profilePicture: userData.profilePicture,
        isVerified: userData.isVerified || true
      });
    } catch (err: any) {
      console.error('Error logging in with token', err);
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  };

  // Google login function
  const googleLogin = async (credential: string) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Sending Google credential to backend (first 20 chars):', credential.substring(0, 20) + '...');
      
      // Use the full API URL to avoid any path issues
      const response = await axios.post('/api/auth/google', {
        idToken: credential
      });
      
      const { token, user } = response.data;
      
      // Store the token and user data
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Update state
      setUser(user);
      setLoading(false);
      
      return response.data;
    } catch (error: any) {
      console.error('Google login error:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Failed to authenticate with Google');
      setLoading(false);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  // Verify email function
  const verifyEmail = async (token: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`/api/auth/verify-email/${token}`);
      const { token: authToken, _id, email, name, isVerified } = response.data;
      
      const userData = { 
        id: _id, 
        email, 
        name,
        isVerified 
      };
      
      localStorage.setItem('token', authToken);
      localStorage.setItem('user', JSON.stringify(userData));
      
      setUser(userData);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Email verification failed';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateProfile = async (userData: Partial<User>) => {
    try {
      setLoading(true);
      setError(null);
      
      // Use the full API path with /api prefix to match the pattern used for Google login
      const response = await axios.put('/api/auth/profile', userData);
      const updatedUser = response.data;
      
      // Update user in state and localStorage
      if (user) {
        const newUser = {
          ...user,
          ...updatedUser
        };
        
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
      }
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to update profile';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  // Create the value object
  const value = {
    user,
    loading,
    error,
    login,
    loginWithToken,
    register,
    googleLogin,
    logout,
    verifyEmail,
    updateProfile,
    clearError
  };

  // Don't render children until we've checked the token
  if (!initialized) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 