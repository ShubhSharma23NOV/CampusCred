import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Separator, Badge } from "@/components/DesignSystem";
import { FileSpreadsheet, Download, FileText, Share2, ClipboardCheck, Sparkles } from "lucide-react";

export default function TpoReports() {
    return (
        <div className="p-8 space-y-8">
            <header className="space-y-1">
                <h1 className="text-2xl font-black tracking-tight text-slate-900">Reports & Data Export</h1>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Compliance & Audit Readiness | Export Interface</p>
            </header>

            {/* Institutional Summary (AI Preview) */}
            <Card className="bg-slate-900 text-white border-none rounded-none">
                <CardContent className="p-8 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Sparkles className="w-6 h-6 text-emerald-400" />
                            <h3 className="text-sm font-black uppercase tracking-widest">Institutional Summary (AI Preview)</h3>
                        </div>
                        <Badge variant="outline" className="text-white border-white/20">PREVIEW SECTION</Badge>
                    </div>
                    <p className="text-lg font-medium leading-relaxed opacity-90">
                        “Student engagement increased steadily through micro-projects, with higher verification completion observed in final-year cohorts.”
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] opacity-50 pt-2">
                        Generated from verified data. Live AI integration planned.
                    </div>
                </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Standard Reports */}
                <Card className="border-slate-200 shadow-none rounded-none">
                    <CardHeader className="border-b border-slate-100 bg-slate-50/50">
                        <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-700">Standard Institutional Reports</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-slate-100">
                            {[
                                { title: "Verification Submission Audit", desc: "Full list of verified vs pending items by batch.", size: "2.4 MB" },
                                { title: "Placement Summary 2025", desc: "Final list of placed students with company & packages.", size: "1.2 MB" },
                                { title: "Internship Participation Log", desc: "Consolidated record of all active internships.", size: "4.8 MB" },
                                { title: "Skill Coverage Analysis", desc: "Top skills utilized in verified experiences.", size: "850 KB" },
                            ].map((report, i) => (
                                <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-slate-100 text-slate-400">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900 text-sm">{report.title}</p>
                                            <p className="text-xs text-slate-500 mt-0.5">{report.desc}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-[10px] font-mono text-slate-300">{report.size}</span>
                                        <button className="p-2 border border-slate-200 hover:bg-white text-slate-400 hover:text-blue-600 transition-all">
                                            <Download className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Data Export Console */}
                <div className="space-y-6">
                    <Card className="border-slate-200 shadow-none rounded-none bg-emerald-50/20 border-emerald-200">
                        <CardHeader>
                            <CardTitle className="text-xs font-black uppercase tracking-widest text-emerald-800 flex items-center gap-2">
                                <FileSpreadsheet className="w-4 h-4" /> Live Export to Sheets
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-xs text-emerald-700/80 leading-relaxed font-medium">
                                Sync all placement and verification data directly to your institutional Google Workspace. Updates occur every 6 hours.
                            </p>
                            <button className="w-full py-4 bg-emerald-700 text-white font-black text-xs uppercase tracking-widest hover:bg-emerald-800 transition-all shadow-lg active:scale-95">
                                INITIALIZE FULL DATA SYNC
                            </button>
                        </CardContent>
                    </Card>

                    <Card className="border-slate-200 shadow-none rounded-none">
                        <CardHeader className="border-b border-slate-100 bg-slate-50/50">
                            <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-700">Audit Compliance Status</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-600">Verification Integrity Score</span>
                                <span className="text-xl font-black text-slate-900">99.8%</span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-emerald-600">
                                    <ClipboardCheck className="w-3.5 h-3.5" /> All items have valid document links
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-emerald-600">
                                    <ClipboardCheck className="w-3.5 h-3.5" /> No orphaned experience records
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-amber-500">
                                    <Share2 className="w-3.5 h-3.5" /> 12 reports pending internal sign-off
                                </div>
                            </div>
                            <Separator className="bg-slate-100" />
                            <button className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline">Generate Audit Readiness Repo</button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
