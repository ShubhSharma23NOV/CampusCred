import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Badge, Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/DesignSystem";
import { FileText, CheckCircle, XCircle, ExternalLink, Search, Filter } from "lucide-react";

export default function VerificationConsole() {
    const pendingVerifications = [
        { id: "V_901", student: "Shubh Sharma", item: "Summer Internship", entity: "TechFlow Systems", date: "28 Dec 2025", proof: "#" },
        { id: "V_902", student: "Ananya R.", item: "Open Source Contrib", entity: "Mozilla Foundation", date: "27 Dec 2025", proof: "#" },
        { id: "V_903", student: "Rohan M.", item: "Certification", entity: "AWS Certified Dev", date: "26 Dec 2025", proof: "#" },
    ];

    return (
        <div className="p-8 space-y-8">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                    <h1 className="text-2xl font-black tracking-tight text-slate-900">Verification & Approval Console</h1>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Enforce Credibility | Institutional Audit Trail</p>
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            placeholder="Search by student or entity..."
                            className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-xs font-medium"
                        />
                    </div>
                    <button className="px-4 py-2 bg-white border border-slate-200 text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-slate-50">
                        <Filter className="w-3.5 h-3.5" /> Filter
                    </button>
                </div>
            </header>

            <Card className="border-slate-200 shadow-none rounded-none overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50 hover:bg-slate-50 border-b border-slate-200">
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">ID</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">STUDENT</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">EXPERIENCE ITEM</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">ENTITY</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">SUBMITTED</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">PROOF</TableHead>
                            <TableHead className="text-right text-[10px] font-black uppercase tracking-widest text-slate-500">DECISION</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pendingVerifications.map((v) => (
                            <TableRow key={v.id} className="border-b border-slate-100 last:border-0">
                                <TableCell className="font-mono text-[10px] font-bold text-slate-400">{v.id}</TableCell>
                                <TableCell className="font-bold text-slate-900">{v.student}</TableCell>
                                <TableCell className="text-slate-600">{v.item}</TableCell>
                                <TableCell className="text-[11px] font-black uppercase text-slate-500">{v.entity}</TableCell>
                                <TableCell className="text-slate-500 text-[11px]">{v.date}</TableCell>
                                <TableCell>
                                    <button className="flex items-center gap-1.5 text-[10px] font-black text-blue-600 uppercase hover:underline">
                                        <FileText className="w-3.5 h-3.5" /> View Doc
                                    </button>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <button className="p-2 border border-slate-200 hover:bg-emerald-50 text-emerald-600 transition-colors">
                                            <CheckCircle className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 border border-slate-200 hover:bg-rose-50 text-rose-600 transition-colors">
                                            <XCircle className="w-4 h-4" />
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>

            <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200">
                <p className="text-[10px] font-black uppercase text-slate-400">Total 3 Pending Items Requiring Action</p>
                <button className="text-[10px] font-black uppercase text-blue-600 hover:underline">View Historical Log</button>
            </div>
        </div>
    );
}
