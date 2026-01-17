import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Badge, Table, TableHeader, TableRow, TableHead, TableBody, TableCell, Separator } from "@/components/DesignSystem";
import { CheckCircle2, XCircle, Download, FileSpreadsheet, Share2 } from "lucide-react";
import MockGoogleSheet from "@/components/MockGoogleSheet";

const shortlist = [
    { id: "ACRO_0991", name: "Shubh Sharma", role: "Fullstack Eng", score: 94, status: "Shortlisted", notes: "Strong frontend evidence." },
    { id: "ACRP_3341", name: "Rohan M.", role: "UI Designer", score: 88, status: "Shortlisted", notes: "Exceptional design artifacts." },
    { id: "ACRP_1022", name: "Ananya R.", role: "Backend Dev", score: 82, status: "Pending", notes: "Check Redis proof." },
];

export default function DecisionPanel() {
    const [showSheet, setShowSheet] = useState(false);

    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-500">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black tracking-tight">Shortlist & Decisions</h1>
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Track Decisions & Export Data</p>
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={() => setShowSheet(true)}
                        className="px-6 py-3 bg-white border border-border hover:bg-muted/50 rounded-2xl transition-all flex items-center gap-2 text-xs font-black uppercase tracking-widest"
                    >
                        <FileSpreadsheet className="w-4 h-4 text-emerald-600" /> Export to Sheets
                    </button>
                    <button className="px-6 py-3 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all text-xs uppercase tracking-widest flex items-center gap-2">
                        <Share2 className="w-4 h-4" /> Share with Team
                    </button>
                </div>
            </header>

            <div className="grid gap-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-emerald-500/5 border-emerald-500/20">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-black uppercase tracking-widest text-emerald-600">Shortlisted</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black">14</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-amber-500/5 border-amber-500/20">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-black uppercase tracking-widest text-amber-600">Pending Review</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black">28</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-destructive/5 border-destructive/20">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-black uppercase tracking-widest text-destructive">Rejected</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black">42</div>
                        </CardContent>
                    </Card>
                </div>

                <Card className="overflow-hidden border-border/50">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/30 hover:bg-muted/30">
                                <TableHead>CANDIDATE</TableHead>
                                <TableHead>VERIFICATION SCORE</TableHead>
                                <TableHead>STATUS</TableHead>
                                <TableHead>INTERNAL NOTES</TableHead>
                                <TableHead className="text-right">UPDATE</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {shortlist.map((c) => (
                                <TableRow key={c.id}>
                                    <TableCell>
                                        <div>
                                            <p className="font-bold text-sm">{c.name}</p>
                                            <p className="text-[10px] font-mono text-muted-foreground">{c.id}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <span className="font-black text-sm">{c.score}</span>
                                            <div className="h-1.5 w-16 bg-muted rounded-full overflow-hidden">
                                                <div className="h-full bg-primary" style={{ width: `${c.score}%` }} />
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={c.status === 'Shortlisted' ? 'success' : 'warning'}>{c.status}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <p className="text-xs font-medium text-muted-foreground">{c.notes}</p>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <button className="p-2 hover:bg-emerald-50 rounded-lg text-emerald-600 transition-colors"><CheckCircle2 className="w-4 h-4" /></button>
                                            <button className="p-2 hover:bg-destructive/10 rounded-lg text-destructive transition-colors"><XCircle className="w-4 h-4" /></button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>

            <MockGoogleSheet 
                isOpen={showSheet} 
                onClose={() => setShowSheet(false)}
            />
        </div>
    );
}
