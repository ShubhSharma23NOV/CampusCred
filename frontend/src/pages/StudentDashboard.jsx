import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Badge, Progress } from "@/components/DesignSystem";
import { ShieldCheck, Zap, BarChart3, Clock, CheckCircle2, AlertCircle, Plus, FileText, Sparkles } from "lucide-react";
import MockGoogleForm from "@/components/MockGoogleForm";

export default function StudentDashboard() {
    const [showForm, setShowForm] = useState(false);
    const [stats, setStats] = useState({
        verified: 12,
        active: 3,
        reliability: 98
    });

    const handleFormSubmit = (data) => {
        // Update stats when new experience is logged
        setStats(prev => ({
            ...prev,
            active: prev.active + 1
        }));
    };

    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-500">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-2">
                    <h1 className="text-3xl font-black tracking-tight">Student Dashboard</h1>
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Credibility Overview</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="px-6 py-3 bg-gradient-to-r from-primary to-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-95 transition-all text-sm uppercase tracking-widest flex items-center gap-3"
                >
                    <Plus className="w-5 h-5" /> Log New Experience
                    <Sparkles className="w-4 h-4 animate-pulse" />
                </button>
            </header>



            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-primary" /> Verified Experience
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-black">{stats.verified}</div>
                        <p className="text-[10px] font-bold text-muted-foreground mt-1 uppercase tracking-wider">Confirmed by Institution</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                            <Zap className="w-4 h-4 text-amber-500" /> Active Projects
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-black">{stats.active}</div>
                        <p className="text-[10px] font-bold text-muted-foreground mt-1 uppercase tracking-wider">Currently in-progress</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Reliability
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-black">{stats.reliability}%</div>
                        <Progress value={stats.reliability} className="h-1.5 mt-3" />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                            <BarChart3 className="w-4 h-4 text-indigo-500" /> Placement Value
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-black">High</div>
                        <p className="text-[10px] font-bold text-muted-foreground mt-1 uppercase tracking-wider">Top 5% of your cohort</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-black uppercase tracking-widest">Top Skills in Use</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider">React / Frontend</span>
                            <Badge variant="success">Heavy Usage</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider">System Design</span>
                            <Badge variant="success">Frequent</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider">PostgreSQL / DB</span>
                            <Badge variant="secondary">Emerging</Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-black uppercase tracking-widest">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex gap-4">
                            <div className="w-1 h-10 bg-primary rounded-full shrink-0" />
                            <div>
                                <p className="text-sm font-bold">Micro-Project Completed</p>
                                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Dec 27 • API Performance Audit</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-1 h-10 bg-emerald-500 rounded-full shrink-0" />
                            <div>
                                <p className="text-sm font-bold">Skill Verified</p>
                                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Dec 24 • Institutional Auth Flow</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <MockGoogleForm
                isOpen={showForm}
                onClose={() => setShowForm(false)}
                onSubmit={handleFormSubmit}
            />
        </div>
    );
}
