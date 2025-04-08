# Donation Frontend

Frontend web application for the Donation platform. This React application allows users to register, log in, verify their email, and access donation services.

## Features

- User registration with email verification
- Login with email/password
- Google OAuth authentication
- Email verification
- Responsive design with Tailwind CSS

## Tech Stack

- React
- TypeScript
- React Router
- Axios for API requests
- Tailwind CSS for styling
- Vite as build tool
- Google OAuth integration

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```
# API URL
VITE_API_URL=http://localhost:5000/api

# Google OAuth Client ID
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

For production, create a `.env.production` file:

```
VITE_API_URL=https://api.yourdonationapp.com/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

## Installation and Running

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build:prod

# Preview production build
npm run preview
```

## Application Structure

- `/src`
  - `/api` - API client configuration
  - `/components` - Reusable UI components
  - `/context` - React context providers (Auth)
  - `/pages` - Page components
  - `/utils` - Utility functions

## Deployment

### Prerequisites

- Node.js 16+ installed
- Access to your hosting platform (Vercel, Netlify, etc.)

### Steps for Production Deployment

1. **Build the Application**

   ```bash
   npm run build:prod
   ```

   This will create a `dist` folder with optimized production files.

2. **Deploy to Hosting Service**

   **Vercel**:
   ```bash
   npm install -g vercel
   vercel
   ```

   **Netlify**:
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod
   ```

   **GitHub Pages**:
   Add to package.json:
   ```json
   {
     "homepage": "https://yourusername.github.io/donation",
     "scripts": {
       "predeploy": "npm run build:prod",
       "deploy": "gh-pages -d dist"
     }
   }
   ```
   Then run:
   ```bash
   npm install -g gh-pages
   npm run deploy
   ```

3. **Configure Environment Variables**

   Set environment variables on your hosting platform:
   - `VITE_API_URL`: Your backend API URL
   - `VITE_GOOGLE_CLIENT_ID`: Your Google OAuth client ID

4. **Configure Routing**

   For SPA routing, ensure your hosting service redirects 404s to index.html:

   **Vercel**: Create a `vercel.json` file:
   ```json
   {
     "routes": [{ "src": "/(.*)", "dest": "/index.html" }]
   }
   ```

   **Netlify**: Create a `_redirects` file in the public directory:
   ```
   /* /index.html 200
   ```

## Best Practices

- Keep sensitive information in environment variables
- Use TypeScript for type safety
- Follow component-based architecture
- Implement proper error handling
- Maintain responsive design for all devices

## Development Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)
- [React Router Documentation](https://reactrouter.com/docs/en/v6)

## Setting Up OAuth for Production

### Using a Free Domain with Google OAuth

Google OAuth requires authorized origins to be valid domain names, not IP addresses. Follow these steps:

1. **Get a free domain**:
   - [Duck DNS](https://www.duckdns.org/): Provides free subdomains
   - [Freenom](https://www.freenom.com/): Offers free domains (.tk, .ml, etc.)

2. **Point your domain to your server's IP address** (192.168.134.168)

3. **Configure Google Cloud Console**:
   - Go to Google Cloud Console → APIs & Services → Credentials
   - Edit your OAuth 2.0 Client ID
   - Add your domain to **Authorized JavaScript origins**
   - Add your redirect URI to **Authorized redirect URIs**

4. **Update your environment configuration**:
   - Frontend `.env.production`: 
     ```
     VITE_API_URL=https://yourdomain.example/api
     ```
   - Backend `.env.production`:
     ```
     FRONTEND_URL=https://yourdomain.example
     BACKEND_URL=https://yourdomain.example/api
     ```

5. **Use Cloudflare for free SSL** (optional) 