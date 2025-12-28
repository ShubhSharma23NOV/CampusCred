import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/DesignSystem";
import { CheckCircle2, Clock, ExternalLink, ShieldCheck, Sparkles } from "lucide-react";

const ledgerData = [
    { id: 1, type: "Internship", name: "Front-End Developer", entity: "TechFlow Systems", date: "Dec 2025 - Present", skills: ["React", "TypeScript"], status: "Verified", proof: "https://drive.google.com/..." },
    { id: 2, type: "Micro-Project", name: "API Rate Limiter", entity: "Open Source Contribution", date: "Oct 2025", skills: ["Go", "Redis"], status: "Verified", proof: "https://drive.google.com/..." },
    { id: 3, type: "Certification", name: "AWS Cloud Practitioner", entity: "Amazon Web Services", date: "Aug 2025", skills: ["Cloud", "Security"], status: "Pending", proof: "https://drive.google.com/..." },
    { id: 4, type: "Community", name: "Tech Lead", entity: "Campus Coding Club", date: "Jan 2025 - Jun 2025", skills: ["Leadership", "Mentoring"], status: "Verified", proof: "https://drive.google.com/..." },
];

export default function ExperienceLedger() {
    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-500">
            <header className="space-y-2">
                <h1 className="text-3xl font-black tracking-tight">Experience Ledger</h1>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Verifiable History</p>
            </header>

            {/* AI Insights (Preview) */}
            <Card className="bg-primary/5 border-primary/10 shadow-none rounded-[2rem] overflow-hidden">
                <CardContent className="p-6 space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-primary" />
                            <span className="text-xs font-black uppercase tracking-widest">AI Insights</span>
                        </div>
                        <Badge variant="outline" className="text-[10px] bg-white">PREVIEW</Badge>
                    </div>
                    <p className="text-sm font-medium leading-relaxed">
                        “Based on verified records, the student has consistently applied backend development skills across multiple academic and operational tasks, with increasing responsibility over time.”
                    </p>
                    <div className="flex items-center gap-2 pt-2 text-[10px] font-bold text-muted-foreground uppercase tracking-tight">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Generated from verified data. Live AI integration planned.
                    </div>
                </CardContent>
            </Card>

            <div className="relative space-y-10 pl-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-border">
                {ledgerData.map((item) => (
                    <div key={item.id} className="relative">
                        <div className={`absolute -left-[25px] top-1.5 w-4 h-4 rounded-full border-4 border-background ${item.status === 'Verified' ? 'bg-primary' : 'bg-muted'}`} />
                        <Card className="hover:border-primary/20 transition-all">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">{item.type}</span>
                                        <Badge variant={item.status === 'Verified' ? 'success' : 'warning'}>{item.status}</Badge>
                                    </div>
                                    <CardTitle className="text-lg font-black">{item.name}</CardTitle>
                                    <p className="text-sm font-bold text-primary">{item.entity}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{item.date}</p>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    {item.skills.map((skill) => (
                                        <Badge key={skill} variant="secondary" className="text-[9px]">{skill}</Badge>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                        {item.status === 'Verified' && <ShieldCheck className="w-3.5 h-3.5 text-primary" />}
                                        {item.status === 'Verified' ? 'Verified by Institution' : 'Verification in Progress'}
                                    </div>
                                    <a href={item.proof} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-primary hover:underline">
                                        Proof <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}
