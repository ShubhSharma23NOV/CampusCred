import React, { useState, useEffect } from 'react';
import { checkJobEligibility, generateApplicationForm } from '../services/geminiAI';
import { Loader2, Sparkles, Building2, GraduationCap, FileText, Briefcase, ArrowRight } from 'lucide-react';

const RecruitmentAssistant = ({ isOpen, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [view, setView] = useState('jobList'); // 'jobList' | 'form' | 'success'
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [applicationForm, setApplicationForm] = useState(null);
    const [error, setError] = useState(null);

    // Mock student data - in real app, this comes from context
    const sampleStudent = {
        name: "Shubh Sharma",
        branch: "Computer Science",
        cgpa: 8.5,
        skills: ["React", "Node.js", "Python", "MongoDB"]
    };

    // Mock available jobs - in real app, this comes from backend
    const availableJobs = [
        {
            companyName: "TechInnovate Solutions",
            jobRole: "Junior Full Stack Developer",
            requirements: {
                skills: ["React", "Node.js", "MongoDB"],
                minCGPA: 7.5,
                branches: ["CSE", "IT"]
            }
        },
        {
            companyName: "DataSystems Inc",
            jobRole: "Data Analyst Intern",
            requirements: {
                skills: ["Python", "SQL", "Excel"],
                minCGPA: 8.0,
                branches: ["CSE", "IT", "ECE"]
            }
        },
        {
            companyName: "Creative Studio",
            jobRole: "UI/UX Designer",
            requirements: {
                skills: ["Figma", "Adobe XD", "CSS"],
                minCGPA: 7.0,
                branches: ["Any"]
            }
        },
        {
            companyName: "CloudCorp",
            jobRole: "Cloud Engineer Intern",
            requirements: {
                skills: ["AWS", "Python", "Linux"],
                minCGPA: 7.5,
                branches: ["CSE", "IT"]
            }
        },
        {
            companyName: "WebWizards",
            jobRole: "Frontend Developer",
            requirements: {
                skills: ["React", "CSS", "JavaScript"],
                minCGPA: 7.0,
                branches: ["CSE", "IT"]
            }
        },
        {
            companyName: "AI Frontiers",
            jobRole: "AI/ML Intern",
            requirements: {
                skills: ["Python", "TensorFlow", "PyTorch"],
                minCGPA: 8.5,
                branches: ["CSE"]
            }
        },
        {
            companyName: "FinTech Global",
            jobRole: "Java Developer",
            requirements: {
                skills: ["Java", "Spring Boot", "SQL"],
                minCGPA: 8.0,
                branches: ["CSE", "IT"]
            }
        },
        {
            companyName: "CyberGuard",
            jobRole: "Security Analyst",
            requirements: {
                skills: ["Network Security", "Linux", "Python"],
                minCGPA: 7.5,
                branches: ["CSE", "IT"]
            }
        }
    ];

    // Load jobs and check eligibility on mount
    useEffect(() => {
        if (isOpen) {
            checkEligibility();
        }
    }, [isOpen]);

    const checkEligibility = async () => {
        setLoading(true);
        try {
            const result = await checkJobEligibility(sampleStudent, availableJobs);
            setJobs(result.jobs);
        } catch (err) {
            setError("Failed to load jobs. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleApplyClick = async (job) => {
        setLoading(true);
        setSelectedJob(job);
        try {
            const form = await generateApplicationForm(job.companyName, job.jobRole);
            setApplicationForm(form);
            setView('form');
        } catch (err) {
            setError("Failed to generate application form.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitApplication = () => {
        // Simulate submission
        const newApplication = {
            id: `APP_${Math.floor(Math.random() * 10000)}`,
            candidateName: sampleStudent.name,
            role: selectedJob.jobRole,
            company: selectedJob.companyName,
            status: "Applied",
            matchScore: { totalScore: 85, matchLevel: "High Match" }, // Mock score
            submittedAt: new Date().toISOString(),
            verified: 12,
            reliability: "98%",
            isNew: true
        };

        const existingApps = JSON.parse(localStorage.getItem('campus_cred_applications') || '[]');
        localStorage.setItem('campus_cred_applications', JSON.stringify([newApplication, ...existingApps]));

        setView('success');
        setTimeout(() => {
            onClose();
            setView('jobList');
            setApplicationForm(null);
            setSelectedJob(null);
        }, 2000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="p-6 border-b border-border/50 flex justify-between items-center bg-gradient-to-r from-primary/5 to-transparent">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black tracking-tight text-gray-900">
                                {view === 'jobList' ? 'AI Opportunity Matcher' : 'Application Assistant'}
                            </h2>
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Powered by Gemini</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-full py-12 text-center space-y-4">
                            <Loader2 className="w-10 h-10 text-primary animate-spin" />
                            <p className="text-gray-500 font-medium">
                                {view === 'jobList' ? 'Analyzing your profile against open roles...' : 'Generating custom application form...'}
                            </p>
                        </div>
                    ) : view === 'success' ? (
                        <div className="flex flex-col items-center justify-center h-full py-12 text-center space-y-6 animate-in fade-in zoom-in">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div className="max-w-md space-y-2">
                                <h3 className="text-2xl font-black text-gray-900">Application Submitted!</h3>
                                <p className="text-gray-500">
                                    Your application for <strong>{selectedJob?.jobRole}</strong> has been sent to the recruiter. Good luck!
                                </p>
                            </div>
                        </div>
                    ) : view === 'form' && applicationForm ? (
                        <div className="space-y-6 animate-in slide-in-from-right duration-300">
                            <button
                                onClick={() => setView('jobList')}
                                className="text-sm font-bold text-gray-500 hover:text-gray-900 flex items-center gap-2"
                            >
                                ← Back to Opportunities
                            </button>

                            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                                <div className="mb-8">
                                    <h3 className="text-2xl font-black text-gray-900 mb-2">{applicationForm.formTitle || `Apply for ${selectedJob.jobRole}`}</h3>
                                    <p className="text-gray-500">Please complete the form below. Fields marked with * are required.</p>
                                </div>

                                <div className="space-y-6">
                                    {applicationForm.fields.map((field, i) => (
                                        <div key={i}>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                                {field.label} {field.required && <span className="text-red-500">*</span>}
                                            </label>
                                            {field.type === 'textarea' ? (
                                                <textarea
                                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none min-h-[120px] transition-all font-medium"
                                                    placeholder={`Enter your ${field.label.toLowerCase()}...`}
                                                />
                                            ) : (
                                                <input
                                                    type={field.type}
                                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                                                    placeholder={`Enter your ${field.label.toLowerCase()}...`}
                                                />
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        onClick={handleSubmitApplication}
                                        className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all mt-4 shadow-lg hover:shadow-xl active:scale-[0.99]"
                                    >
                                        Submit Application
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6 animate-in fade-in">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold text-gray-900">Recommended Opportunities</h3>
                                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
                                    {jobs.length} Matches Found
                                </span>
                            </div>

                            <div className="grid gap-4">
                                {jobs.map((job, idx) => (
                                    <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-primary/30 hover:shadow-lg transition-all group">
                                        <div className="flex flex-col md:flex-row justify-between gap-6">
                                            <div className="space-y-3 flex-1">
                                                <div>
                                                    <h4 className="text-xl font-black text-gray-900 group-hover:text-primary transition-colors">
                                                        {job.jobRole}
                                                    </h4>
                                                    <p className="text-sm font-bold text-gray-500 flex items-center gap-2">
                                                        <Building2 className="w-4 h-4" /> {job.companyName}
                                                    </p>
                                                </div>

                                                <div className="flex flex-wrap gap-2">
                                                    {job.requirements?.skills?.map((skill, i) => (
                                                        <span key={i} className="px-2 py-1 bg-gray-50 border border-gray-100 rounded text-xs font-bold text-gray-600">
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>

                                                <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
                                                    <span className="flex items-center gap-1">
                                                        <GraduationCap className="w-3 h-3" /> Min CGPA: {job.requirements?.minCGPA}
                                                    </span>
                                                    <span>•</span>
                                                    <span>{job.requirements?.branches?.join(', ')}</span>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-end justify-between gap-4 min-w-[140px]">
                                                <div className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 ${job.eligibilityStatus === 'Eligible'
                                                    ? 'bg-green-50 text-green-700'
                                                    : 'bg-red-50 text-red-700'
                                                    }`}>
                                                    {job.eligibilityStatus === 'Eligible' ? (
                                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                                    ) : (
                                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                                                    )}
                                                    {job.eligibilityStatus}
                                                </div>

                                                {job.eligibilityStatus === 'Eligible' && (
                                                    <button
                                                        onClick={() => handleApplyClick(job)}
                                                        className="w-full py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                                                    >
                                                        Apply Now <ArrowRight className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        {job.reason && (
                                            <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
                                                <span className="font-bold">AI Insight:</span> {job.reason}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RecruitmentAssistant;
