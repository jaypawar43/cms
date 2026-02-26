# Vercel Deployment Guide

## Changes Made for Vercel Compatibility

The following changes have been made to prepare your frontend for deployment on Vercel:

### 1. Environment Variables Setup
- **`.env.example`** - Template file showing required environment variables
- **`.env.local`** - Local development environment file

### 2. API Configuration
- Updated `src/api/axios.js` to use dynamic API URL from environment variables
- Falls back to `http://localhost:5000/api` for local development
- In production, use the `VITE_API_URL` environment variable

### 3. SPA Routing Configuration
- Added `vercel.json` with proper routing rewrites
- All routes are now correctly served to `index.html` for React Router to handle

### 4. Updated `.gitignore`
- Added proper environment file exclusions

## Deployment Steps

### 1. Set Up Vercel Project
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

### 2. Configure Environment Variables on Vercel

Go to your project settings on Vercel Dashboard and add:

**Environment Variable:**
- **Key:** `VITE_API_URL`
- **Value:** Your backend API URL (e.g., `https://your-backend.onrender.com/api`)
- **Environments:** Production, Preview, Development

### 3. Automatic Deployment

Once connected, Vercel will automatically deploy on each push to your repository:
1. Push changes to GitHub
2. Vercel automatically builds and deploys
3. Your site is live at `your-project.vercel.app`

## CORS Configuration

**Important:** Make sure your backend has CORS properly configured to accept requests from your Vercel domain:

```javascript
// Example backend CORS setup (Node.js/Express)
const cors = require('cors');
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-vercel-domain.vercel.app'
  ],
  credentials: true
}));
```

## Troubleshooting

### 404 Errors on Refresh
✅ Fixed! The `vercel.json` file handles SPA routing with proper rewrites.

### API Connection Issues
- Check that `VITE_API_URL` environment variable is set correctly on Vercel
- Verify CORS is enabled on your backend
- Check browser console for error messages

### Build Failures
- Ensure all dependencies are installed: `npm install`
- Check that no hardcoded URLs exist in the code
- Verify `VITE_API_URL` is set in environment variables

## Local Development

To test locally with environment variables:

```bash
# Frontend directory
cd frontend

# Install dependencies
npm install

# Start dev server (uses .env.local)
npm run dev
```

The app will use `http://localhost:5000/api` for local API calls (or whatever is in `.env.local`).

## Production Build

To test production build locally:

```bash
cd frontend
npm run build
npm run preview
```

## Next Steps

1. Push your code to GitHub (if not already done)
2. Visit [vercel.com](https://vercel.com)
3. Connect your GitHub repository
4. Set the `VITE_API_URL` environment variable in project settings
5. Deploy!
