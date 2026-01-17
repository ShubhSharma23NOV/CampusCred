import React, { useState } from 'react';
import { getAIPlacementEvaluation } from '../services/aiMatching';
import { Loader2 } from 'lucide-react';

const TestAI = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const sampleCandidate = {
        name: "Rahul Sharma",
        skills: ["React", "Node.js", "MongoDB", "JavaScript"],
        internships: [
            { role: "Frontend Developer", company: "TechCorp" },
            { role: "Web Intern", company: "StartupInc" }
        ],
        isVerified: true,
        credibilityScore: 95,
        cgpa: 8.5
    };

    const sampleJob = {
        requiredSkills: ["React", "TypeScript", "Node.js"],
        domain: "Full Stack Development"
    };

    const handleTest = async () => {
        setLoading(true);
        setError(null);
        setResult(null);
        try {
            const data = await getAIPlacementEvaluation(sampleCandidate, sampleJob);
            setResult(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-primary">AI Placement Evaluation</h1>
                    <p className="text-muted-foreground font-medium">Test the Gemini-powered readiness engine with sample data</p>
                </div>
                <div className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
                    Test Mode Active
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Candidate Profile Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-border/60 overflow-hidden">
                    <div className="bg-muted/30 px-6 py-4 border-b border-border/50 flex justify-between items-center">
                        <h3 className="font-bold text-lg flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                            Candidate Profile
                        </h3>
                        {sampleCandidate.isVerified && (
                            <span className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wider">
                                Verified
                            </span>
                        )}
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">Student Name</div>
                                <div className="text-xl font-bold text-foreground">{sampleCandidate.name}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">CGPA</div>
                                <div className="text-xl font-black text-primary">{sampleCandidate.cgpa}</div>
                            </div>
                        </div>

                        <div>
                            <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-2">Skills</div>
                            <div className="flex flex-wrap gap-2">
                                {sampleCandidate.skills.map((skill, i) => (
                                    <span key={i} className="px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-lg text-xs font-bold">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-2">Internships</div>
                            <div className="space-y-2">
                                {sampleCandidate.internships.map((intern, i) => (
                                    <div key={i} className="flex items-center gap-3 p-2.5 bg-muted/20 rounded-lg border border-border/40">
                                        <div className="w-8 h-8 rounded-md bg-white border border-border/50 flex items-center justify-center text-xs font-bold text-muted-foreground">
                                            {intern.company[0]}
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-foreground">{intern.role}</div>
                                            <div className="text-xs font-medium text-muted-foreground">{intern.company}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4 border-t border-dashed">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-muted-foreground font-medium">Credibility Score</span>
                                <span className="font-black text-foreground">{sampleCandidate.credibilityScore}/100</span>
                            </div>
                            <div className="w-full bg-muted/50 h-1.5 rounded-full mt-2 overflow-hidden">
                                <div className="bg-green-500 h-full rounded-full" style={{ width: `${sampleCandidate.credibilityScore}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Job Requirements Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-border/60 overflow-hidden flex flex-col">
                    <div className="bg-muted/30 px-6 py-4 border-b border-border/50">
                        <h3 className="font-bold text-lg flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                            Job Requirements
                        </h3>
                    </div>
                    <div className="p-6 space-y-6 flex-1">
                        <div>
                            <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">Target Domain</div>
                            <div className="text-lg font-bold text-foreground">{sampleJob.domain}</div>
                        </div>

                        <div>
                            <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-2">Required Skills</div>
                            <div className="flex flex-wrap gap-2">
                                {sampleJob.requiredSkills.map((skill, i) => (
                                    <span key={i} className="px-2.5 py-1 bg-pink-50 text-pink-700 border border-pink-100 rounded-lg text-xs font-bold">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="p-4 bg-yellow-50/50 border border-yellow-100 rounded-xl mt-auto">
                            <div className="flex gap-2">
                                <div className="mt-0.5 text-yellow-600">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                                </div>
                                <p className="text-xs font-medium text-yellow-800 leading-relaxed">
                                    The AI will analyze the gap between the candidate's profile and these requirements to generate the readiness score.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button
                onClick={handleTest}
                disabled={loading}
                className="px-6 py-3 bg-primary text-white rounded-lg font-bold flex items-center gap-2 hover:opacity-90 disabled:opacity-50 shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
                {loading && <Loader2 className="animate-spin" />}
                {loading ? 'Analyzing Profile...' : 'Run AI Evaluation'}
            </button>

            {error && (
                <div className="mt-8 p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
                    Error: {error}
                </div>
            )}

            {result && (
                <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4">
                    <div className="p-6 bg-white rounded-xl shadow-lg border border-border/50">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-xl font-bold">Evaluation Result</h2>
                                <p className="text-muted-foreground text-sm">Generated by Gemini AI</p>
                                <p className="text-sm font-medium mt-1 text-foreground/80">{result.summary}</p>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-black text-primary">{result.readinessScore}/100</div>
                                <div className={`text-sm font-bold px-3 py-1 rounded-full inline-block mt-1 ${result.readinessLabel === 'Ready' ? 'bg-green-100 text-green-700' :
                                        result.readinessLabel === 'Moderate' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-red-100 text-red-700'
                                    }`}>
                                    {result.readinessLabel}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div className="p-3 bg-muted/30 rounded-lg text-center">
                                <div className="text-xs text-muted-foreground font-bold uppercase">Skills</div>
                                <div className="text-lg font-black">{result.breakdown?.skills}%</div>
                            </div>
                            <div className="p-3 bg-muted/30 rounded-lg text-center">
                                <div className="text-xs text-muted-foreground font-bold uppercase">Internship</div>
                                <div className="text-lg font-black">{result.breakdown?.internship}/100</div>
                            </div>
                            <div className="p-3 bg-muted/30 rounded-lg text-center">
                                <div className="text-xs text-muted-foreground font-bold uppercase">Verification</div>
                                <div className="text-lg font-black">{result.breakdown?.verification}/100</div>
                            </div>
                            <div className="p-3 bg-muted/30 rounded-lg text-center">
                                <div className="text-xs text-muted-foreground font-bold uppercase">Academic</div>
                                <div className="text-lg font-black">{result.breakdown?.academic}/100</div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Key Reasons</h3>
                                <ul className="space-y-2">
                                    {result.keyReasons?.map((reason, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                            {reason}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="space-y-3">
                                <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Improvement Tips</h3>
                                <ul className="space-y-2">
                                    {result.improvementTips?.map((tip, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                                            {tip}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {result.raw && (
                            <div className="mt-6 pt-6 border-t">
                                <details>
                                    <summary className="cursor-pointer text-xs font-bold text-muted-foreground hover:text-primary">View Raw Response</summary>
                                    <pre className="mt-2 p-4 bg-muted/50 rounded-lg text-xs overflow-auto whitespace-pre-wrap max-h-60">
                                        {JSON.stringify(result, null, 2)}
                                    </pre>
                                </details>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TestAI;
