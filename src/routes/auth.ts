import { Router } from 'express';
import axios from 'axios';

// Initialize router
const router = Router();

// Google OAuth callback route
router.get('/google/callback', async (req, res) => {
  const { code } = req.query;
  
  try {
    // Exchange code for tokens from Google
    const response = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.BACKEND_URL}/api/auth/google/callback`,
      grant_type: 'authorization_code'
    });
    
    const { id_token, access_token } = response.data;
    
    // Get user profile from Google
    const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` }
    });
    
    const { sub, email, name, picture } = userInfo.data;
    
    // Send ID token to our backend for verification and user creation/login
    const authResponse = await axios.post(`${process.env.BACKEND_URL}/api/auth/google`, {
      idToken: id_token
    });
    
    // Redirect to frontend with token
    const redirectUrl = `${process.env.FRONTEND_URL}?token=${authResponse.data.token}`;
    res.redirect(redirectUrl);
  } catch (error) {
    console.error('Google OAuth error:', error);
    res.redirect(`${process.env.FRONTEND_URL}/login?error=google_oauth_failed`);
  }
});

export default router; 