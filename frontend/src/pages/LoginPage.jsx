import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/DesignSystem";
import { ShieldCheck, Mail, Lock, ArrowRight, Github, Chrome, Zap, GraduationCap, Briefcase, Building2 } from "lucide-react";

export default function LoginPage({ onLogin, onSwitchToRegister }) {
    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-primary/5 via-background to-indigo-50/50 relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -mr-48 -mt-48 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] -ml-40 -mb-40" />

            <div className="w-full max-w-[440px] relative">
                <div className="text-center mb-10 space-y-4">
                    <div className="inline-flex items-center gap-3 group px-4 py-2 bg-white rounded-2xl shadow-sm border border-border/50">
                        <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <span className="font-black text-xl tracking-tight text-foreground">CampusCred</span>
                    </div>
                    <h1 className="text-3xl font-black text-foreground tracking-tight">Welcome Back!</h1>
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Access your verified records</p>
                </div>

                <Card className="rounded-[3rem] shadow-2xl shadow-primary/10 border-white/50 bg-white/80 backdrop-blur-xl">
                    <CardContent className="p-10 space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Email / Roll No.</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-4 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="Enter your ID..."
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
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-4 py-4 bg-muted/30 border-transparent border focus:border-primary/20 rounded-[1.5rem] text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest px-1">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input type="checkbox" className="w-4 h-4 rounded-lg border-2 border-border checked:bg-primary transition-all appearance-none cursor-pointer" />
                                <span className="group-hover:text-primary transition-colors">Remember me</span>
                            </label>
                            <a href="#" className="text-primary hover:text-indigo-600 transition-colors">Forgot Password?</a>
                        </div>

                        <button
                            onClick={onLogin}
                            className="w-full py-4 bg-primary text-white font-black text-xs uppercase tracking-[0.2em] rounded-[1.5rem] shadow-xl shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-3"
                        >
                            LOGIN NOW <ArrowRight className="w-4 h-4" />
                        </button>

                        <div className="relative py-4">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border/50"></div></div>
                            <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest text-muted-foreground/40"><span className="bg-white/80 px-4 backdrop-blur-sm">OR CONTINUE WITH</span></div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex items-center justify-center gap-3 py-3.5 bg-white border border-border rounded-2xl hover:bg-muted/30 transition-all font-bold text-xs">
                                <Chrome className="w-4 h-4" /> Google
                            </button>
                            <button className="flex items-center justify-center gap-3 py-3.5 bg-white border border-border rounded-2xl hover:bg-muted/30 transition-all font-bold text-xs">
                                <Github className="w-4 h-4" /> GitHub
                            </button>
                        </div>

                        {/* Fast Access Section */}
                        <div className="pt-4 space-y-4">
                            <div className="flex items-center gap-3 px-2">
                                <Zap className="w-3.5 h-3.5 text-primary animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Demo Fast Access</span>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <button
                                    onClick={() => onLogin('student')}
                                    className="flex flex-col items-center gap-2 p-3 bg-primary/5 border border-primary/10 rounded-2xl hover:bg-primary/10 transition-all group"
                                >
                                    <GraduationCap className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                                    <span className="text-[8px] font-black uppercase tracking-widest text-primary/80">Student</span>
                                </button>
                                <button
                                    onClick={() => onLogin('recruiter')}
                                    className="flex flex-col items-center gap-2 p-3 bg-indigo-50 border border-indigo-100 rounded-2xl hover:bg-indigo-100 transition-all group"
                                >
                                    <Briefcase className="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform" />
                                    <span className="text-[8px] font-black uppercase tracking-widest text-indigo-600/80">Recruiter</span>
                                </button>
                                <button
                                    onClick={() => onLogin('admin')}
                                    className="flex flex-col items-center gap-2 p-3 bg-emerald-50 border border-emerald-100 rounded-2xl hover:bg-emerald-100 transition-all group"
                                >
                                    <Building2 className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
                                    <span className="text-[8px] font-black uppercase tracking-widest text-emerald-600/80">Admin</span>
                                </button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <p className="mt-8 text-center text-sm font-bold text-muted-foreground">
                    Don't have an account? {' '}
                    <button
                        onClick={onSwitchToRegister}
                        className="text-primary font-black uppercase tracking-widest text-[11px] hover:underline"
                    >
                        Register Now
                    </button>
                </p>
            </div>
        </div>
    );
}
