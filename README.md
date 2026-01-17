# 🎓 CampusCred

**A Centralized Internship & Placement Tracking System with AI-Powered Matching & Verified Credibility**

CampusCred revolutionizes campus recruitment by providing a unified platform that connects students, recruiters, and placement officers. Our system features automatic eligibility filtering, internship-to-placement linkage, AI-powered matching algorithms, and institutional verification workflows—all designed to make hiring decisions faster, fairer, and data-driven.

---

## � Project Architecture (Hackathon Version)

### **Core Innovation**
CampusCred bridges the gap between student experiences and recruiter expectations through:
- **Centralized Data Hub**: Single source of truth for all student internships, projects, and placements
- **AI-Powered Matching**: Intelligent candidate-job matching based on skills, CGPA, branch, and internship relevance
- **Verification Layer**: Institutional validation ensures credibility and reduces resume fraud
- **Automated Workflows**: From eligibility filtering to placement analytics—fully automated

### **System Architecture**
```
┌─────────────────────────────────────────────────────────────┐
│                     CampusCred Platform                      │
├─────────────────────────────────────────────────────────────┤
│  Frontend: React + Vite + Tailwind CSS + shadcn/ui         │
│  Backend: Node.js + Express + Firebase Cloud Functions      │
│  Database: Firebase Firestore (Cloud Storage)               │
│  Auth: Firebase Authentication (Multi-role)                 │
│  AI: Gemini AI (Matching + Analytics)                       │
│  Integration: Google Forms/Sheets API                       │
└─────────────────────────────────────────────────────────────┘
```

---

## ✨ Guaranteed Features (Aligned with PPT)

### **1. Centralized Student & Recruiter Data**
- ✅ Unified database for all student experiences (internships, projects, certifications)
- ✅ Recruiter access to verified candidate profiles
- ✅ TPO/Admin dashboard for institutional oversight
- ✅ Real-time data synchronization across all roles

### **2. Automatic Eligibility Filtering**
- ✅ **Skills Match**: AI-powered skill matching between job requirements and candidate profiles
- ✅ **CGPA/Branch Filter**: Automatic filtering based on academic criteria
- ✅ **Internship Relevance**: Prioritizes candidates with relevant prior experience
- ✅ **Smart Recommendations**: AI suggests best-fit candidates for each role

### **3. Internship → Placement Linkage**
- ✅ Track internship-to-placement conversion rates
- ✅ Link prior internships to current placement opportunities
- ✅ Analyze which internships lead to successful placements
- ✅ Provide students with strategic internship recommendations

### **4. Digital Results + Analytics**
- ✅ **Placement Statistics**: Real-time placement rates, company-wise breakdown
- ✅ **Skill Gap Analysis**: Identify missing skills in student cohorts
- ✅ **Company Performance**: Track recruiter engagement and hiring patterns
- ✅ **Predictive Insights**: AI-powered placement probability scoring

### **5. Role-Based Access Control**
- ✅ **Student Portal**: Log experiences, view recommendations, track applications
- ✅ **Recruiter Dashboard**: Access verified candidates, AI-matched profiles, shortlist management
- ✅ **TPO/Admin Console**: Verification workflows, analytics, institutional reporting

### **6. Verification & Credibility System**
- ✅ Institutional verification workflow for all student submissions
- ✅ Document proof management and validation
- ✅ Credibility scoring based on verification history
- ✅ Evidence-based candidate profiles for recruiters

### **7. Google Workspace Integration**
- ✅ Google Forms for student data collection
- ✅ Google Sheets for admin data management
- ✅ Automated sync between forms and institutional database
- ✅ CSV export for compliance and reporting

---

## 🛠️ Tech Stack

### **Frontend**
- **React 19** - Modern UI library with latest features
- **Vite 7** - Lightning-fast build tool and dev server
- **Tailwind CSS 4** - Utility-first styling framework
- **shadcn/ui** - High-quality, accessible component library
- **Lucide React** - Beautiful icon system

### **Backend**
- **Node.js + Express** - RESTful API server
- **Firebase Cloud Functions** - Serverless backend logic
  - Validation & processing
  - Automated notifications
  - Report generation
  - AI matching orchestration

### **Database & Storage**
- **Firebase Firestore** - NoSQL cloud database for real-time data
- **Firebase Storage** - Document and proof storage
- **Firebase Authentication** - Secure multi-role authentication

### **AI & Analytics**
- **Gemini AI** - Intelligent matching algorithm
  - Candidate-job matching
  - Skill gap analysis
  - Placement predictions
  - Resume parsing and insights

### **Integrations**
- **Google Forms API** - Student data collection
- **Google Sheets API** - Admin data management
- **Firebase Cloud Messaging** - Push notifications

---

## � Current Implementation vs Planned Integrations

