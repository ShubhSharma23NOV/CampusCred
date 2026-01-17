# CampusCred Tech Stack

Complete technical architecture aligned with hackathon PPT specifications.

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     CampusCred Platform                      │
├─────────────────────────────────────────────────────────────┤
│  Frontend: React 19 + Vite 7 + Tailwind CSS 4              │
│  Backend: Firebase Cloud Functions (Node.js 18)             │
│  Database: Firebase Firestore (NoSQL Cloud Database)        │
│  Auth: Firebase Authentication (Multi-role)                 │
│  Storage: Firebase Cloud Storage                            │
│  AI: Google Gemini AI (Matching + Analytics)                │
│  Integration: Google Forms API + Google Sheets API          │
│  Hosting: Firebase Hosting                                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 Frontend Stack

### **Core Framework**
- **React 19.2.0** - Latest React with concurrent features
  - Component-based architecture
  - Hooks for state management
  - Concurrent rendering for better UX
  
- **Vite 7.2.4** - Next-generation build tool
  - Lightning-fast HMR (Hot Module Replacement)
  - Optimized production builds
  - Native ES modules support
  - 10x faster than traditional bundlers

### **Styling & UI**
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
  - Custom design system
  - Responsive by default
  - Dark mode support ready
  
- **shadcn/ui** - High-quality component library
  - Accessible components (ARIA compliant)
  - Customizable with Tailwind
  - Built on Radix UI primitives

- **Lucide React** - Beautiful icon system
  - 1000+ icons
  - Tree-shakeable
  - Consistent design language

### **State Management**
- **React Hooks** - Built-in state management
  - useState for local state
  - useEffect for side effects
  - useContext for global state
  - Custom hooks for reusable logic

### **Routing**
- **Client-side routing** with React state
  - Fast navigation
  - No page reloads
  - Smooth transitions

---

## ⚙️ Backend Stack

### **Firebase Cloud Functions**
- **Node.js 18** - JavaScript runtime
- **Express.js** - HTTP server framework
- **Firebase Admin SDK** - Server-side Firebase access

#### **Function Types**

1. **Firestore Triggers**
   ```javascript
   // Automatic validation on new experience
   exports.validateExperience = functions.firestore
       .document('experiences/{experienceId}')
       .onCreate(async (snap, context) => { ... });
   ```

2. **HTTP Functions**
   ```javascript
   // API endpoints for AI matching
   exports.api = functions.https.onRequest(app);
   ```

3. **Scheduled Functions**
   ```javascript
   // Daily analytics generation
   exports.generateDailyAnalytics = functions.pubsub
       .schedule('every 24 hours')
       .onRun(async (context) => { ... });
   ```

### **Key Functions**

| Function | Trigger | Purpose |
|----------|---------|---------|
| `validateExperience` | Firestore onCreate | Validate student submissions |
| `updateCredibilityScore` | Firestore onUpdate | Calculate credibility scores |
| `generateDailyAnalytics` | Scheduled (daily) | Generate analytics reports |
| `api/matchCandidates` | HTTP POST | AI-powered candidate matching |

---

## 🗄️ Database Stack

### **Firebase Firestore**
- **NoSQL Cloud Database**
- **Real-time synchronization**
- **Offline support**
- **Automatic scaling**

#### **Data Structure**

```
firestore/
├── students/
│   └── {studentId}
│       ├── name, email, cgpa, branch
│       ├── skills[], internships[]
│       ├── credibilityScore
│       └── placementStatus
│
├── experiences/
│   └── {experienceId}
│       ├── studentId, company, role
│       ├── type, startDate, endDate
│       ├── skills[], description
│       ├── status (pending/approved/rejected)
│       └── validationStatus
│
├── recruiters/
│   └── {recruiterId}
│       ├── name, email, company
│       └── role
│
├── admins/
│   └── {adminId}
│       ├── name, email
│       └── role
│
├── notifications/
│   └── {notificationId}
│       ├── recipientId, recipientRole
│       ├── type, title, message
│       ├── read
│       └── createdAt
│
└── analytics/
    └── {analyticsId}
        ├── totalStudents, placedStudents
        ├── averageCGPA, averageCredibility
        └── timestamp
```

#### **Indexes**
- Composite indexes for complex queries
- Optimized for common access patterns
- Defined in `firestore.indexes.json`

---

## 🔐 Authentication Stack

### **Firebase Authentication**
- **Email/Password** authentication
- **Google OAuth** (optional)
- **Multi-role support** (Student/Recruiter/Admin)
- **JWT tokens** for secure API access
- **Session management**

#### **Security Rules**
```javascript
// Role-based access control
function isStudent() {
  return request.auth != null && 
         get(/databases/$(database)/documents/students/$(request.auth.uid)).data.role == 'student';
}
```

---

## 🤖 AI & Analytics Stack

### **Google Gemini AI**
- **Model**: Gemini Pro
- **API**: REST API via Google AI Studio
- **Use Cases**:
  - Candidate-job matching
  - Skill gap analysis
  - Placement predictions
  - Strategic recommendations
  - Resume insights

#### **AI Features**

1. **Candidate Matching**
   - Semantic skill matching
   - Experience relevance scoring
   - Academic fit analysis
   - Credibility weighting

2. **Analytics**
   - Skill gap identification
   - Placement probability prediction
   - Internship-placement correlation
   - Strategic recommendations

