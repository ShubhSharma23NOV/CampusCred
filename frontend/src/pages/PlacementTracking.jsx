import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Badge, Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/DesignSystem";
import { Search, Filter, Briefcase, Download } from "lucide-react";

export default function PlacementTracking() {
    const trackingData = [
        { id: "S_101", name: "Aman Gupta", dept: "CS", batch: "2026", status: "Internship", company: "Meta", package: "-" },
        { id: "S_102", name: "Sneha Kapur", dept: "IT", batch: "2025", status: "Placed", company: "Atlassian", package: "24 LPA" },
        { id: "S_103", name: "Vikram S.", dept: "CS", batch: "2025", status: "Shortlisted", company: "Adobe", package: "-" },
        { id: "S_104", name: "Riya J.", dept: "EC", batch: "2026", status: "Internship", company: "Samsung", package: "-" },
    ];

    return (
        <div className="p-8 space-y-8">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                    <h1 className="text-2xl font-black tracking-tight text-slate-900">Internship & Placement Tracking</h1>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Outcome Monitoring | System of Record</p>
                </div>
                <button className="px-6 py-2.5 bg-emerald-700 text-white text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-emerald-800 transition-all">
                    <Download className="w-4 h-4" /> Export Tracking Log
                </button>
            </header>

            <div className="flex flex-wrap gap-4 bg-slate-50 p-4 border border-slate-200">
                <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-[10px] font-black uppercase text-slate-500">
                    <Filter className="w-3.5 h-3.5" /> Department: <span className="text-slate-900">All</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-[10px] font-black uppercase text-slate-500">
                    <Filter className="w-3.5 h-3.5" /> Batch: <span className="text-slate-900">2025/26</span>
                </div>
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        placeholder="Search student by name or company..."
                        className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-300 text-xs font-medium"
                    />
                </div>
            </div>

            <Card className="border-slate-200 shadow-none rounded-none overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50 hover:bg-slate-50 border-b border-slate-200">
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">STUDENT</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">DEPT</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">BATCH</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">CURRENT STATUS</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">COMPANY / ENTITY</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">PACKAGE/STIPEND</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {trackingData.map((s) => (
                            <TableRow key={s.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-none bg-slate-100 flex items-center justify-center font-black text-xs text-slate-400">
                                            {s.name.charAt(0)}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-slate-900">{s.name}</span>
                                            <span className="text-[10px] font-mono text-slate-400">{s.id}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-[11px] font-black text-slate-500">{s.dept}</TableCell>
                                <TableCell className="text-[11px] font-bold text-slate-900">{s.batch}</TableCell>
                                <TableCell>
                                    <Badge variant={s.status === 'Placed' ? 'success' : 'outline'} className="text-[9px] font-black uppercase">
                                        {s.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-xs font-black uppercase text-slate-600 tracking-tight">
                                    {s.company || '-'}
                                </TableCell>
                                <TableCell className="text-right font-mono text-xs font-black text-emerald-700">
                                    {s.package}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Placed count", value: "842" },
                    { label: "Internship count", value: "1,204" },
                    { label: "Avg Package", value: "12.4 LPA" },
                    { label: "Placement Rate", value: "72.4%" },
                ].map(stat => (
                    <Card key={stat.label} className="border-slate-200 shadow-none rounded-none bg-slate-50/50">
                        <CardContent className="p-4">
                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{stat.label}</p>
                            <p className="text-xl font-black text-slate-900 mt-1">{stat.value}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
