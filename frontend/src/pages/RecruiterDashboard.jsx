import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Badge, Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/DesignSystem";
import { Search, Filter, ShieldCheck, ChevronRight, Users } from "lucide-react";

const candidates = [
    { id: "SVVV_0991", name: "Shubh Sharma", role: "Fullstack Eng", verified: 12, reliability: "98%", status: "Active" },
    { id: "ACRP_1022", name: "Ananya R.", role: "Backend Dev", verified: 8, reliability: "95%", status: "Pending" },
    { id: "ACRP_3341", name: "Rohan M.", role: "UI Designer", verified: 15, reliability: "99%", status: "Active" },
];

export default function RecruiterDashboard({ onSelectCandidate }) {
    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-500">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black tracking-tight">Recruiter Console</h1>
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Candidate Verification Hub</p>
                </div>
                <div className="flex gap-4">
                    <Card className="px-6 py-2 bg-primary/5 border-primary/20">
                        <div className="flex items-center gap-3">
                            <Users className="w-5 h-5 text-primary" />
                            <div className="text-right">
                                <p className="text-xs font-black uppercase tracking-tight leading-none">Verified Pool</p>
                                <p className="text-xl font-black text-primary leading-none mt-1">128</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </header>

            <div className="grid gap-6">
                <div className="flex gap-4 items-center bg-muted/30 p-4 rounded-3xl border border-border/50">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            placeholder="Filter by skill, cohort, or verification status..."
                            className="w-full pl-10 pr-4 py-3 bg-white/50 border-none focus:ring-2 focus:ring-primary/20 rounded-2xl text-sm font-medium outline-none transition-all"
                        />
                    </div>
                    <button className="px-6 py-3 bg-white border border-border hover:bg-muted/50 rounded-2xl transition-all flex items-center gap-2 text-xs font-black uppercase tracking-widest">
                        <Filter className="w-4 h-4" /> Advanced Filters
                    </button>
                </div>

                <Card className="overflow-hidden border-border/50">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/30 hover:bg-muted/30">
                                <TableHead>CANDIDATE</TableHead>
                                <TableHead>PRIMARY ROLE</TableHead>
                                <TableHead>VERIFIED ITEMS</TableHead>
                                <TableHead>RELIABILITY</TableHead>
                                <TableHead className="text-right">SCAN EVIDENCE</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {candidates.map((c) => (
                                <TableRow key={c.id} className="cursor-pointer group hover:bg-primary/5 transition-colors" onClick={() => onSelectCandidate(c)}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center font-black text-xs text-muted-foreground group-hover:bg-primary group-hover:text-white transition-all">
                                                {c.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm">{c.name}</p>
                                                <p className="text-[10px] font-mono text-muted-foreground">{c.id}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="text-[9px]">{c.role}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1.5 font-black text-xs">
                                            <ShieldCheck className="w-4 h-4 text-emerald-500" /> {c.verified} Proofs
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className="font-black text-sm text-primary">{c.reliability}</span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <ChevronRight className="w-5 h-5 ml-auto text-muted-foreground group-hover:translate-x-1 transition-transform" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </div>
    );
}
