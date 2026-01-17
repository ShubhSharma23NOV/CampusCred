# CampusCred Setup Guide

Complete setup instructions for deploying CampusCred with Firebase, Firestore, Cloud Functions, and Gemini AI.

---

## 📋 Prerequisites

- **Node.js** v18 or higher
- **npm** or **yarn**
- **Firebase CLI** (`npm install -g firebase-tools`)
- **Google Cloud Account** (for Firebase and Gemini AI)
- **Git** (for version control)

---

## 🚀 Quick Start (Demo Mode)

For immediate testing without Firebase setup:

```bash
# Clone the repository
git clone https://github.com/yourusername/campuscred.git
cd campuscred

# Install frontend dependencies
cd frontend
npm install

# Start development server
npm run dev
```

The app will run at `http://localhost:5173/` with mock data and localStorage.

---

## 🔥 Firebase Setup (Production)

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Enter project name: `campuscred` (or your choice)
4. Enable Google Analytics (optional)
5. Click "Create Project"

### Step 2: Enable Firebase Services

#### **Authentication**
1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Enable **Email/Password**
3. Enable **Google** (optional)
4. Save changes

#### **Firestore Database**
1. Go to **Firestore Database** > **Create database**
2. Choose **Start in production mode**
3. Select location (closest to your users)
4. Click "Enable"

#### **Storage**
1. Go to **Storage** > **Get started**
2. Use default security rules
3. Select same location as Firestore
4. Click "Done"

#### **Cloud Functions**
1. Go to **Functions** > **Get started**
2. Upgrade to **Blaze (Pay as you go)** plan
   - Required for Cloud Functions
   - Free tier includes generous limits

### Step 3: Get Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll to "Your apps" section
3. Click **Web app** icon (</>)
4. Register app with nickname: "CampusCred Web"
5. Copy the `firebaseConfig` object

### Step 4: Configure Environment Variables

```bash
# In frontend directory
cd frontend
cp .env.example .env
```

Edit `.env` and add your Firebase config:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=campuscred.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=campuscred
VITE_FIREBASE_STORAGE_BUCKET=campuscred.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
VITE_FIREBASE_MEASUREMENT_ID=G-ABC123
```

### Step 5: Deploy Firestore Rules and Indexes

```bash
# From project root
firebase login
firebase init

# Select:
# - Firestore
# - Functions
# - Hosting
# - Storage

# Use existing project: campuscred

# Deploy rules and indexes
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
firebase deploy --only storage
```

### Step 6: Deploy Cloud Functions

```bash
# Install function dependencies
cd functions
npm install

# Deploy functions
firebase deploy --only functions
```

This will deploy:
- `validateExperience` - Validates student submissions
- `updateCredibilityScore` - Calculates credibility scores
- `generateDailyAnalytics` - Daily analytics generation
- `api` - HTTP endpoints for AI matching

---

## 🤖 Gemini AI Setup

### Step 1: Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Select your Firebase project
4. Copy the API key

### Step 2: Add to Environment

Add to `frontend/.env`:

```env
VITE_GEMINI_API_KEY=AIzaSy...your_gemini_key
```

### Step 3: Test AI Features

The following features will now use real Gemini AI:
- Candidate insights generation
- Skill gap analysis
- Placement predictions
- Strategic recommendations

---

## 📊 Google Workspace Integration

### Google Forms API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable **Google Forms API**
3. Create credentials (API Key)
4. Add to `.env`:

```env
VITE_GOOGLE_FORMS_API_KEY=your_forms_api_key
```

### Google Sheets API

1. In Google Cloud Console
2. Enable **Google Sheets API**
3. Create credentials (API Key)
4. Add to `.env`:

```env
VITE_GOOGLE_SHEETS_API_KEY=your_sheets_api_key
```

---

## 🏗️ Build and Deploy

### Build Frontend

```bash
cd frontend
npm run build
```

This creates optimized production build in `frontend/dist/`

### Deploy to Firebase Hosting

```bash
# From project root
firebase deploy --only hosting
```

Your app will be live at: `https://campuscred.web.app`

### Deploy Everything

```bash
# Deploy all services at once
firebase deploy
```

---

## 🔧 Development Workflow

### Local Development

```bash
# Terminal 1: Frontend dev server
cd frontend
npm run dev

# Terminal 2: Firebase emulators (optional)
firebase emulators:start
```

### Testing Cloud Functions Locally

```bash
# Start emulators
firebase emulators:start --only functions,firestore

# Functions will run at:
# - http://localhost:5001/campuscred/us-central1/api
```

### Environment-Specific Configs

Create multiple environment files:

- `.env.development` - Local development
- `.env.staging` - Staging environment
- `.env.production` - Production

---

## 📱 Initial Data Setup

### Create Admin User

```javascript
// In Firebase Console > Authentication
// Add user manually:
// Email: admin@yourcollege.edu
// Password: (set secure password)

// Then in Firestore > admins collection
// Add document with ID = user's UID:
{
  role: "admin",
  name: "Admin Name",
  email: "admin@yourcollege.edu",
  createdAt: (timestamp)
}
```

### Seed Sample Data (Optional)

```bash
# Run seed script (create this based on your needs)
node scripts/seedData.js
```

---

## 🔒 Security Checklist

- [ ] Update Firestore security rules for your use case
- [ ] Enable App Check for additional security
- [ ] Set up Firebase Authentication email verification
- [ ] Configure CORS for Cloud Functions
- [ ] Add rate limiting to API endpoints
- [ ] Enable Firebase Security Rules testing
- [ ] Set up monitoring and alerts

---

## 📊 Monitoring and Analytics

### Firebase Console

- **Authentication**: Monitor user signups and logins
- **Firestore**: Track database reads/writes
- **Functions**: Monitor function executions and errors
- **Hosting**: Track bandwidth and requests

### Google Analytics

Already integrated if enabled during Firebase setup.

### Custom Logging

Cloud Functions automatically log to Google Cloud Logging.

---

## 🐛 Troubleshooting

### Firebase Connection Issues

```bash
# Check Firebase CLI version
firebase --version

# Re-login if needed
firebase logout
firebase login
```

### Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Function Deployment Errors

```bash
# Check function logs
firebase functions:log

# Deploy specific function
firebase deploy --only functions:functionName
```

### Environment Variables Not Loading

- Ensure `.env` file is in `frontend/` directory
- Restart dev server after changing `.env`
- Check variable names start with `VITE_`

---

## 📚 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Cloud Functions Guide](https://firebase.google.com/docs/functions)
- [Gemini AI Documentation](https://ai.google.dev/docs)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

---

## 🆘 Support

For issues and questions:
- Check [GitHub Issues](https://github.com/yourusername/campuscred/issues)
- Email: support@campuscred.com
- Documentation: [docs.campuscred.com](https://docs.campuscred.com)

---

## 🎉 You're All Set!

Your CampusCred platform is now ready with:
- ✅ Firebase Authentication
- ✅ Firestore Database
- ✅ Cloud Functions
- ✅ Firebase Hosting
- ✅ Gemini AI Integration
- ✅ Google Workspace APIs

Start building the future of campus placements! 🚀