| Feature | Current Status | Planned/In Progress |
|---------|---------------|---------------------|
| **Frontend UI/UX** | ✅ Complete (React + Vite + Tailwind) | - |
| **Multi-Role Access** | ✅ Student, Recruiter, Admin portals | - |
| **Google Forms Integration** | ⚠️ Mock UI (localStorage) | 🔄 Real Google Forms API |
| **Google Sheets Management** | ⚠️ Mock interface (localStorage) | 🔄 Real Google Sheets API |
| **Firebase Authentication** | ⚠️ Config ready (placeholder) | 🔄 Active implementation |
| **Firestore Database** | ⚠️ Schema designed | 🔄 Migration from H2 to Firestore |
| **Cloud Functions** | ⚠️ Logic designed | 🔄 Deployment in progress |
| **AI Matching Algorithm** | ⚠️ Mock scoring system | 🔄 Gemini AI integration |
| **Eligibility Filtering** | ⚠️ Frontend logic ready | 🔄 Backend automation |
| **Internship-Placement Link** | ⚠️ Data model ready | 🔄 Analytics implementation |
| **Notifications** | ⚠️ UI placeholders | 🔄 FCM integration |
| **Analytics Dashboard** | ✅ UI complete | 🔄 Real-time data connection |
| **Verification Workflow** | ✅ Complete UI + logic | 🔄 Backend automation |
| **CSV Export** | ✅ Working | - |
| **Credibility Scoring** | ✅ Algorithm implemented | 🔄 AI enhancement |

**Legend:**  
✅ = Fully Working | ⚠️ = Demo/Mock | 🔄 = Integration in Progress

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Firebase Account** (for production deployment)
- **Gemini AI API Key** (for AI features)

### Quick Start (Demo Mode)

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

The application will be available at `http://localhost:5173/`

### Production Setup (With Firebase)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase project
firebase init

# Deploy Cloud Functions
cd functions
npm install
firebase deploy --only functions

# Deploy Frontend
cd ../frontend
npm run build
firebase deploy --only hosting
```

---

## 📁 Project Structure

```
CampusCred/
├── frontend/                    # React frontend application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── ui/            # shadcn/ui components
│   │   │   ├── DesignSystem.jsx
│   │   │   ├── MockGoogleForm.jsx
│   │   │   └── MockGoogleSheet.jsx
│   │   ├── pages/             # Page components (13 unique pages)
│   │   │   ├── StudentDashboard.jsx
│   │   │   ├── ExperienceLedger.jsx
│   │   │   ├── MicroProjects.jsx
│   │   │   ├── SkillsSignals.jsx
│   │   │   ├── ProfileProofs.jsx
│   │   │   ├── RecruiterDashboard.jsx
│   │   │   ├── CandidateEvidenceView.jsx
│   │   │   ├── DecisionPanel.jsx
│   │   │   ├── TpoDashboard.jsx
│   │   │   ├── VerificationConsole.jsx
│   │   │   ├── PlacementTracking.jsx
│   │   │   ├── TpoReports.jsx
│   │   │   └── GoogleIntegration.jsx
│   │   ├── lib/               # Utility functions
│   │   ├── services/          # API services & Firebase config
│   │   ├── App.jsx            # Main application component
│   │   └── main.jsx           # Application entry point
│   └── package.json
│
├── functions/                  # Firebase Cloud Functions (planned)
│   ├── index.js               # Cloud function entry point
│   ├── matching.js            # AI matching logic
│   ├── notifications.js       # Notification handlers
│   └── analytics.js           # Analytics processing
│
├── backend/                    # Spring Boot (legacy - being migrated)
│   └── src/main/java/         # Java source files
│
└── README.md                  # This file
```

---

## 🎯 How It Works

### **Student Journey**
1. **Login** via Firebase Authentication
2. **Log Experience** using Google Forms integration
3. **AI Analysis** processes skills and generates credibility score
4. **Get Matched** to relevant placement opportunities automatically
5. **Track Progress** in real-time dashboard

### **Recruiter Journey**
1. **Login** to recruiter dashboard
2. **View AI-Matched Candidates** based on job requirements
3. **Filter by Eligibility** (CGPA, branch, skills, internship relevance)
4. **Review Verified Evidence** and credibility scores
5. **Shortlist & Export** candidate data

### **Admin/TPO Journey**
1. **Monitor Submissions** via Google Sheets interface
2. **Verify Student Data** through institutional workflow
3. **Approve/Reject** submissions with audit trail
4. **Generate Analytics** (placement stats, skill gaps, company performance)
5. **Export Reports** for compliance and decision-making

---

## 🔐 Demo Access

The application includes fast-access demo buttons for testing:

- **Student Portal** - Click "Student" button on login
- **Recruiter Dashboard** - Click "Recruiter" button on login
- **Admin/TPO Console** - Click "Admin" button on login

**Demo Credentials** (when Firebase Auth is active):
- Student: `student@college.edu` / `demo123`
- Recruiter: `recruiter@company.com` / `demo123`
- Admin: `admin@college.edu` / `demo123`

---

## 🧠 AI Matching Algorithm

### **How It Works**
1. **Data Collection**: Student profiles with skills, CGPA, branch, internships
2. **Job Analysis**: Recruiter requirements parsed and vectorized
3. **Gemini AI Processing**: 
   - Semantic skill matching
   - Internship relevance scoring
   - Academic eligibility verification
   - Experience quality assessment
4. **Ranking**: Candidates ranked by match score (0-100)
5. **Recommendations**: Top matches surfaced to recruiters

### **Matching Criteria**
- **Skills Match** (40%): Direct + transferable skills
- **Academic Fit** (20%): CGPA, branch alignment
- **Experience Relevance** (25%): Prior internship similarity
- **Credibility Score** (15%): Verification history

---

## 📈 Analytics & Insights

### **For Students**
- Placement probability score
- Skill gap recommendations
- Internship-to-placement conversion insights
- Peer comparison analytics

### **For Recruiters**
- Candidate quality metrics
- Time-to-hire analytics
- Source effectiveness (which colleges/branches)
- Hiring funnel visualization

### **For Admins/TPO**
- Overall placement statistics
- Company-wise performance
- Department-wise placement rates
- Skill demand trends
- Verification compliance metrics

---

## � Data Flow Architecture

```
┌──────────────┐
│   Student    │
│  Dashboard   │
└──────┬───────┘
       │ Logs Experience
       ↓
