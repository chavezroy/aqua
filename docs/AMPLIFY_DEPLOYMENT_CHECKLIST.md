# AWS Amplify Deployment Checklist

## ✅ Pre-Deployment Checks Completed

### 1. Build Success
- ✅ **Status**: Build completes successfully
- ✅ **Command**: `npm run build` passes without errors
- ✅ **Output**: All pages generate correctly

### 2. TypeScript Configuration
- ✅ **tsconfig.json**: Properly configured with path aliases
- ✅ **Exclusions**: Reference directories (`loading/`, `Style1/`, `Redesign/`) excluded from build
- ✅ **Type Errors**: All TypeScript errors resolved

### 3. Client-Side Code Safety
- ✅ **localStorage**: All usage wrapped in `typeof window !== "undefined"` checks
- ✅ **Camera API**: Properly guarded with browser environment checks
- ✅ **"use client"**: All interactive components marked correctly

### 4. Next.js Configuration
- ✅ **next.config.js**: Configured for Amplify deployment
- ✅ **No Standalone Output**: Removed (not needed for Amplify)
- ✅ **Static Generation**: All pages properly configured

### 5. Dependencies
- ✅ **package.json**: All required dependencies listed
- ✅ **No Missing Packages**: All imports resolve correctly
- ✅ **Version Compatibility**: Next.js 14.2.35 compatible with Amplify

### 6. File Structure
- ✅ **amplify.yml**: Build configuration file created
- ✅ **Routes**: All routes properly structured in `/src/app/`
- ✅ **Components**: All components in correct locations

---

## 📋 Deployment Steps

### Step 1: Connect Repository
1. Go to AWS Amplify Console
2. Click "New app" → "Host web app"
3. Connect your Git repository (GitHub/GitLab/Bitbucket)
4. Select the branch (usually `main`)

### Step 2: Configure Build Settings
Amplify should auto-detect Next.js, but verify:
- **Build command**: `npm run build`
- **Output directory**: `.next`
- **Base directory**: (leave empty unless project is in subdirectory)

### Step 3: Environment Variables (if needed)
Currently, no environment variables are required. If you add any later:
- Go to App settings → Environment variables
- Add any required variables

### Step 4: Review and Deploy
- Review the build settings
- Click "Save and deploy"
- Monitor the build logs

---

## 🔍 Potential Issues & Solutions

### Issue 1: Camera Permissions
**Problem**: Visual search requires camera access (HTTPS required)
**Solution**: 
- Amplify provides HTTPS by default ✅
- Users must grant camera permissions in browser
- App handles permission denial gracefully

### Issue 2: localStorage in SSR
**Status**: ✅ Already handled
- All localStorage access wrapped in `typeof window` checks
- Store functions return safe defaults during SSR

### Issue 3: Browser APIs
**Status**: ✅ Already handled
- Camera API checks for `navigator.mediaDevices` existence
- Graceful fallback if camera unavailable

### Issue 4: Static File Imports
**Status**: ✅ Working
- JSON imports properly configured in tsconfig.json
- `resolveJsonModule: true` enabled

### Issue 5: Build Performance
**Status**: ✅ Optimized
- Reference directories excluded from TypeScript compilation
- Build cache configured in amplify.yml

---

## 🚀 Post-Deployment Verification

After deployment, test:

1. **Homepage**: `/` loads correctly
2. **Setup Page**: `/setup` works
3. **Visual Search**: `/visual-search` (requires HTTPS for camera)
4. **Unit Selection**: `/unit-selection` works
5. **Dashboard**: Main dashboard with tank configuration
6. **localStorage**: Data persists across sessions
7. **Responsive**: Test on mobile/tablet/desktop

---

## 📝 Notes

- **HTTPS Required**: Camera access requires HTTPS (Amplify provides this)
- **Browser Support**: Modern browsers only (Chrome, Firefox, Safari, Edge)
- **Mobile**: Visual search works best on mobile devices with rear cameras
- **Fallback**: If camera unavailable, app shows error gracefully

---

## 🔧 Configuration Files

### amplify.yml
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

### next.config.js
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
}

module.exports = nextConfig
```

### tsconfig.json
- Excludes reference directories
- Proper path aliases configured
- JSON module resolution enabled

---

## ✅ Ready for Deployment

All checks passed. The application is ready to deploy to AWS Amplify.
