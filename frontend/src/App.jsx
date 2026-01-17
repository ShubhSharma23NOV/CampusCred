import { useState } from 'react'
import { cn } from "@/lib/utils"
import StudentDashboard from './pages/StudentDashboard'
import TpoDashboard from './pages/TpoDashboard'
import VerificationConsole from './pages/VerificationConsole'
import PlacementTracking from './pages/PlacementTracking'
import TpoReports from './pages/TpoReports'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ExperienceLedger from './pages/ExperienceLedger'
import MicroProjects from './pages/MicroProjects'
import SkillsSignals from './pages/SkillsSignals'
import ProfileProofs from './pages/ProfileProofs'
import RecruiterDashboard from './pages/RecruiterDashboard'
import CandidateEvidenceView from './pages/CandidateEvidenceView'
import DecisionPanel from './pages/DecisionPanel'
import RecruiterPosts from './pages/RecruiterPosts'
import AdminRecruiters from './pages/AdminRecruiters'
import GoogleIntegration from './pages/GoogleIntegration'
import InternshipPlacementAnalytics from './pages/InternshipPlacementAnalytics'
import TestAI from './pages/TestAI'
import { ShieldCheck, Command, Search, Bell, Sparkles, LogOut, LayoutDashboard, History, Briefcase, BarChart3, UserCircle, Users, FileCheck, CheckSquare, FileSpreadsheet, Link2, Bot, Megaphone } from "lucide-react"
import logo from './assets/logo.png'

