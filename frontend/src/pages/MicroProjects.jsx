import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Badge, Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/DesignSystem";
import { Plus, Clock, CheckCircle2, Briefcase, MapPin, Building2, ExternalLink } from "lucide-react";
import { recruiterPostsService, POST_STATUS } from "@/services/recruiterPostsService";

const opportunities = [
    { id: 1, title: "Database Migration Script", category: "Backend", complexity: "Medium", reward: "Verified Experience", status: "Available" },
    { id: 2, title: "Frontend Component Library", category: "UI/UX", complexity: "High", reward: "Reference Letter", status: "Assigned" },
    { id: 3, title: "Security Patch Research", category: "Security", complexity: "High", reward: "Industry Badge", status: "Available" },
];

export default function MicroProjects() {
    const [recruiterPosts, setRecruiterPosts] = React.useState([]);

    React.useEffect(() => {
        const posts = recruiterPostsService.listPosts();
        setRecruiterPosts(posts.filter(p => p.status === POST_STATUS.APPROVED));
    }, []);
    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-500">
            <header className="space-y-2">
                <h1 className="text-3xl font-black tracking-tight">Micro-Projects</h1>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Available Opportunities</p>
            </header>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-black uppercase tracking-widest">Your Active Work</CardTitle>
                    </CardHeader>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>PROJECT NAME</TableHead>
                                <TableHead>STATUS</TableHead>
                                <TableHead className="text-right">ACTION</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-bold">Institutional Auth Flow</TableCell>
                                <TableCell><Badge variant="warning">In Progress</Badge></TableCell>
                                <TableCell className="text-right">
                                    <button className="text-[10px] font-black text-primary uppercase">View Details</button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Card>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Native Micro-Projects */}
                    {opportunities.filter(o => o.status === "Available").map((project) => (
                        <Card key={project.id} className="flex flex-col border-slate-200/60 shadow-none hover:border-primary/30 transition-all">
                            <CardHeader>
                                <div className="flex justify-between items-start mb-2">
                                    <Badge variant="secondary" className="text-[8px] uppercase tracking-widest">{project.category}</Badge>
                                    <Badge variant="outline" className="text-[8px] uppercase tracking-widest font-black">{project.complexity}</Badge>
                                </div>
                                <CardTitle className="text-md font-black leading-tight">{project.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 flex-1 flex flex-col justify-between pt-0">
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.15em]">{project.reward}</p>
                                <button className="w-full py-3 bg-slate-50 hover:bg-primary text-slate-600 hover:text-white border border-slate-200 hover:border-primary transition-all rounded-xl text-[10px] font-black uppercase tracking-widest mt-4">
                                    APPLY FOR PROJECT
                                </button>
                            </CardContent>
                        </Card>
                    ))}

                    {/* Approved Recruiter Posts */}
                    {recruiterPosts.map((post) => (
                        <Card key={post.id} className="flex flex-col border-primary/10 bg-gradient-to-br from-white to-primary/[0.02] shadow-sm hover:border-primary/40 transition-all">
                            <CardHeader>
                                <div className="flex justify-between items-start mb-2">
                                    <Badge variant="success" className="bg-primary/10 text-primary hover:bg-primary/10 border-none text-[8px] uppercase tracking-widest flex items-center gap-1">
                                        <Briefcase className="w-2 h-2" /> {post.type}
                                    </Badge>
                                    <Badge variant="outline" className="text-[8px] uppercase tracking-widest font-black border-primary/20 text-primary">{post.location}</Badge>
                                </div>
                                <CardTitle className="text-md font-black leading-tight text-slate-900">{post.jobTitle}</CardTitle>
                                <div className="flex items-center gap-1.5 mt-1">
                                    <Building2 className="w-3 h-3 text-slate-400" />
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{post.companyName}</span>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4 flex-1 flex flex-col justify-between pt-0">
                                <div>
                                    <p className="text-[11px] font-black text-emerald-600 uppercase tracking-wider mb-2">{post.stipend}</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {post.requiredSkills?.slice(0, 3).map(s => (
                                            <span key={s} className="px-2 py-0.5 bg-slate-100 rounded text-[8px] font-bold text-slate-600 uppercase">{s}</span>
                                        ))}
                                    </div>
                                </div>
                                <button className="w-full py-3 bg-primary text-white shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all rounded-xl text-[10px] font-black uppercase tracking-widest mt-4 flex items-center justify-center gap-2">
                                    Apply Now <ExternalLink className="w-3 h-3" />
                                </button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
