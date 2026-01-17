import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Badge, Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/DesignSystem";
import { Search, Filter, ShieldCheck, ChevronRight, Users, Brain, Sparkles, Target } from "lucide-react";
import EligibilityFilter from "@/components/EligibilityFilter";
import { filterByEligibility } from "@/services/aiMatching";

const mockCandidates = [
    { 
        id: "SVVV_0991", 
        name: "Shubh Sharma", 
        role: "Fullstack Eng", 
        verified: 12, 
        reliability: "98%", 
        status: "Active",
        cgpa: 8.5,
        branch: "Computer Science",
        skills: ["React", "Node.js", "Python", "MongoDB"],
        internships: [
            { company: "TechCorp", role: "Frontend Intern", type: "internship" },
            { company: "StartupXYZ", role: "Full Stack Intern", type: "internship" }
        ],
        credibilityScore: 98,
        placementStatus: "placed"
    },
    { 
        id: "ACRP_1022", 
        name: "Ananya R.", 
        role: "Backend Dev", 
        verified: 8, 
        reliability: "95%", 
        status: "Pending",
        cgpa: 8.2,
        branch: "Information Technology",
        skills: ["Java", "Spring Boot", "PostgreSQL", "Redis"],
        internships: [
            { company: "DataSystems", role: "Backend Intern", type: "internship" }
        ],
        credibilityScore: 95,
        placementStatus: "active"
    },
    { 
        id: "ACRP_3341", 
        name: "Rohan M.", 
        role: "UI Designer", 
        verified: 15, 
        reliability: "99%", 
        status: "Active",
        cgpa: 7.8,
        branch: "Computer Science",
        skills: ["Figma", "Adobe XD", "React", "CSS", "UI/UX"],
        internships: [
            { company: "DesignStudio", role: "UI/UX Intern", type: "internship" },
            { company: "CreativeAgency", role: "Design Intern", type: "internship" }
        ],
        credibilityScore: 99,
        placementStatus: "placed"
    },
    { 
        id: "TECH_4521", 
        name: "Priya K.", 
        role: "Data Scientist", 
        verified: 10, 
        reliability: "96%", 
        status: "Active",
        cgpa: 9.1,
        branch: "Computer Science",
        skills: ["Python", "Machine Learning", "TensorFlow", "SQL"],
        internships: [
            { company: "AI Labs", role: "ML Intern", type: "internship" }
        ],
        credibilityScore: 96,
        placementStatus: "placed"
    },
    { 
        id: "CODE_7832", 
        name: "Arjun S.", 
        role: "DevOps Engineer", 
        verified: 7, 
        reliability: "92%", 
        status: "Active",
        cgpa: 7.5,
        branch: "Information Technology",
        skills: ["Docker", "Kubernetes", "AWS", "Jenkins"],
        internships: [],
        credibilityScore: 92,
        placementStatus: "active"
    }
];

