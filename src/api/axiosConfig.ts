import axios from 'axios';

// Log the API URL being used for debugging
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
console.log('Using API URL:', apiUrl);

const instance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // Include cookies with requests
});

// Add a request interceptor to include API prefix if needed
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // No need to add /api prefix since we're now consistently using it in all API calls
    // This avoids any double-prefixing issues
    /*
    if (config.url && !config.url.startsWith('http') && !config.url.startsWith('/api')) {
      config.url = `/api${config.url}`;
    }
    */
    
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle authentication errors
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redirect to login if needed
      if (window.location.pathname !== '/login' && 
          window.location.pathname !== '/register' && 
          !window.location.pathname.startsWith('/verify-email')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default instance; 