import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Badge, Table, TableHeader, TableRow, TableHead, TableBody, TableCell, Progress } from "@/components/DesignSystem";
import { Search, Filter, Download, UserPlus, XCircle, ExternalLink, ShieldCheck, Star } from "lucide-react";
import { recruiterPostsService } from "@/services/recruiterPostsService";

export default function RecruiterApplicants({ postId, postTitle, onClose }) {
    const [applicants, setApplicants] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (postId) {
            const data = recruiterPostsService.listApplicants(postId);
            setApplicants(data);
        }
    }, [postId]);

    const handleStatusUpdate = (studentId, status) => {
        const success = recruiterPostsService.updateApplicantStatus(postId, studentId, status);
        if (success) {
            setApplicants(recruiterPostsService.listApplicants(postId));
        }
    };

    const handleExport = () => {
        const headers = ["Name", "ID", "Role", "Match Score", "Credibility", "Status"];
        const rows = applicants.map(a => [a.name, a.id, a.role, a.matchScore + "%", a.credibility + "%", a.status]);
        const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map(e => e.join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `applicants_${postId}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const filteredApplicants = applicants.filter(a =>
        a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col h-full space-y-6">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                    <h2 className="text-xl font-black tracking-tight">{postTitle || 'Applicants'}</h2>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Candidate Tracking & Matching</p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <button
                        onClick={handleExport}
                        className="flex-1 sm:flex-none px-4 py-2 bg-muted hover:bg-muted/80 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                        <Download className="w-3.5 h-3.5" /> Export CSV
                    </button>
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-muted rounded-xl transition-colors"
                        >
                            <XCircle className="w-5 h-5 text-muted-foreground" />
                        </button>
                    )}
                </div>
            </header>

            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search by name or student ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-muted/30 border-transparent border focus:border-primary/20 rounded-2xl text-xs font-bold focus:outline-none transition-all"
                />
            </div>

            <div className="flex-1 overflow-auto no-scrollbar">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent border-b border-border/50">
                            <TableHead>Candidate</TableHead>
                            <TableHead>Scores</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredApplicants.length > 0 ? (
                            filteredApplicants.map((applicant) => (
                                <TableRow key={applicant.id} className="group">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary/10 to-indigo-500/10 flex items-center justify-center text-primary font-black text-xs">
                                                {applicant.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-sm">{applicant.name}</span>
                                                <span className="text-[10px] text-muted-foreground font-mono uppercase">{applicant.id} • {applicant.role}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-2 min-w-[120px]">
                                            <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-tighter">
                                                <span>Match Score</span>
                                                <span className="text-primary">{applicant.matchScore}%</span>
                                            </div>
                                            <Progress value={applicant.matchScore} className="h-1" />
                                            <div className="flex items-center gap-2">
                                                <Badge variant="success" className="px-1.5 py-0 text-[8px] h-4">
                                                    <ShieldCheck className="w-2.5 h-2.5 mr-1" /> {applicant.credibility}% Reliability
                                                </Badge>
                                                <span className="text-[8px] font-bold text-muted-foreground">{applicant.verifiedProofs} Proofs</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                applicant.status === 'Shortlisted' ? 'success' :
                                                    applicant.status === 'Rejected' ? 'warning' : 'outline'
                                            }
                                            className="text-[9px]"
                                        >
                                            {applicant.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleStatusUpdate(applicant.id, 'Shortlisted')}
                                                title="Shortlist"
                                                className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-colors"
                                            >
                                                <Star className="w-4 h-4 fill-current" />
                                            </button>
                                            <button
                                                onClick={() => handleStatusUpdate(applicant.id, 'Rejected')}
                                                title="Reject"
                                                className="p-2 hover:bg-rose-50 text-rose-600 rounded-lg transition-colors"
                                            >
                                                <XCircle className="w-4 h-4" />
                                            </button>
                                            <button
                                                title="View Evidence"
                                                className="p-2 hover:bg-primary/5 text-primary rounded-lg transition-colors"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="h-32 text-center">
                                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">No applicants found matching your search</p>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
