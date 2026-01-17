import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Separator, Badge } from "@/components/DesignSystem";
import { User, Mail, Shield, FileText, ExternalLink } from "lucide-react";

export default function ProfileProofs() {
    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-500">
            <header className="space-y-2">
                <h1 className="text-3xl font-black tracking-tight">Profile & Proofs</h1>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Base Identity & Documentation</p>
            </header>

            <div className="grid lg:grid-cols-[1fr_360px] gap-8">
                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-black uppercase tracking-widest">Identity Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Full Name</label>
                                    <p className="text-sm font-bold">Shubh Sharma</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Institution ID</label>
                                    <p className="text-sm font-mono font-bold">ACROPOLIS_CS_2025_0991</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Official Email</label>
                                    <p className="text-sm font-bold">shubh.sharma@acropolis.in</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Cohort Reference</label>
                                    <p className="text-sm font-bold">B.Tech CS (Final Year)</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-sm font-black uppercase tracking-widest">Resume & CV</CardTitle>
                            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">Primary</Badge>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="border-2 border-dashed border-border hover:border-primary/50 transition-colors rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer bg-muted/5 group">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <FileText className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-sm font-bold text-foreground">Upload Resume</h3>
                                <p className="text-xs text-muted-foreground mt-1 mb-4">PDF, DOCX up to 5MB</p>
                                <button className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                                    Select File
                                </button>
                            </div>

                            {/* Mock Uploaded File */}
                            <div className="flex items-center justify-between p-4 bg-white border border-border rounded-xl shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                                        <FileText className="w-5 h-5 text-red-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold">Shubh_Sharma_Resume_v2.pdf</p>
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Uploaded 2 days ago • 1.2 MB</p>
                                    </div>
                                </div>
                                <button className="text-xs font-bold text-primary hover:underline">View</button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-black uppercase tracking-widest">Proof Documents</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[
                                { name: "Institutional ID Card", type: "Identity", date: "Jul 2022" },
                                { name: "Last Semester Transcript", type: "Academic", date: "Dec 2025" },
                                { name: "Internship Completion Cert", type: "Verification", date: "Oct 2025" },
                            ].map((doc) => (
                                <div key={doc.name} className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl border border-transparent hover:border-border transition-all">
                                    <div className="flex items-center gap-4">
                                        <FileText className="w-5 h-5 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm font-bold">{doc.name}</p>
                                            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">{doc.type} • {doc.date}</p>
                                        </div>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-primary cursor-pointer" />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-8">
                    <Card className="bg-muted/10">
                        <CardHeader>
                            <CardTitle className="text-xs font-black uppercase tracking-widest">Privacy Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold uppercase tracking-wider">Recruiter Visibility</span>
                                <Badge variant="success">Active</Badge>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold uppercase tracking-wider">Public Ledger Link</span>
                                <button className="text-[10px] font-black text-primary uppercase">Copy Link</button>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="p-8 border border-destructive/20 bg-destructive/5 rounded-[2rem] space-y-4">
                        <h4 className="text-xs font-black uppercase tracking-widest text-destructive">Danger Zone</h4>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Deleting your account will irreversibly erase all verified placement ledger records.</p>
                        <button className="w-full py-3 bg-destructive/10 hover:bg-destructive text-destructive hover:text-white transition-all rounded-xl text-[10px] font-black uppercase tracking-widest font-mono">
                            TERMINATE IDENTITY
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
