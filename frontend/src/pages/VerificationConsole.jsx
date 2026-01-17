import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Badge, Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/DesignSystem";
import { FileText, CheckCircle, XCircle, ExternalLink, Search, Filter, Megaphone, Eye, CheckCircle2, AlertTriangle, History } from "lucide-react";
import { postApprovalService } from "@/services/postApprovalService";
import { POST_STATUS } from "@/services/recruiterPostsService";
import { Dialog, DialogContent, DialogHeader, DialogTitle, Badge as DesignBadge, Table as DesignTable, TableHeader as DesignTableHeader, TableRow as DesignTableRow, TableHead as DesignTableHead, TableBody as DesignTableBody, TableCell as DesignTableCell } from "@/components/DesignSystem";
import { cn } from "@/lib/utils";

export default function VerificationConsole() {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [rejectionReason, setRejectionReason] = useState("");
    const [activeFilter, setActiveFilter] = useState(POST_STATUS.PENDING);
    const [stats, setStats] = useState({ pending: 0, approvedToday: 0, rejectedToday: 0 });

    useEffect(() => {
        refreshData();
    }, [activeFilter]);

    const refreshData = () => {
        setPosts(postApprovalService.listPostsByStatus(activeFilter));
        setStats(postApprovalService.getApprovalStats());
    };

    const handleApprove = (postId) => {
        postApprovalService.approvePost(postId);
        refreshData();
        setSelectedPost(null);
    };

    const handleReject = (postId) => {
        if (!rejectionReason) {
            alert("Please provide a rejection reason.");
            return;
        }
        postApprovalService.rejectPost(postId, rejectionReason);
        refreshData();
        setSelectedPost(null);
        setRejectionReason("");
    };

    const handleRequestChanges = (postId) => {
        if (!rejectionReason) {
            alert("Please providing feedback for required changes.");
            return;
        }
        postApprovalService.requestChanges(postId, rejectionReason);
        refreshData();
        setSelectedPost(null);
        setRejectionReason("");
    };

    const pendingVerifications = [
        { id: "V_901", student: "Shubh Sharma", item: "Summer Internship", entity: "TechFlow Systems", date: "28 Dec 2025", proof: "#" },
        { id: "V_902", student: "Ananya R.", item: "Open Source Contrib", entity: "Mozilla Foundation", date: "27 Dec 2025", proof: "#" },
        { id: "V_903", student: "Rohan M.", item: "Certification", entity: "AWS Certified Dev", date: "26 Dec 2025", proof: "#" },
    ];

    return (
        <div className="p-8 space-y-12 animate-in fade-in duration-500">
            {/* Student Verifications Section */}
            <section className="space-y-6">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-black tracking-tight text-slate-900">Verification & Approval Console</h1>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Enforce Credibility | Institutional Audit Trail</p>
                    </div>
                </header>

                <Card className="border-slate-200 shadow-none rounded-[2rem] overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-50 hover:bg-slate-50 border-b border-slate-200">
                                <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 py-6 px-8">ID</TableHead>
                                <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">STUDENT</TableHead>
                                <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">EXPERIENCE ITEM</TableHead>
                                <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">ENTITY</TableHead>
                                <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">SUBMITTED</TableHead>
                                <TableHead className="text-right text-[10px] font-black uppercase tracking-widest text-slate-500 px-8">DECISION</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pendingVerifications.map((v) => (
                                <TableRow key={v.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                                    <TableCell className="font-mono text-[10px] font-bold text-slate-400 py-6 px-8">{v.id}</TableCell>
                                    <TableCell className="font-bold text-slate-900">{v.student}</TableCell>
                                    <TableCell className="text-slate-600">{v.item}</TableCell>
                                    <TableCell className="text-[11px] font-black uppercase text-slate-500">{v.entity}</TableCell>
                                    <TableCell className="text-slate-500 text-[11px]">{v.date}</TableCell>
                                    <TableCell className="text-right px-8">
                                        <div className="flex justify-end gap-2">
                                            <button className="p-2 border border-slate-200 rounded-xl hover:bg-emerald-50 text-emerald-600 transition-colors">
                                                <CheckCircle className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 border border-slate-200 rounded-xl hover:bg-rose-50 text-rose-600 transition-colors">
                                                <XCircle className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </section>

            {/* Recruiter Post Approvals Section */}
            <section className="space-y-6 pt-6 border-t border-slate-200/60">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <Megaphone className="w-5 h-5 text-primary" />
                            <h2 className="text-xl font-black tracking-tight text-slate-900">Recruiter Post Approvals</h2>
                        </div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Review and approve job & internship posts before publishing</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200/50">
                            {[POST_STATUS.PENDING, POST_STATUS.APPROVED, POST_STATUS.REJECTED].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setActiveFilter(status)}
                                    className={cn(
                                        "px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all",
                                        activeFilter === status ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                                    )}
                                >
                                    {status.split('_')[0]}
                                </button>
                            ))}
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-amber-50/30 border-amber-100 p-6 rounded-[1.5rem] shadow-none">
                        <div className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">Pending Review</div>
                        <div className="text-3xl font-black text-slate-900">{stats.pending}</div>
                    </Card>
                    <Card className="bg-emerald-50/30 border-emerald-100 p-6 rounded-[1.5rem] shadow-none">
                        <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Approved Today</div>
                        <div className="text-3xl font-black text-slate-900">{stats.approvedToday}</div>
                    </Card>
                    <Card className="bg-rose-50/30 border-rose-100 p-6 rounded-[1.5rem] shadow-none">
                        <div className="text-[10px] font-black text-rose-600 uppercase tracking-widest mb-1">Rejected Today</div>
                        <div className="text-3xl font-black text-slate-900">{stats.rejectedToday}</div>
                    </Card>
                </div>

                <Card className="border-slate-200 shadow-none rounded-[2rem] overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-50 hover:bg-slate-50 border-b border-slate-200">
                                <TableHead className="py-6 px-8">Opportunity details</TableHead>
                                <TableHead>Eligibility</TableHead>
                                <TableHead>Submitted On</TableHead>
                                <TableHead className="text-right px-8">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {posts.length > 0 ? (
                                posts.map((post) => (
                                    <DesignTableRow key={post.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 group">
                                        <DesignTableCell className="py-6 px-8">
                                            <div className="flex flex-col">
                                                <span className="font-black text-sm text-slate-900">{post.jobTitle}</span>
                                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{post.companyName} • {post.type}</span>
                                            </div>
                                        </DesignTableCell>
                                        <DesignTableCell>
                                            <div className="text-[10px] font-bold text-slate-600">
                                                CGPA: {post.minCgpa}+ | {post.allowedBranches?.length || 0} Branches
                                            </div>
                                        </DesignTableCell>
                                        <DesignTableCell>
                                            <span className="text-[10px] font-medium text-slate-500">{new Date(post.createdAt).toLocaleDateString()}</span>
                                        </DesignTableCell>
                                        <DesignTableCell className="text-right px-8">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => setSelectedPost(post)}
                                                    className="px-4 py-2 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-all flex items-center gap-2"
                                                >
                                                    <Eye className="w-3 h-3" /> Review
                                                </button>
                                                {activeFilter === POST_STATUS.PENDING && (
                                                    <button
                                                        onClick={() => handleApprove(post.id)}
                                                        className="p-2 border border-slate-200 rounded-xl hover:bg-emerald-50 text-emerald-600 transition-colors"
                                                    >
                                                        <CheckCircle2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </DesignTableCell>
                                    </DesignTableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-40 text-center">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No posts matching this filter</p>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Card>
            </section>

            {/* Review Modal */}
            <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Review Opportunity Post</DialogTitle>
                        <DesignBadge variant={
                            selectedPost?.status === POST_STATUS.APPROVED ? 'success' :
                                selectedPost?.status === POST_STATUS.REJECTED ? 'warning' : 'outline'
                        } className="w-fit">{selectedPost?.status}</DesignBadge>
                    </DialogHeader>

                    {selectedPost && (
                        <div className="space-y-8 mt-6">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Post Details</label>
                                        <h3 className="text-lg font-black text-slate-900">{selectedPost.jobTitle}</h3>
                                        <p className="text-sm font-bold text-primary">{selectedPost.companyName}</p>
                                        <p className="text-xs text-slate-600">{selectedPost.location} • {selectedPost.type}</p>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Remuneration</label>
                                        <p className="text-sm font-black text-emerald-600">{selectedPost.stipend}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Eligibility Rules</label>
                                        <div className="flex flex-wrap gap-2 pt-1">
                                            <DesignBadge variant="outline" className="text-[10px]">CGPA {selectedPost.minCgpa}+</DesignBadge>
                                            <DesignBadge variant="outline" className="text-[10px]">Backlogs: {selectedPost.backlogAllowed}</DesignBadge>
                                        </div>
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {selectedPost.allowedBranches?.map(b => (
                                                <span key={b} className="px-2 py-0.5 bg-slate-100 rounded text-[9px] font-black text-slate-600 uppercase tracking-tighter">{b}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Deadline</label>
                                        <p className="text-xs font-bold text-rose-500">{new Date(selectedPost.deadline).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Detailed Description</label>
                                <p className="text-xs leading-relaxed text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100 whitespace-pre-wrap">{selectedPost.description}</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Required Skills</label>
                                <div className="flex flex-wrap gap-2">
                                    {selectedPost.requiredSkills?.map(s => (
                                        <DesignBadge key={s} variant="secondary" className="bg-indigo-50 text-indigo-600 border-none">{s}</DesignBadge>
                                    ))}
                                </div>
                            </div>

                            {/* Safety Checks */}
                            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-3">
                                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                                <div className="space-y-1">
                                    <p className="text-[11px] font-black text-amber-900 uppercase tracking-widest">System Validation Check</p>
                                    <ul className="text-[10px] font-bold text-amber-700/80 list-disc list-inside">
                                        {new Date(selectedPost.deadline) < new Date() && <li>CRITICAL: Deadline has already passed.</li>}
                                        {(!selectedPost.stipend || selectedPost.stipend === '0') && <li>NOTICE: Stipend/CTC not specified or is zero.</li>}
                                        <li>Recruiter identity verified via Institutional Registry.</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="space-y-4 bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">TPO feedback / rejection reason</label>
                                    <textarea
                                        value={rejectionReason}
                                        onChange={(e) => setRejectionReason(e.target.value)}
                                        placeholder="Add private note to recruiter..."
                                        className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-xs font-medium focus:ring-0 focus:border-primary/20 transition-all resize-none h-20"
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleReject(selectedPost.id)}
                                        className="flex-1 py-4 bg-white border border-rose-200 text-rose-600 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-rose-50 transition-all"
                                    >
                                        Reject Post
                                    </button>
                                    <button
                                        onClick={() => handleRequestChanges(selectedPost.id)}
                                        className="flex-1 py-4 bg-white border border-amber-200 text-amber-600 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-amber-50 transition-all"
                                    >
                                        Request Changes
                                    </button>
                                    <button
                                        onClick={() => handleApprove(selectedPost.id)}
                                        className="flex-1 py-4 bg-primary text-white font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all flex items-center justify-center gap-2"
                                    >
                                        <CheckCircle2 className="w-3.5 h-3.5" /> Approve & Publish
                                    </button>
                                </div>
                            </div>

                            {/* Audit Trail */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <History className="w-4 h-4 text-slate-400" />
                                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Audit Trail</label>
                                </div>
                                <div className="space-y-3 pl-4 border-l border-slate-200">
                                    {selectedPost.audit?.map((log, i) => (
                                        <div key={i} className="relative">
                                            <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-white border-2 border-slate-300" />
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-black text-slate-900 uppercase">{log.action}</span>
                                                <span className="text-[9px] text-slate-500">{new Date(log.timestamp).toLocaleString()} • {log.actor || 'System'}</span>
                                                {log.reason && <p className="text-[9px] font-bold text-rose-500 mt-1 italic">Reason: {log.reason}</p>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
