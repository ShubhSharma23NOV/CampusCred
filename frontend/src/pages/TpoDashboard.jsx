import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/DesignSystem";
import { Users, CheckCircle, Clock, ShieldAlert, ArrowUpRight, Bell } from "lucide-react";

export default function TpoDashboard() {
    const stats = [
        { label: "Students Enrolled", value: "2,482", icon: Users, color: "text-blue-700", bg: "bg-blue-50" },
        { label: "Active Internships", value: "124", icon: Clock, color: "text-amber-700", bg: "bg-amber-50" },
        { label: "Verified Experiences", value: "18,502", icon: CheckCircle, color: "text-emerald-700", bg: "bg-emerald-50" },
        { label: "Pending Verifications", value: "342", icon: ShieldAlert, color: "text-rose-700", bg: "bg-rose-50" },
    ];

    return (
        <div className="p-8 space-y-8">
            <header className="space-y-1">
                <h1 className="text-2xl font-black tracking-tight text-slate-900">Placement Office Dashboard</h1>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">System of Record | Institutional Overview</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <Card key={i} className="border-slate-200 shadow-none rounded-none">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className={`p-3 ${stat.bg} ${stat.color}`}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-slate-200 shadow-none rounded-none">
                    <CardHeader className="border-b border-slate-100 bg-slate-50/50">
                        <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-700">Recent Verification Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-slate-100">
                            {[1, 2, 3, 4, 5].map((_, i) => (
                                <div key={i} className="p-4 flex items-center justify-between text-xs">
                                    <div className="flex flex-col gap-0.5">
                                        <span className="font-bold text-slate-900">Student ID: ACRP_202{i}</span>
                                        <span className="text-slate-500">Industry Internship Approval</span>
                                    </div>
                                    <Badge variant="outline" className="text-[9px] font-black uppercase tracking-tighter">Pending Approval</Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-none rounded-none">
                    <CardHeader className="border-b border-slate-100 bg-slate-50/50">
                        <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-700">Placement Drive Status</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-slate-100">
                            {[
                                { company: "Google Cloud", role: "SRE Intern", status: "In Progress", apps: 42 },
                                { company: "Microsoft", role: "SDE-1", status: "Shortlisting", apps: 128 },
                                { company: "Zomato", role: "Product Designer", status: "Confirmed", apps: 15 },
                            ].map((drive, i) => (
                                <div key={i} className="p-4 flex items-center justify-between text-xs">
                                    <div className="flex flex-col gap-0.5">
                                        <span className="font-bold text-slate-900">{drive.company}</span>
                                        <span className="text-slate-500">{drive.role} • {drive.apps} Applicants</span>
                                    </div>
                                    <button className="p-1.5 hover:bg-slate-100 transition-colors">
                                        <ArrowUpRight className="w-4 h-4 text-slate-400" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