┌──────────────────┐
│  Google Forms    │
│   Integration    │
└──────┬───────────┘
       │ Auto-sync
       ↓
┌──────────────────┐      ┌─────────────────┐
│    Firestore     │◄────►│  Cloud Functions│
│    Database      │      │  (Validation)   │
└──────┬───────────┘      └─────────────────┘
       │
       ├──────────────────┬──────────────────┐
       ↓                  ↓                  ↓
┌──────────────┐   ┌──────────────┐  ┌──────────────┐
│ Admin/TPO    │   │  Gemini AI   │  │  Recruiter   │
│ Verification │   │   Matching   │  │  Dashboard   │
└──────────────┘   └──────────────┘  └──────────────┘
```

---

## 🎨 Design Philosophy

### **Credibility-First**
Every feature is built around institutional verification and trust. We don't just collect data—we validate it.

### **AI-Augmented, Not AI-Replaced**
AI assists in matching and insights, but human verification and decision-making remain central.

### **Startup-Grade UX**
Clean, modern interface with bold typography, smooth animations, and intuitive workflows that feel like a consumer product, not enterprise software.

---

## 🚧 Development Roadmap

### **Phase 1: Core Platform (Current)**
- ✅ Multi-role UI/UX complete
- ✅ Verification workflow implemented
- ✅ Mock integrations for demo
- 🔄 Firebase migration in progress

### **Phase 2: Real Integrations (In Progress)**
- 🔄 Firebase Auth + Firestore deployment
- 🔄 Google Forms/Sheets API integration
- 🔄 Cloud Functions for automation
- 🔄 Gemini AI matching algorithm

### **Phase 3: Advanced Features (Planned)**
- 📋 Push notifications (FCM)
- 📋 Email automation
- 📋 Advanced analytics dashboard
- 📋 Mobile app (React Native)
- 📋 Blockchain credential verification

### **Phase 4: Scale & Enterprise (Future)**
- 📋 Multi-institution support
- 📋 API marketplace for third-party integrations
- 📋 White-label solutions
- 📋 Enterprise SSO

---

## 🎤 30-Second Pitch Script

> "CampusCred solves the biggest problem in campus placements: **information asymmetry**. Students struggle to prove their experience, recruiters can't trust resumes, and placement offices drown in paperwork.
>
> We've built a **centralized platform** where students log verified experiences, **AI automatically matches** them to jobs based on skills and internship relevance, and recruiters get **credibility-scored candidates** they can trust.
>
> Our system features **automatic eligibility filtering**, **internship-to-placement analytics**, and **institutional verification**—all powered by Firebase and Gemini AI.
>
> We're not just digitizing placement—we're making it **intelligent, transparent, and fair**. CampusCred: Where credibility meets opportunity."

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 Team

**CampusCred** - Built with ❤️ for educational institutions

---

## 📞 Support

For support, email support@campuscred.com or open an issue in the repository.

---

## 🙏 Acknowledgments

- **Firebase** for the robust backend infrastructure
- **Google Gemini AI** for intelligent matching capabilities
- **shadcn/ui** for the beautiful component library
- **Tailwind CSS** for the utility-first CSS framework
- **React** and **Vite** teams for the amazing developer experience

---

**CampusCred: Where Credibility Meets Opportunity** 🎓✨
