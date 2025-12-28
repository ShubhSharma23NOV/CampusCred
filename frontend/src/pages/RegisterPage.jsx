import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/DesignSystem";
import { ShieldCheck, Mail, Lock, User, ArrowRight, Briefcase, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RegisterPage({ onRegister, onSwitchToLogin }) {
    const [role, setRole] = useState('student');

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-indigo-50/50 via-background to-primary/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] -ml-48 -mt-48" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[100px] -mr-40 -mb-40" />

            <div className="w-full max-w-[480px] relative">
                <div className="text-center mb-8 space-y-4">
                    <div className="inline-flex items-center gap-3 group px-4 py-2 bg-white rounded-2xl shadow-sm border border-border/50">
                        <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center text-white">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <span className="font-black text-xl tracking-tight text-foreground">CampusCred</span>
                    </div>
                    <h1 className="text-3xl font-black text-foreground tracking-tight">Create Account</h1>
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Join the verified placement network</p>
                </div>

                <Card className="rounded-[3rem] shadow-2xl shadow-primary/10 border-white/50 bg-white/80 backdrop-blur-xl">
                    <CardContent className="p-10 space-y-6">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">I am a...</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => setRole('student')}
                                    className={cn(
                                        "flex flex-col items-center gap-3 p-4 rounded-3xl border-2 transition-all",
                                        role === 'student' ? "bg-primary/5 border-primary text-primary shadow-lg shadow-primary/5 scale-105" : "bg-white border-border/50 text-muted-foreground hover:border-primary/20"
                                    )}
                                >
                                    <GraduationCap className="w-6 h-6" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Student</span>
                                </button>
                                <button
                                    onClick={() => setRole('recruiter')}
                                    className={cn(
                                        "flex flex-col items-center gap-3 p-4 rounded-3xl border-2 transition-all",
                                        role === 'recruiter' ? "bg-indigo-50 border-indigo-500 text-indigo-600 shadow-lg shadow-indigo-100 scale-105" : "bg-white border-border/50 text-muted-foreground hover:border-indigo-200"
                                    )}
                                >
                                    <Briefcase className="w-6 h-6" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Recruiter</span>
                                </button>
                            </div>

                            <div className="space-y-4 pt-2">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Full Name</label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-4 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full pl-12 pr-4 py-4 bg-muted/30 border-transparent border focus:border-primary/20 rounded-[1.5rem] text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Email / ID</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-4 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                        <input
                                            type="text"
                                            placeholder="you@college.edu..."
                                            className="w-full pl-12 pr-4 py-4 bg-muted/30 border-transparent border focus:border-primary/20 rounded-[1.5rem] text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Password</label>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-4 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                        <input
                                            type="password"
                                            placeholder="Create password..."
                                            className="w-full pl-12 pr-4 py-4 bg-muted/30 border-transparent border focus:border-primary/20 rounded-[1.5rem] text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={onRegister}
                            className="w-full py-4 bg-primary text-white font-black text-xs uppercase tracking-[0.2em] rounded-[1.5rem] shadow-xl shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-3"
                        >
                            CREATE ACCOUNT <ArrowRight className="w-4 h-4" />
                        </button>
                    </CardContent>
                </Card>

                <p className="mt-8 text-center text-sm font-bold text-muted-foreground">
                    Already have an account? {' '}
                    <button
                        onClick={onSwitchToLogin}
                        className="text-primary font-black uppercase tracking-widest text-[11px] hover:underline"
                    >
                        Login Back
                    </button>
                </p>
            </div>
        </div>
    );
}