export default function RecruiterDashboard({ onSelectCandidate }) {
    const [showFilter, setShowFilter] = useState(false);
    const [candidates, setCandidates] = useState(mockCandidates);
    const [filteredCandidates, setFilteredCandidates] = useState(mockCandidates);
    const [aiEnabled, setAiEnabled] = useState(false);

    const handleFilterChange = (criteria) => {
        if (Object.values(criteria).some(v => v && (Array.isArray(v) ? v.length > 0 : true))) {
            const filtered = filterByEligibility(candidates, criteria);
            setFilteredCandidates(filtered);
            setAiEnabled(true);
        } else {
            setFilteredCandidates(candidates);
            setAiEnabled(false);
        }
    };
    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-500">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black tracking-tight">Recruiter Console</h1>
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                        {aiEnabled ? "AI-Matched Candidates" : "Candidate Verification Hub"}
                    </p>
                </div>
                <div className="flex gap-4">
                    {aiEnabled && (
                        <Card className="px-6 py-2 bg-purple-50 border-purple-200">
                            <div className="flex items-center gap-3">
                                <Brain className="w-5 h-5 text-purple-600" />
                                <div className="text-right">
                                    <p className="text-xs font-black uppercase tracking-tight leading-none text-purple-600">AI Matched</p>
                                    <p className="text-xl font-black text-purple-600 leading-none mt-1">{filteredCandidates.length}</p>
                                </div>
                            </div>
                        </Card>
                    )}
                    <Card className="px-6 py-2 bg-primary/5 border-primary/20">
                        <div className="flex items-center gap-3">
                            <Users className="w-5 h-5 text-primary" />
                            <div className="text-right">
                                <p className="text-xs font-black uppercase tracking-tight leading-none">Verified Pool</p>
                                <p className="text-xl font-black text-primary leading-none mt-1">{candidates.length}</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </header>

            {/* AI Filter Banner */}
            {aiEnabled && (
                <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-600 rounded-lg">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-purple-900">AI Matching Active</h3>
                                    <p className="text-xs text-purple-600">Candidates ranked by match score • Powered by Gemini AI</p>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    setFilteredCandidates(candidates);
                                    setAiEnabled(false);
                                }}
                                className="px-4 py-2 bg-white border border-purple-200 text-purple-700 font-bold rounded-xl hover:bg-purple-50 transition-all text-xs"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </CardContent>
                </Card>
            )}

            <div className="grid gap-6">
                <div className="flex gap-4 items-center bg-muted/30 p-4 rounded-3xl border border-border/50">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            placeholder="Filter by skill, cohort, or verification status..."
                            className="w-full pl-10 pr-4 py-3 bg-white/50 border-none focus:ring-2 focus:ring-primary/20 rounded-2xl text-sm font-medium outline-none transition-all"
                        />
                    </div>
                    <button 
                        onClick={() => setShowFilter(!showFilter)}
                        className="px-6 py-3 bg-white border border-border hover:bg-muted/50 rounded-2xl transition-all flex items-center gap-2 text-xs font-black uppercase tracking-widest"
                    >
                        <Filter className="w-4 h-4" /> {showFilter ? 'Hide' : 'AI'} Filters
                    </button>
                </div>

                {/* Eligibility Filter Panel */}
                {showFilter && (
                    <div className="animate-in fade-in slide-in-from-top duration-300">
                        <EligibilityFilter 
                            onFilterChange={handleFilterChange}
                            onClose={() => setShowFilter(false)}
                        />
                    </div>
                )}

                <Card className="overflow-hidden border-border/50">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/30 hover:bg-muted/30">
                                <TableHead>CANDIDATE</TableHead>
                                <TableHead>PRIMARY ROLE</TableHead>
                                {aiEnabled && <TableHead>AI MATCH</TableHead>}
                                <TableHead>VERIFIED ITEMS</TableHead>
                                <TableHead>RELIABILITY</TableHead>
                                <TableHead className="text-right">SCAN EVIDENCE</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredCandidates.map((c) => (
                                <TableRow key={c.id} className="cursor-pointer group hover:bg-primary/5 transition-colors" onClick={() => onSelectCandidate(c)}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center font-black text-xs text-muted-foreground group-hover:bg-primary group-hover:text-white transition-all">
                                                {c.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm">{c.name}</p>
                                                <p className="text-[10px] font-mono text-muted-foreground">{c.id}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="text-[9px]">{c.role}</Badge>
                                    </TableCell>
                                    {aiEnabled && c.matchScore && (
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                                                    c.matchScore.totalScore >= 85 ? 'bg-emerald-100 text-emerald-700' :
                                                    c.matchScore.totalScore >= 70 ? 'bg-blue-100 text-blue-700' :
                                                    c.matchScore.totalScore >= 55 ? 'bg-amber-100 text-amber-700' :
                                                    'bg-gray-100 text-gray-700'
                                                }`}>
                                                    <div>
                                                        <div className="text-lg font-black leading-none">{c.matchScore.totalScore}</div>
                                                        <div className="text-[8px] font-bold uppercase">Match</div>
                                                    </div>
                                                </div>
                                                <div className="text-xs">
                                                    <p className="font-bold text-gray-700">{c.matchScore.matchLevel}</p>
                                                    <div className="flex items-center gap-1 text-purple-600">
                                                        <Target className="w-3 h-3" />
                                                        <span className="text-[10px] font-medium">AI Ranked</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                    )}
                                    <TableCell>
                                        <div className="flex items-center gap-1.5 font-black text-xs">
                                            <ShieldCheck className="w-4 h-4 text-emerald-500" /> {c.verified} Proofs
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className="font-black text-sm text-primary">{c.reliability}</span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <ChevronRight className="w-5 h-5 ml-auto text-muted-foreground group-hover:translate-x-1 transition-transform" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </div>
    );
}
