# Deployment Configuration Guide

## Render.com Backend Environment Variables

To fix the OAuth redirect issue, configure these environment variables in your Render.com backend service:

### Required Variables

1. **BACKEND_URL** (Critical for OAuth to work)
   ```
   https://repoanalyzer-6yhf.onrender.com
   ```
   This tells the backend what URL to use for OAuth redirect URIs when GitHub redirects back.

2. **FRONTEND_URL**
   ```
   https://repo-analyzer-gamma.vercel.app
   ```
   The main frontend URL for CORS and redirects.

3. **FRONTEND_URLS** (Optional - additional allowed origins)
   ```
   https://repo-analyzer-gamma.vercel.app,http://localhost:5173
   ```

4. **GITHUB_CLIENT_ID**
   - Get from GitHub OAuth App settings

5. **GITHUB_CLIENT_SECRET**
   - Get from GitHub OAuth App settings

6. **MONGODB_URI** or **DB_URI**
   - Your MongoDB connection string

### GitHub OAuth App Configuration

In your GitHub OAuth App settings (https://github.com/settings/developers):

**Authorization callback URL:**
```
https://repoanalyzer-6yhf.onrender.com/api/auth/github/callback
```

**Homepage URL:**
```
https://repo-analyzer-gamma.vercel.app
```

### Vercel Frontend Environment Variables

In your Vercel deployment settings, set:

1. **VITE_API_BASE_URL**
   ```
   https://repoanalyzer-6yhf.onrender.com/api
   ```

## How It Works

1. Frontend calls `startGithubLogin()` which redirects to:
   ```
   https://repoanalyzer-6yhf.onrender.com/api/auth/github?redirect=%2Fworkspace&frontendOrigin=https%3A%2F%2Frepo-analyzer-gamma.vercel.app
   ```

2. Backend's `getOauthRedirectUri()` now properly constructs:
   ```
   https://repoanalyzer-6yhf.onrender.com/api/auth/github/callback
   ```

3. GitHub redirects back to this callback URL with the `code` parameter

4. Backend exchanges code for token and redirects frontend back to workspace

## Testing Locally

For local development:
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:5173`

These are already configured as allowed origins in the CORS settings.

## Troubleshooting

If you still see the error:

1. **Verify BACKEND_URL is set** on Render - this is the most common issue
2. Check GitHub OAuth App's callback URL matches exactly
3. Verify the frontend origin is in FRONTEND_URL or FRONTEND_URLS
4. Check browser console for detailed error messages
5. Ensure Render service is deployed with the latest code