function App() {
  const [currentPage, setCurrentPage] = useState('login')
  const [view, setView] = useState('student')
  const [studentTab, setStudentTab] = useState('dashboard')
  const [recruiterTab, setRecruiterTab] = useState('dashboard')
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [tpoTab, setTpoTab] = useState('dashboard')
  const [showNotifications, setShowNotifications] = useState(false)

  const handleLogin = (role = 'student') => {
    if (role && typeof role === 'string') setView(role)
    setCurrentPage('dashboard')
  }

  const handleLogout = () => {
    setCurrentPage('login')
  }

  if (currentPage === 'login') {
    return <LoginPage onLogin={handleLogin} onSwitchToRegister={() => setCurrentPage('register')} />
  }

  if (currentPage === 'register') {
    return <RegisterPage onRegister={handleLogin} onSwitchToLogin={() => setCurrentPage('login')} />
  }

  if (currentPage === 'test-ai') {
    return (
      <div className="min-h-screen bg-background">
        <header className="p-4 border-b flex justify-between items-center bg-white">
          <h1 className="font-bold">AI Test Mode</h1>
          <button onClick={() => setCurrentPage('dashboard')} className="text-sm text-primary hover:underline">Back to Dashboard</button>
        </header>
        <TestAI />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans selection:bg-primary/20 overflow-x-hidden">
      {/* Top Floating Header */}
      <div className="px-4 md:px-6 py-4 sticky top-0 z-50">
        <header className="max-w-7xl mx-auto min-h-20 bg-white/70 backdrop-blur-2xl border border-white/50 shadow-2xl shadow-primary/5 rounded-[2rem] md:rounded-[2.5rem] flex flex-wrap items-center justify-between p-4 px-6 md:px-8 transition-all gap-4 ring-1 ring-white/50">
          <div className="flex items-center gap-4 md:gap-10 shrink-0">
            <div className="flex items-center gap-2 md:gap-3 group cursor-pointer" onClick={() => setCurrentPage('dashboard')}>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden shadow-lg shadow-primary/30 group-hover:rotate-12 transition-transform bg-white p-0.5">
                <img src={logo} alt="CampusCred Logo" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base md:text-lg tracking-tight bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">CampusCred</span>
                <span className="text-muted-foreground font-bold text-[8px] md:text-[9px] uppercase tracking-widest leading-none">
                  {view === 'student' ? 'Student Portal' : view === 'recruiter' ? 'Recruiter Dashboard' : 'Placement Office'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden xl:block group">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder={view === 'student' ? "Search certificates..." : view === 'recruiter' ? "Find candidates..." : "Search roll numbers..."}
                className="pl-10 pr-4 py-2.5 bg-muted/30 border-transparent border focus:border-primary/20 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 w-64 transition-all font-medium"
              />
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 md:p-2.5 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-xl md:rounded-2xl transition-all relative group"
                >
                  <Bell className="w-4 h-4 md:w-5 md:h-5 group-hover:shake" />
                  <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-destructive rounded-full border-2 border-white" />
                </button>

                {/* Notification Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 top-full mt-4 w-80 md:w-96 bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl shadow-primary/10 rounded-3xl p-4 animate-in fade-in slide-in-from-top-2 z-50 ring-1 ring-black/5">
                    <div className="flex items-center justify-between mb-4 px-2">
                      <h3 className="text-sm font-black uppercase tracking-widest text-foreground">Notifications</h3>
                      <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-1 rounded-full">3 New</span>
                    </div>

                    <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
                      {view === 'student' && (
                        <>
                          <div className="p-3 bg-white rounded-2xl border border-border/50 hover:border-primary/20 transition-colors cursor-pointer group">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                <Sparkles className="w-4 h-4 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">Google Hiring Alert! 🚀</p>
                                <p className="text-xs text-muted-foreground mt-1">SDE Intern roles are open. Apply now!</p>
                                <p className="text-[10px] font-black text-primary/60 uppercase tracking-wider mt-2">Just Now</p>
                              </div>
                            </div>
                          </div>
                          <div className="p-3 bg-white rounded-2xl border border-border/50 hover:border-primary/20 transition-colors cursor-pointer group">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-indigo-50 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                <Briefcase className="w-4 h-4 text-indigo-600" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-foreground group-hover:text-indigo-600 transition-colors">Microsoft Drive</p>
                                <p className="text-xs text-muted-foreground mt-1">Applications live for 2026 batch.</p>
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-wider mt-2">2h Ago</p>
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {view === 'recruiter' && (
                        <>
                          <div className="p-3 bg-white rounded-2xl border border-border/50 hover:border-blue-500/20 transition-colors cursor-pointer group">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                <UserCircle className="w-4 h-4 text-blue-600" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-foreground group-hover:text-blue-600 transition-colors">Shubh Sharma Applied</p>
                                <p className="text-xs text-muted-foreground mt-1">New application for SDE Intern role.</p>
                                <p className="text-[10px] font-black text-blue-600/60 uppercase tracking-wider mt-2">5m Ago</p>
                              </div>
                            </div>
                          </div>
                          <div className="p-3 bg-white rounded-2xl border border-border/50 hover:border-purple-500/20 transition-colors cursor-pointer group">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                <UserCircle className="w-4 h-4 text-purple-600" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-foreground group-hover:text-purple-600 transition-colors">Rahul Verma Applied</p>
                                <p className="text-xs text-muted-foreground mt-1">Frontend Dev role application.</p>
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-wider mt-2">1h Ago</p>
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {view === 'tpo' && (
                        <>
                          <div className="p-3 bg-white rounded-2xl border border-border/50 hover:border-emerald-500/20 transition-colors cursor-pointer group">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-emerald-50 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                <FileCheck className="w-4 h-4 text-emerald-600" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-foreground group-hover:text-emerald-600 transition-colors">Placement Confirmed! 🎉</p>
                                <p className="text-xs text-muted-foreground mt-1">Shubh Sharma placed at Google.</p>
                                <p className="text-[10px] font-black text-emerald-600/60 uppercase tracking-wider mt-2">Just Now</p>
                              </div>
                            </div>
                          </div>
                          <div className="p-3 bg-white rounded-2xl border border-border/50 hover:border-rose-500/20 transition-colors cursor-pointer group">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-rose-50 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                <ShieldCheck className="w-4 h-4 text-rose-600" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-foreground group-hover:text-rose-600 transition-colors">Verification Pending</p>
                                <p className="text-xs text-muted-foreground mt-1">Anjali Gupta's internship cert needs review.</p>
                                <p className="text-[10px] font-black text-rose-600/60 uppercase tracking-wider mt-2">30m Ago</p>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-border/50 text-center">
                      <button className="text-xs font-black uppercase tracking-widest text-primary hover:text-primary/80 transition-colors">
                        View All Activity
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {view === 'student' && (
                <button
                  onClick={() => setCurrentPage('test-ai')}
                  className="p-2 md:p-2.5 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-xl md:rounded-2xl transition-all relative group"
                  title="AI Test Mode"
                >
                  <Bot className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              )}

              <div className="h-6 md:h-8 w-[1px] bg-border/50" />

              <div className="flex items-center gap-2 md:gap-3">
                <div className="hidden sm:block text-right">
                  <p className="text-[10px] md:text-xs font-bold leading-none">Shubh S.</p>
                  <button
                    onClick={handleLogout}
                    className="text-[8px] md:text-[10px] text-primary font-black leading-none mt-1 hover:underline uppercase tracking-tighter flex items-center gap-0.5 justify-end"
                  >
                    <LogOut className="w-2 md:w-2.5 h-2 md:h-2.5" /> Logout
                  </button>
                </div>

                <button
                  onClick={() => setStudentTab('profile')}
                  className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg md:rounded-xl flex items-center justify-center text-white shadow-md shadow-primary/20 hover:scale-105 transition-transform font-bold text-xs md:text-sm"
                >
                  SS
                </button>

                <button
                  onClick={handleLogout}
                  className="sm:hidden p-2 text-primary hover:bg-primary/5 rounded-lg"
                  aria-label="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Student Sub-Navigation - Minimal & Focused */}
      {view === 'student' && (
        <div className="max-w-7xl mx-auto px-6 mb-8 mt-2">
          <nav className="flex items-center gap-1 bg-muted/30 p-1.5 rounded-3xl w-fit border border-border/40 backdrop-blur-sm">
            <button
              onClick={() => setStudentTab('dashboard')}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all",
                studentTab === 'dashboard' ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:bg-white/50 hover:text-foreground"
              )}
            >
              <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
            </button>
            <button
              onClick={() => setStudentTab('ledger')}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all",
                studentTab === 'ledger' ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:bg-white/50 hover:text-foreground"
              )}
            >
              <History className="w-3.5 h-3.5" /> Ledger
            </button>
            <button
              onClick={() => setStudentTab('projects')}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all",
                studentTab === 'projects' ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:bg-white/50 hover:text-foreground"
              )}
            >
              <Briefcase className="w-3.5 h-3.5" /> Projects
            </button>
            <button
              onClick={() => setStudentTab('signals')}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all",
                studentTab === 'signals' ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:bg-white/50 hover:text-foreground"
              )}
            >
              <BarChart3 className="w-3.5 h-3.5" /> Signals
            </button>
            <button
              onClick={() => setStudentTab('profile')}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all",
                studentTab === 'profile' ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:bg-white/50 hover:text-foreground"
              )}
            >
              <UserCircle className="w-3.5 h-3.5" /> Profile
            </button>
          </nav>
        </div>
      )}

      {/* Recruiter Sub-Navigation */}
      {view === 'recruiter' && (
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-8 mt-2 overflow-x-auto no-scrollbar">
          <nav className="flex items-center gap-1 bg-muted/30 p-1.5 rounded-3xl w-fit border border-border/40 backdrop-blur-sm whitespace-nowrap">
            <button
              onClick={() => setRecruiterTab('dashboard')}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all",
                recruiterTab === 'dashboard' ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:bg-white/50 hover:text-foreground"
              )}
            >
              <Users className="w-3.5 h-3.5" /> Dashboard
            </button>
            <button
              onClick={() => setRecruiterTab('evidence')}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all",
                recruiterTab === 'evidence' ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:bg-white/50 hover:text-foreground"
              )}
            >
              <FileCheck className="w-3.5 h-3.5" /> Evidence
            </button>
            <button
              onClick={() => setRecruiterTab('shortlist')}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all",
                recruiterTab === 'shortlist' ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:bg-white/50 hover:text-foreground"
              )}
            >
              <CheckSquare className="w-3.5 h-3.5" /> Shortlist
            </button>
            <button
              onClick={() => setRecruiterTab('posts')}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all",
                recruiterTab === 'posts' ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:bg-white/50 hover:text-foreground"
              )}
            >
              <Megaphone className="w-3.5 h-3.5" /> Posts
            </button>
          </nav>
        </div>
      )}

      {/* TPO Sub-Navigation */}
      {view === 'admin' && (
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-8 mt-2 overflow-x-auto no-scrollbar">
          <nav className="flex items-center gap-1 bg-muted/30 p-1.5 rounded-3xl w-fit border border-border/40 backdrop-blur-sm whitespace-nowrap">
            <button
              onClick={() => setTpoTab('dashboard')}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all",
                tpoTab === 'dashboard' ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:bg-white/50 hover:text-foreground"
              )}
            >
              <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
            </button>
            <button
              onClick={() => setTpoTab('verification')}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all",
                tpoTab === 'verification' ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:bg-white/50 hover:text-foreground"
              )}
            >
              <FileCheck className="w-3.5 h-3.5" /> Verification
            </button>
            <button
              onClick={() => setTpoTab('tracking')}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all",
                tpoTab === 'tracking' ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:bg-white/50 hover:text-foreground"
              )}
            >
              <Briefcase className="w-3.5 h-3.5" /> Tracking
            </button>
            <button
              onClick={() => setTpoTab('reports')}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all",
                tpoTab === 'reports' ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:bg-white/50 hover:text-foreground"
              )}
            >
              <BarChart3 className="w-3.5 h-3.5" /> Reports
            </button>
            <button
              onClick={() => setTpoTab('google')}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all",
                tpoTab === 'google' ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:bg-white/50 hover:text-foreground"
              )}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" /> Google
            </button>
            <button
              onClick={() => setTpoTab('recruiters')}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all",
                tpoTab === 'recruiters' ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:bg-white/50 hover:text-foreground"
              )}
            >
              <Users className="w-3.5 h-3.5" /> Recruiters
            </button>
            <button
              onClick={() => setTpoTab('analytics')}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all",
                tpoTab === 'analytics' ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:bg-white/50 hover:text-foreground"
              )}
            >
              <Link2 className="w-3.5 h-3.5" /> Analytics
            </button>
          </nav>
        </div>
      )}

      {/* Main Viewport */}
      <main className="flex-1 pb-20">
        <div className="max-w-7xl mx-auto">
          {view === 'student' && (
            <div className="animate-in fade-in duration-500">
              {studentTab === 'dashboard' && <StudentDashboard />}
              {studentTab === 'ledger' && <ExperienceLedger />}
              {studentTab === 'projects' && <MicroProjects />}
              {studentTab === 'signals' && <SkillsSignals />}
              {studentTab === 'profile' && <ProfileProofs />}
            </div>
          )}
          {view === 'recruiter' && (
            <div className="animate-in fade-in duration-500">
              {recruiterTab === 'dashboard' && <RecruiterDashboard onSelectCandidate={(c) => { setSelectedCandidate(c); setRecruiterTab('evidence'); }} />}
              {recruiterTab === 'evidence' && <CandidateEvidenceView candidate={selectedCandidate} />}
              {recruiterTab === 'shortlist' && <DecisionPanel />}
              {recruiterTab === 'posts' && <RecruiterPosts />}
            </div>
          )}
          {view === 'admin' && (
            <div className="animate-in fade-in duration-500">
              {tpoTab === 'dashboard' && <TpoDashboard />}
              {tpoTab === 'verification' && <VerificationConsole />}
              {tpoTab === 'tracking' && <PlacementTracking />}
              {tpoTab === 'reports' && <TpoReports />}
              {tpoTab === 'google' && <GoogleIntegration />}
              {tpoTab === 'recruiters' && <AdminRecruiters />}
              {tpoTab === 'analytics' && <InternshipPlacementAnalytics />}
            </div>
          )}
        </div>
      </main>

      {/* Floating Modern Footer */}
      <footer className="py-8 px-10 border-t border-white/20 bg-white/30 backdrop-blur-md flex flex-col md:flex-row justify-between items-center gap-6 mt-auto shadow-lg shadow-black/5">
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground font-bold uppercase tracking-wider">
          <div className="w-2 h-2 rounded-full bg-success shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
          Systems Active | Stable Connection
        </div>
        <div className="flex gap-8 text-[11px] text-muted-foreground font-extrabold uppercase tracking-widest">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms of Use</a>
          <a href="#" className="hover:text-primary transition-colors">Help Center</a>
        </div>
        <p className="text-[10px] text-muted-foreground/50 font-bold">
          &copy; 2025 CAMPUSCRED | SECURE ACCESS
        </p>
      </footer>
    </div>
  )
}

export default App
