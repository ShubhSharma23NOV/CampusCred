import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Badge, Progress, Separator } from "@/components/DesignSystem";
import { ShieldCheck, Clock, ExternalLink, Activity, BarChart3, AlertCircle, Sparkles } from "lucide-react";

export default function CandidateEvidenceView({ candidate }) {
    // Default to a sample candidate if none selected (for demo robustness)
    const data = candidate || { id: "ACRO_0991", name: "Guest User", role: "Viewer" };

    const evidence = [
        { id: 1, type: "Internship", name: "Full-Stack Dev", entity: "TechFlow Systems", date: "Dec 2025", skills: ["React", "Express"], proof: "#" },
        { id: 2, type: "Micro-Project", name: "Auth Flow Optimization", entity: "CampusCred Internal", date: "Oct 2025", skills: ["JWT", "Node.js"], proof: "#" },
        { id: 3, type: "Competition", name: "HackSVVV Runner Up", entity: "SVVV Indore", date: "Aug 2025", skills: ["Product Pitch", "Go"], proof: "#" },
    ];

    return (
        <div className="p-8 space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white border border-border/50 p-8 rounded-[2.5rem] shadow-sm">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-primary/10 rounded-[1.5rem] flex items-center justify-center font-black text-2xl text-primary">
                        {(data?.name || "G U").split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <h1 className="text-3xl font-black tracking-tight">{data.name}</h1>
                            <Badge variant="success">Verified Candidate</Badge>
                        </div>
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{data.id} • {data.role}</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="px-8 py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all text-sm uppercase tracking-widest">
                        SHORTLIST CANDIDATE
                    </button>
                    <button className="px-8 py-4 bg-muted text-foreground font-black rounded-2xl hover:bg-muted/80 transition-all text-sm uppercase tracking-widest">
                        REJECT
                    </button>
                </div>
            </header>

            {/* Recruiter Snapshot (AI Preview) */}
            <Card className="bg-primary/5 border-primary/20 shadow-none rounded-[2rem]">
                <CardContent className="p-8 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Sparkles className="w-6 h-6 text-primary" />
                            <h3 className="text-sm font-black uppercase tracking-widest">Recruiter Snapshot (AI Preview)</h3>
                        </div>
                        <Badge className="bg-white text-primary border-primary/20">FUTURE-READY</Badge>
                    </div>
                    <p className="text-md font-bold leading-relaxed text-slate-800">
                        “Candidate demonstrates repeated backend contributions over an extended period, with verified task completion and exposure to real-world system workflows.”
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest pt-2">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Generated from verified data. Live AI integration planned.
                    </div>
                </CardContent>
            </Card>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* Reliability & Signals */}
                <div className="lg:col-span-4 space-y-8">
                    <Card className="border-border/50">
                        <CardHeader>
                            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                <Activity className="w-4 h-4 text-primary" /> Reliability Score
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between items-end">
                                    <p className="text-3xl font-black leading-none">98.4%</p>
                                    <p className="text-[10px] font-black uppercase text-emerald-500">Top 5% Cohort</p>
                                </div>
                                <Progress value={98.4} className="h-2" />
                            </div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase leading-relaxed tracking-wider">
                                Derived from 24 verified transactions across 3 semesters. No manual overrides detected.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-border/50">
                        <CardHeader>
                            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                <BarChart3 className="w-4 h-4 text-indigo-500" /> Skills Consistency
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[
                                { name: "React / Frontend", strength: 92, count: 14 },
                                { name: "Backend / Node", strength: 78, count: 8 },
                                { name: "System Design", strength: 65, count: 4 },
                            ].map(skill => (
                                <div key={skill.name} className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                        <span>{skill.name}</span>
                                        <span className="text-primary">{skill.count} Verifications</span>
                                    </div>
                                    <Progress value={skill.strength} className="h-1" />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Evidence Timeline */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="flex items-center gap-3 px-2">
                        <ShieldCheck className="w-6 h-6 text-primary" />
                        <h2 className="text-xl font-black tracking-tight">Verified Evidence Timeline</h2>
                    </div>

                    <div className="relative space-y-6 pl-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-border/50">
                        {evidence.map((item) => (
                            <div key={item.id} className="relative pl-6">
                                <div className="absolute -left-[18.5px] top-1.5 w-3 h-3 rounded-full bg-primary border-4 border-white shadow-sm" />
                                <Card className="hover:border-primary/20 transition-all border-border/50">
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <div className="space-y-0.5">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{item.type}</span>
                                                <Badge variant="success">Verified</Badge>
                                            </div>
                                            <CardTitle className="text-md font-bold text-foreground">{item.name}</CardTitle>
                                            <p className="text-xs font-black text-primary uppercase tracking-tight">{item.entity}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{item.date}</p>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center justify-between">
                                            <div className="flex gap-2">
                                                {item.skills.map(s => <Badge key={s} variant="secondary" className="text-[8px]">{s}</Badge>)}
                                            </div>
                                            <a href={item.proof} className="flex items-center gap-1.5 text-[10px] font-black text-primary uppercase hover:underline">
                                                View Source <ExternalLink className="w-3 h-3" />
                                            </a>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
