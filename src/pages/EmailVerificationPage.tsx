import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const EmailVerificationPage: React.FC = () => {
  const [verificationStatus, setVerificationStatus] = useState<'verifying' | 'success' | 'failed'>('verifying');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const location = useLocation();
  const navigate = useNavigate();
  const { verifyEmail, user } = useAuth();

  useEffect(() => {
    const performVerification = async () => {
      try {
        // Extract token and referral code from URL query parameters
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');
        const referralCode = queryParams.get('ref'); // Get referral code if present
        
        console.log('Verification token from URL:', token);
        if (referralCode) {
          console.log('Referral code from URL:', referralCode);
        }

        if (!token) {
          console.error('No token found in URL');
          setVerificationStatus('failed');
          setErrorMessage('No verification token found. Please check your email link.');
          return;
        }

        // Use the context function to verify email with referral code
        await verifyEmail(token, referralCode || undefined);
        setVerificationStatus('success');
        
        // Redirect to home page after 3 seconds
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } catch (error) {
        console.error('Email verification error:', error);
        setVerificationStatus('failed');
        setErrorMessage((error as Error).message || 'Verification failed. Please try again.');
      }
    };

    performVerification();
  }, [location, navigate, verifyEmail]);

  // Render verification status UI
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white shadow-md rounded-lg">
        <div className="text-center">
          {verificationStatus === 'verifying' && (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
              <h2 className="text-2xl font-bold mt-4">Verifying Your Email</h2>
              <p className="mt-2 text-gray-600">Please wait while we verify your email address...</p>
            </>
          )}

          {verificationStatus === 'success' && (
            <>
              <svg className="h-16 w-16 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <h2 className="text-2xl font-bold mt-4">Email Verified!</h2>
              <p className="mt-2 text-gray-600">Your email has been successfully verified.</p>
              <p className="mt-2 text-gray-500">Redirecting you to the homepage...</p>
            </>
          )}

          {verificationStatus === 'failed' && (
            <>
              <svg className="h-16 w-16 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <h2 className="text-2xl font-bold mt-4">Verification Failed</h2>
              <p className="mt-2 text-gray-600">{errorMessage}</p>
              <button
                onClick={() => navigate('/login')}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Back to Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage; 