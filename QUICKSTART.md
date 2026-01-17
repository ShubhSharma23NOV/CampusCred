# CampusCred - Quick Start Guide

Get CampusCred running in 5 minutes! ⚡

---

## 🚀 **Option 1: Demo Mode (Fastest)**

No Firebase setup needed. Perfect for immediate testing.

```bash
# 1. Navigate to frontend
cd frontend

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

**Done!** Open `http://localhost:5173/`

### **Demo Features:**
- ✅ All UI/UX working
- ✅ Mock data and localStorage
- ✅ AI matching algorithms (local)
- ✅ Google Forms/Sheets (mock)
- ✅ All 3 roles accessible

### **Test Login:**
- Click "Student" / "Recruiter" / "Admin" buttons on login page

---

## 🔥 **Option 2: With Firebase (Production)**

Full setup with real Firebase backend.

### **Prerequisites:**
- Firebase account
- Firebase CLI installed: `npm install -g firebase-tools`

### **Steps:**

#### **1. Clone & Install**
```bash
git clone https://github.com/yourusername/campuscred.git
cd campuscred
npm run install:all
```

#### **2. Create Firebase Project**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create new project: "campuscred"
3. Enable Authentication, Firestore, Storage, Functions

#### **3. Get Firebase Config**
1. Project Settings > General > Your apps
2. Click Web app icon (</>)
3. Copy firebaseConfig object

#### **4. Configure Environment**
```bash
cd frontend
cp .env.example .env
# Edit .env and paste your Firebase config
```

#### **5. Deploy Firebase**
```bash
# Login to Firebase
firebase login

# Initialize (if not done)
firebase init

# Deploy
firebase deploy
```

#### **6. Start Development**
```bash
npm run dev
```

**Done!** Your app is now connected to Firebase.

---

## 🤖 **Option 3: With Gemini AI**

Add AI-powered features.

### **Steps:**

#### **1. Get Gemini API Key**
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create API key
3. Copy the key

#### **2. Add to Environment**
```bash
# In frontend/.env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

#### **3. Restart Dev Server**
```bash
npm run dev
```

**Done!** AI features now use real Gemini AI.

---

## 📊 **Testing Features**

### **1. Student Portal**
```
1. Click "Student" on login
2. Click "Log New Experience" button
3. Fill and submit form
4. Check "Ledger" tab to see entry
```

### **2. Recruiter Dashboard**
```
1. Click "Recruiter" on login
2. Click "AI Filters" button
3. Set criteria (CGPA, skills, branch)
4. See AI-matched candidates
5. Click candidate to view AI Match Analysis
```

### **3. Admin/TPO Console**
```
1. Click "Admin" on login
2. Go to "Google" tab
3. Click "Open Management Sheet"
4. See all student submissions
5. Go to "Analytics" tab
6. View internship-placement linkage
```

---

## 🛠️ **Common Commands**

```bash
# Development
npm run dev                    # Start frontend dev server

# Build
npm run build                  # Build for production

# Firebase
npm run firebase:emulators     # Run Firebase emulators
npm run firebase:deploy        # Deploy everything
npm run firebase:logs          # View function logs

# Install
npm run install:all            # Install all dependencies
```

---

## 🐛 **Troubleshooting**

### **Port Already in Use**
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or use different port
npm run dev -- --port 3000
```

### **Firebase Not Configured**
```bash
# Check if .env exists
ls frontend/.env

# If not, copy example
cp frontend/.env.example frontend/.env
```

### **Dependencies Error**
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### **Build Errors**
```bash
# Clear Vite cache
rm -rf frontend/node_modules/.vite
npm run dev
```

---

## 📱 **Access Points**

### **Local Development**
- Frontend: `http://localhost:5173/`
- Firebase Emulators: `http://localhost:4000/`
- Functions: `http://localhost:5001/`

### **Production (After Deploy)**
- App: `https://campuscred.web.app`
- Functions: `https://us-central1-campuscred.cloudfunctions.net/api`

---

## 🎯 **Quick Feature Tour**

### **Student Features (5)**
1. **Dashboard** - Overview + Log Experience button
2. **Ledger** - Experience history
3. **Projects** - Project portfolio
4. **Signals** - Skills analytics
5. **Profile** - Profile management

### **Recruiter Features (3 + AI)**
1. **Dashboard** - Candidate pool + AI Filters
2. **Evidence** - Detailed candidate view + AI Match Panel
3. **Shortlist** - Decision management

### **Admin Features (6)**
1. **Dashboard** - Institutional overview
2. **Verification** - Review submissions
3. **Tracking** - Placement tracking
4. **Reports** - Analytics & export
5. **Google** - Sheet management
6. **Analytics** - Internship-placement linkage

---

## 🎤 **Demo Script (2 Minutes)**

### **Minute 1: Problem & Solution**
> "Campus placements suffer from information asymmetry. Students can't prove experience, recruiters can't trust resumes. CampusCred solves this with institutional verification and AI-powered matching."

### **Minute 2: Live Demo**
1. **Student**: "Students log experiences via Google Forms"
2. **Admin**: "Admins verify and manage via Google Sheets"
3. **Recruiter**: "Recruiters get AI-matched, verified candidates"
4. **Analytics**: "Data proves internships increase placements by X%"

### **Closing**
> "Built on React + Firebase + Gemini AI. Serverless, scalable, and production-ready. Questions?"

---

## 📚 **Next Steps**

### **For Development:**
1. Read [SETUP.md](./SETUP.md) for detailed setup
2. Check [TECH_STACK.md](./TECH_STACK.md) for architecture
3. Review [README.md](./README.md) for features

### **For Production:**
1. Create Firebase project
2. Configure environment variables
3. Deploy Cloud Functions
4. Deploy to Firebase Hosting
5. Add custom domain (optional)

### **For Hackathon:**
1. Test all features
2. Prepare demo data
3. Practice pitch
4. Have backup plan (demo mode)

---

## ✅ **Pre-Demo Checklist**

- [ ] Dev server running
- [ ] All 3 roles tested
- [ ] AI matching working
- [ ] Analytics page loaded
- [ ] Google integration shown
- [ ] Pitch practiced
- [ ] Backup plan ready

---

## 🆘 **Need Help?**

### **During Development:**
- Check console for errors
- Review [SETUP.md](./SETUP.md)
- Check Firebase Console logs

### **During Demo:**
- Use demo mode (no Firebase needed)
- Have screenshots ready
- Explain "production-ready" architecture

---

## 🎉 **You're Ready!**

Your CampusCred is now:
- ✅ Running locally
- ✅ All features working
- ✅ Demo-ready
- ✅ Production-ready architecture

**Go build the future of campus placements!** 🚀

---

**Quick Start Version**: 1.0  
**Last Updated**: January 2026  
**Estimated Setup Time**: 5 minutes (demo) | 30 minutes (full)