3. **Insights Generation**
   - Candidate profile summaries
   - Cohort analysis
   - Market trend analysis

---

## 📊 Integration Stack

### **Google Workspace APIs**

#### **Google Forms API**
- Student data collection
- Dynamic form generation
- Response validation
- Auto-sync to Firestore

#### **Google Sheets API**
- Admin data management
- Real-time spreadsheet sync
- CSV export functionality
- Bulk data operations

---

## 💾 Storage Stack

### **Firebase Cloud Storage**
- **Document storage** (PDFs, images)
- **Proof uploads** (certificates, offer letters)
- **Profile pictures**
- **Security rules** for access control
- **CDN delivery** for fast access

#### **Storage Structure**
```
storage/
├── students/{studentId}/
│   ├── documents/
│   │   ├── resume.pdf
│   │   └── certificates/
│   └── profile.jpg
│
└── experiences/{experienceId}/
    └── proofs/
        ├── offer_letter.pdf
        └── completion_certificate.pdf
```

---

## 🚀 Deployment Stack

### **Firebase Hosting**
- **Global CDN** for fast delivery
- **Automatic SSL** certificates
- **Custom domain** support
- **Rollback** capability
- **Preview channels** for testing

### **CI/CD Pipeline**
```bash
# Build
npm run build

# Deploy
firebase deploy

# Rollback if needed
firebase hosting:rollback
```

---

## 📦 Package Management

### **Frontend Dependencies**
```json
{
  "firebase": "^12.7.0",
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "tailwindcss": "^4.1.18",
  "vite": "^7.2.4"
}
```

### **Backend Dependencies**
```json
{
  "firebase-admin": "^12.0.0",
  "firebase-functions": "^4.5.0",
  "@google-cloud/aiplatform": "^3.0.0",
  "express": "^4.18.2"
}
```

---

## 🔧 Development Tools

### **Code Quality**
- **ESLint** - JavaScript linting
- **Prettier** - Code formatting
- **Firebase Emulators** - Local testing

### **Testing**
- **Firebase Functions Test** - Unit testing
- **Firestore Emulator** - Database testing
- **Auth Emulator** - Authentication testing

### **Monitoring**
- **Firebase Console** - Real-time monitoring
- **Google Cloud Logging** - Function logs
- **Firebase Performance** - Performance metrics
- **Google Analytics** - User analytics

---

## 🌐 API Endpoints

### **Cloud Functions API**

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/matchCandidates` | POST | Get AI-matched candidates |
| `/api/analytics` | GET | Get analytics data |
| `/api/notifications` | GET | Get user notifications |

### **Firebase SDK**
- Direct Firestore access from frontend
- Real-time listeners for live updates
- Optimistic UI updates

---

## 📱 Progressive Web App (PWA)

### **Features**
- **Offline support** via Firestore cache
- **Install prompt** for mobile
- **Push notifications** via FCM
- **App-like experience**

---

## 🔒 Security Stack

### **Security Layers**

1. **Firebase Security Rules**
   - Firestore rules for data access
   - Storage rules for file access
   - Role-based permissions

2. **Firebase App Check**
   - Protects backend from abuse
   - Verifies requests from legitimate apps

3. **HTTPS Everywhere**
   - All traffic encrypted
   - Automatic SSL certificates

4. **Environment Variables**
   - Sensitive keys in `.env`
   - Never committed to git

---

## 📊 Performance Optimization

### **Frontend**
- **Code splitting** with Vite
- **Lazy loading** for routes
- **Image optimization**
- **Tree shaking** for smaller bundles

### **Backend**
- **Function cold start** optimization
- **Firestore query** optimization
- **Caching** strategies
- **Connection pooling**

### **Database**
- **Composite indexes** for fast queries
- **Denormalization** where needed
- **Pagination** for large datasets

---

## 🎯 Tech Stack Alignment with PPT

| PPT Requirement | Implementation | Status |
|----------------|----------------|--------|
| React Frontend | React 19 + Vite 7 | ✅ Complete |
| Node.js Backend | Firebase Cloud Functions (Node 18) | ✅ Complete |
| Firebase/Firestore | Firebase Suite | ✅ Complete |
| Gemini AI | Google Gemini Pro API | ✅ Complete |
| Google Forms | Forms API Integration | ✅ Ready |
| Google Sheets | Sheets API Integration | ✅ Ready |
| Cloud Functions | Validation, Notifications, Analytics | ✅ Complete |
| Authentication | Firebase Auth (Multi-role) | ✅ Complete |

---

## 🚀 Scalability

### **Current Capacity**
- **Users**: 10,000+ concurrent
- **Database**: Unlimited (Firestore auto-scales)
- **Functions**: Auto-scaling
- **Storage**: Unlimited

### **Cost Optimization**
- **Free tier** covers development
- **Pay-as-you-go** for production
- **Generous free quotas**:
  - 50K reads/day (Firestore)
  - 20K writes/day (Firestore)
  - 2M function invocations/month

---

## 📚 Documentation

- **Code Comments**: Inline documentation
- **API Docs**: Function descriptions
- **Setup Guide**: SETUP.md
- **README**: Project overview

---

**Tech Stack Version**: 1.0.0  
**Last Updated**: January 2026  
**Maintained By**: CampusCred Team
