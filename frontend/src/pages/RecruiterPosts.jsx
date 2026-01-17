import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Badge, Table, TableHeader, TableRow, TableHead, TableBody, TableCell, Dialog, DialogContent, DialogHeader, DialogTitle, Sheet, SheetContent } from "@/components/DesignSystem";
import { Plus, Briefcase, MapPin, Users, Calendar, MoreVertical, LayoutDashboard, FileText, Send, Save, X, Search, Filter, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { recruiterPostsService, POST_STATUS } from "@/services/recruiterPostsService";
import RecruiterApplicants from './RecruiterApplicants';

export default function RecruiterPosts() {
    const [posts, setPosts] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedPostForApplicants, setSelectedPostForApplicants] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    // Form state
    const [formData, setFormData] = useState({
        jobTitle: '',
        type: 'Internship',
        companyName: 'TechCorp Solutions', // Mock autofill
        location: '',
        stipend: '',
        requiredSkills: '',
        allowedBranches: '',
        minCgpa: '7.0',
        backlogAllowed: 'No',
        description: '',
        deadline: '',
    });

    useEffect(() => {
        // Seed and load data
        recruiterPostsService.seedDemoData();
        setPosts(recruiterPostsService.listPosts());
    }, []);

    const handleCreatePost = (e, statusType = 'Live') => {
        e.preventDefault();
        const status = statusType === 'Live' ? POST_STATUS.PENDING : POST_STATUS.DRAFT;
        const post = {
            ...formData,
            requiredSkills: formData.requiredSkills.split(',').map(s => s.trim()),
            allowedBranches: formData.allowedBranches.split(',').map(b => b.trim()),
            status: status
        };
        recruiterPostsService.createPost(post);
        setPosts(recruiterPostsService.listPosts());
        setIsCreateModalOpen(false);
        // Reset form
        setFormData({
            jobTitle: '',
            type: 'Internship',
            companyName: 'TechCorp Solutions',
            location: '',
            stipend: '',
            requiredSkills: '',
            allowedBranches: '',
            minCgpa: '7.0',
            backlogAllowed: 'No',
            description: '',
            deadline: '',
        });
    };

    const handleClosePost = (id) => {
        recruiterPostsService.closePost(id);
        setPosts(recruiterPostsService.listPosts());
    };

    const filteredPosts = posts.filter(p =>
        p.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-500">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">Recruiter Posts</h1>
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Create and manage job & internship opportunities</p>
                </div>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="w-full md:w-auto px-8 py-4 bg-primary text-white font-black text-xs uppercase tracking-[0.2em] rounded-[1.5rem] shadow-xl shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                    <Plus className="w-4 h-4" /> Create Post
                </button>
            </header>

            <div className="flex flex-col md:flex-row gap-4 items-center bg-white/40 backdrop-blur-md p-2 rounded-[2rem] border border-white/50 shadow-sm">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-14 pr-6 py-4 bg-transparent border-none focus:ring-0 text-sm font-bold"
                    />
                </div>
                <div className="flex items-center gap-2 p-2">
                    <button className="p-3 hover:bg-white/60 rounded-2xl transition-all text-muted-foreground hover:text-primary">
                        <Filter className="w-4 h-4" />
                    </button>
                    <div className="h-6 w-[1px] bg-border/40 mx-2" />
                    <Badge variant="outline" className="bg-white/50 border-none shadow-sm px-4 py-2">Total: {posts.length}</Badge>
                </div>
            </div>

            <Card className="rounded-[2.5rem] border-white/50 bg-white/60 backdrop-blur-xl shadow-xl shadow-primary/5 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent border-b border-border/40">
                            <TableHead className="py-6 px-8">Opportunity Details</TableHead>
                            <TableHead>Eligibility</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Applicants</TableHead>
                            <TableHead className="text-right px-8">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredPosts.length > 0 ? (
                            filteredPosts.map((post) => (
                                <TableRow key={post.id} className="group hover:bg-primary/[0.02]">
                                    <TableCell className="py-6 px-8">
                                        <div className="flex items-center gap-4">
                                            <div className={cn(
                                                "w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110",
                                                post.type === 'Internship' ? "bg-amber-100 text-amber-600 shadow-amber-200/50" : "bg-primary/10 text-primary shadow-primary/20"
                                            )}>
                                                {post.type === 'Internship' ? <Briefcase className="w-5 h-5" /> : <LayoutDashboard className="w-5 h-5" />}
                                            </div>
                                            <div className="space-y-1">
                                                <h3 className="font-black text-sm text-foreground">{post.jobTitle}</h3>
                                                <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                                    <span>{post.companyName}</span>
                                                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {post.location}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="text-[10px] font-black text-muted-foreground uppercase">CGPA: <span className="text-foreground">{post.minCgpa}+</span></div>
                                            <div className="flex flex-wrap gap-1">
                                                {(post.allowedBranches || []).slice(0, 2).map(b => (
                                                    <span key={b} className="px-2 py-0.5 bg-muted/50 rounded-md text-[8px] font-black uppercase text-muted-foreground">{b}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-1">
                                            <Badge variant={
                                                post.status === POST_STATUS.APPROVED ? 'success' :
                                                    post.status === POST_STATUS.PENDING ? 'outline' :
                                                        post.status === POST_STATUS.REJECTED ? 'warning' : 'outline'
                                            } className="shadow-sm w-fit">
                                                {post.status?.replace('_', ' ')}
                                            </Badge>
                                            {post.rejectionReason && (
                                                <div className="flex items-center gap-1 text-[8px] font-bold text-rose-500 max-w-[150px]">
                                                    <AlertCircle className="w-2 h-2 shrink-0" />
                                                    <span className="truncate" title={post.rejectionReason}>Feedback: {post.rejectionReason}</span>
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className="flex -space-x-2">
                                                {[1, 2, 3].map(i => (
                                                    <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-muted flex items-center justify-center text-[8px] font-bold">
                                                        {post.applicantsCount > 0 ? 'U' : '-'}
                                                    </div>
                                                ))}
                                            </div>
                                            <span className="text-xs font-black text-primary">{post.applicantsCount} Applied</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right px-8">
                                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                            <button
                                                onClick={() => setSelectedPostForApplicants(post)}
                                                className="px-4 py-2 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-primary/20 transition-all"
                                            >
                                                Applicants
                                            </button>
                                            <button
                                                onClick={() => handleClosePost(post.id)}
                                                disabled={post.status === 'Closed'}
                                                className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-xl transition-all disabled:opacity-30"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="h-64 text-center">
                                    <div className="flex flex-col items-center justify-center space-y-4 opacity-40">
                                        <FileText className="w-12 h-12" />
                                        <p className="text-sm font-black uppercase tracking-[0.2em]">No posts found</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Card>

            {/* Create Post Dialog */}
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Opportunity</DialogTitle>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Fill in the details to publish your post</p>
                    </DialogHeader>

                    <form className="space-y-6 mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Type</label>
                                <select
                                    className="w-full px-4 py-3 bg-muted/30 border-transparent border focus:border-primary/20 rounded-2xl text-xs font-bold focus:outline-none transition-all"
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                >
                                    <option>Internship</option>
                                    <option>Placement</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Role Title</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Frontend Intern"
                                    className="w-full px-4 py-3 bg-muted/30 border-transparent border focus:border-primary/20 rounded-2xl text-xs font-bold focus:outline-none transition-all"
                                    value={formData.jobTitle}
                                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Location</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Remote / Bangalore"
                                    className="w-full px-4 py-3 bg-muted/30 border-transparent border focus:border-primary/20 rounded-2xl text-xs font-bold focus:outline-none transition-all"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Stipend / CTC</label>
                                <input
                                    type="text"
                                    placeholder="e.g. 25,000 / 12 LPA"
                                    className="w-full px-4 py-3 bg-muted/30 border-transparent border focus:border-primary/20 rounded-2xl text-xs font-bold focus:outline-none transition-all"
                                    value={formData.stipend}
                                    onChange={(e) => setFormData({ ...formData, stipend: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Min CGPA</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    className="w-full px-4 py-3 bg-muted/30 border-transparent border focus:border-primary/20 rounded-2xl text-xs font-bold focus:outline-none transition-all"
                                    value={formData.minCgpa}
                                    onChange={(e) => setFormData({ ...formData, minCgpa: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Deadline</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-3 bg-muted/30 border-transparent border focus:border-primary/20 rounded-2xl text-xs font-bold focus:outline-none transition-all"
                                    value={formData.deadline}
                                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Required Skills (Comma separated)</label>
                            <input
                                type="text"
                                placeholder="e.g. React, Tailwind, Next.js"
                                className="w-full px-4 py-3 bg-muted/30 border-transparent border focus:border-primary/20 rounded-2xl text-xs font-bold focus:outline-none transition-all"
                                value={formData.requiredSkills}
                                onChange={(e) => setFormData({ ...formData, requiredSkills: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Allowed Branches (Comma separated)</label>
                            <input
                                type="text"
                                placeholder="e.g. CS, IT, EC"
                                className="w-full px-4 py-3 bg-muted/30 border-transparent border focus:border-primary/20 rounded-2xl text-xs font-bold focus:outline-none transition-all"
                                value={formData.allowedBranches}
                                onChange={(e) => setFormData({ ...formData, allowedBranches: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Description</label>
                            <textarea
                                rows={4}
                                placeholder="Provide detailed role description..."
                                className="w-full px-4 py-3 bg-muted/30 border-transparent border focus:border-primary/20 rounded-[1.5rem] text-xs font-bold focus:outline-none transition-all"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={(e) => handleCreatePost(e, 'Draft')}
                                className="flex-1 py-4 bg-muted text-foreground font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-2"
                            >
                                <Save className="w-3.5 h-3.5" /> Save Draft
                            </button>
                            <button
                                onClick={(e) => handleCreatePost(e, 'Live')}
                                className="flex-1 py-4 bg-primary text-white font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
                            >
                                <Send className="w-3.5 h-3.5" /> Publish Now
                            </button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Applicants Sheet */}
            <Sheet open={!!selectedPostForApplicants} onOpenChange={() => setSelectedPostForApplicants(null)}>
                <SheetContent>
                    <RecruiterApplicants
                        postId={selectedPostForApplicants?.id}
                        postTitle={selectedPostForApplicants?.jobTitle}
                        onClose={() => setSelectedPostForApplicants(null)}
                    />
                </SheetContent>
            </Sheet>
        </div>
    );
}
