import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (element: HTMLElement, config: any) => void;
          prompt: () => void;
        };
      };
    };
  }
}

const GoogleLogin: React.FC = () => {
  const { googleLogin, loading, error } = useAuth();
  const [googleScriptLoaded, setGoogleScriptLoaded] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);

  useEffect(() => {
    // Load the Google Sign-In script
    const loadGoogleScript = () => {
      // Check if script is already loaded
      if (document.querySelector('script#google-client')) {
        setGoogleScriptLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.id = 'google-client';
      script.async = true;
      script.defer = true;
      script.onload = () => setGoogleScriptLoaded(true);
      script.onerror = () => setInitError('Failed to load Google script');
      document.body.appendChild(script);
    };

    loadGoogleScript();
    
    // Cleanup on unmount
    return () => {
      const scriptElement = document.querySelector('script#google-client');
      if (scriptElement) {
        scriptElement.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (googleScriptLoaded && window.google) {
      try {
        // Get the current origin for proper configuration
        const origin = window.location.origin;
        console.log('Initializing Google Sign-In with origin:', origin);
        
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
          ux_mode: 'popup',
          context: 'signin',
          nonce: crypto.randomUUID(),
          use_fedcm_for_prompt: true
        });

        // Render the button
        const buttonElement = document.getElementById('google-signin-button');
        if (buttonElement) {
          window.google.accounts.id.renderButton(buttonElement, {
            theme: 'outline',
            size: 'large',
            type: 'standard',
            text: 'continue_with',
            shape: 'rectangular',
            logo_alignment: 'left',
            width: 320
          });
        }
      } catch (err) {
        console.error('Google Sign-In initialization error:', err);
        setInitError('Failed to initialize Google Sign-In');
      }
    }
  }, [googleScriptLoaded]);

  const handleCredentialResponse = async (response: any) => {
    console.log('Google credential response received:', {
      clientId: response.clientId,
      select_by: response.select_by,
      credential: response.credential ? response.credential.substring(0, 20) + '...' : 'No credential'
    });

    if (response.credential) {
      try {
        // Send the credential (ID token) to the backend
        await googleLogin(response.credential);
        console.log('Google login successful');
      } catch (err) {
        console.error('Error during Google login:', err);
        setInitError('Failed to authenticate with Google');
      }
    } else {
      console.error('No credential in response:', response);
      setInitError('Google authentication failed');
    }
  };

  if (initError) {
    return (
      <div className="my-4 p-3 bg-red-100 text-red-700 rounded">
        <p>Error: {initError}</p>
        <p>Please try again later or use email sign-in.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <div
        id="google-signin-button"
        className={`w-full flex justify-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      />
      {loading && <p className="mt-2 text-sm text-gray-500">Signing in...</p>}
    </div>
  );
};

export default GoogleLogin; 