import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Badge, Table, TableHeader, TableRow, TableHead, TableBody, TableCell, Dialog, DialogContent, DialogHeader, DialogTitle, Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/DesignSystem";
import { Plus, Building2, UserPlus, Globe, Mail, Phone, Search, Filter, Shield, MoreVertical, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { adminRecruiterService } from "@/services/adminRecruiterService";

export default function AdminRecruiters() {
    const [companies, setCompanies] = useState([]);
    const [recruiters, setRecruiters] = useState([]);
    const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
    const [isRecruiterModalOpen, setIsRecruiterModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // Form states
    const [companyData, setCompanyData] = useState({
        name: '',
        industry: 'IT',
        website: '',
        hrName: '',
        hrEmail: '',
        hrPhone: '',
    });

    const [recruiterData, setRecruiterData] = useState({
        name: '',
        email: '',
        companyName: '',
        designation: '',
        accessLevel: 'Full',
    });

    useEffect(() => {
        adminRecruiterService.seedDemoData();
        refreshData();
    }, []);

    const refreshData = () => {
        setCompanies(adminRecruiterService.listCompanies());
        setRecruiters(adminRecruiterService.listRecruiters());
    };

    const handleRegisterCompany = (e) => {
        e.preventDefault();
        adminRecruiterService.registerCompany(companyData);
        refreshData();
        setIsCompanyModalOpen(false);
        setCompanyData({ name: '', industry: 'IT', website: '', hrName: '', hrEmail: '', hrPhone: '' });
    };

    const handleRegisterRecruiter = (e) => {
        e.preventDefault();
        adminRecruiterService.registerRecruiter(recruiterData);
        refreshData();
        setIsRecruiterModalOpen(false);
        setRecruiterData({ name: '', email: '', companyName: '', designation: '', accessLevel: 'Full' });
    };

    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-500">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-black tracking-tight text-slate-900">Recruiter & Company Registry</h1>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Onboard recruiters, assign access, and manage organizations</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <button
                        onClick={() => setIsCompanyModalOpen(true)}
                        className="flex-1 md:flex-none px-6 py-3.5 bg-white border border-slate-200 text-slate-900 font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                    >
                        <Building2 className="w-4 h-4" /> + Register Company
                    </button>
                    <button
                        onClick={() => setIsRecruiterModalOpen(true)}
                        className="flex-1 md:flex-none px-6 py-3.5 bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-xl shadow-slate-200 hover:bg-slate-800 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                    >
                        <UserPlus className="w-4 h-4" /> + Register Recruiter
                    </button>
                </div>
            </header>

            <Tabs defaultValue="companies" className="w-full">
                <TabsList className="bg-slate-100/50 p-1 mb-6 rounded-2xl border border-slate-200/50">
                    <TabsTrigger value="companies">Companies</TabsTrigger>
                    <TabsTrigger value="recruiters">Recruiters</TabsTrigger>
                </TabsList>

                <div className="bg-white/40 backdrop-blur-md p-2 rounded-[2rem] border border-white/50 shadow-sm mb-6 flex items-center">
                    <Search className="ml-4 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search registry..."
                        className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-bold py-4 px-4"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <TabsContent value="companies">
                    <Card className="rounded-[2.5rem] border-slate-200 shadow-none overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-slate-50 hover:bg-slate-50 border-b border-slate-200">
                                    <TableHead className="py-6 px-8">Company Name</TableHead>
                                    <TableHead>Industry</TableHead>
                                    <TableHead>HR Contact</TableHead>
                                    <TableHead>Recruiters</TableHead>
                                    <TableHead className="text-right px-8">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {companies.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())).map((company) => (
                                    <TableRow key={company.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                                        <TableCell className="py-6 px-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                                                    <Building2 className="w-5 h-5" />
                                                </div>
                                                <div className="space-y-0.5">
                                                    <div className="font-black text-sm text-slate-900">{company.name}</div>
                                                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase">
                                                        <Globe className="w-3 h-3" /> {company.website || 'No website'}
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="bg-white text-slate-600 border-slate-200 font-black">{company.industry}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-0.5">
                                                <div className="text-xs font-bold text-slate-900">{company.hrName}</div>
                                                <div className="text-[10px] font-medium text-slate-500">{company.hrEmail}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-none font-black">{company.recruitersCount || 0} Registered</Badge>
                                        </TableCell>
                                        <TableCell className="text-right px-8">
                                            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                                <MoreVertical className="w-4 h-4 text-slate-400" />
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </TabsContent>

                <TabsContent value="recruiters">
                    <Card className="rounded-[2.5rem] border-slate-200 shadow-none overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-slate-50 hover:bg-slate-50 border-b border-slate-200">
                                    <TableHead className="py-6 px-8">Recruiter</TableHead>
                                    <TableHead>Company</TableHead>
                                    <TableHead>Access Level</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right px-8">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recruiters.filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase())).map((recruiter) => (
                                    <TableRow key={recruiter.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                                        <TableCell className="py-6 px-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 font-black text-xs">
                                                    {recruiter.name.charAt(0)}
                                                </div>
                                                <div className="space-y-0.5">
                                                    <div className="font-black text-sm text-slate-900">{recruiter.name}</div>
                                                    <div className="text-[10px] font-bold text-slate-500 uppercase">{recruiter.designation}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 font-bold text-xs text-slate-700">
                                                <Building2 className="w-3.5 h-3.5 text-slate-400" /> {recruiter.companyName}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 text-emerald-700 rounded-md w-fit">
                                                <Shield className="w-3 h-3" />
                                                <span className="text-[10px] font-black uppercase">{recruiter.accessLevel} Access</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="success" className="bg-emerald-500/10 text-emerald-600 border-none">Active</Badge>
                                        </TableCell>
                                        <TableCell className="text-right px-8">
                                            <button className="px-3 py-1.5 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest rounded-lg hover:bg-slate-800 transition-all">
                                                Credentials
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Company Modal */}
            <Dialog open={isCompanyModalOpen} onOpenChange={setIsCompanyModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Register New Company</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleRegisterCompany} className="space-y-6 mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Company Name</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full px-4 py-3 bg-slate-50 border-transparent border focus:border-slate-200 rounded-2xl text-xs font-bold focus:outline-none transition-all"
                                    value={companyData.name}
                                    onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Industry Type</label>
                                <select
                                    className="w-full px-4 py-3 bg-slate-50 border-transparent border focus:border-slate-200 rounded-2xl text-xs font-bold focus:outline-none transition-all"
                                    value={companyData.industry}
                                    onChange={(e) => setCompanyData({ ...companyData, industry: e.target.value })}
                                >
                                    <option>IT</option>
                                    <option>Finance</option>
                                    <option>Healthcare</option>
                                    <option>Manufacturing</option>
                                    <option>Others</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Website</label>
                                <input
                                    type="url"
                                    className="w-full px-4 py-3 bg-slate-50 border-transparent border focus:border-slate-200 rounded-2xl text-xs font-bold focus:outline-none transition-all"
                                    value={companyData.website}
                                    onChange={(e) => setCompanyData({ ...companyData, website: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">HR Contact Name</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full px-4 py-3 bg-slate-50 border-transparent border focus:border-slate-200 rounded-2xl text-xs font-bold focus:outline-none transition-all"
                                    value={companyData.hrName}
                                    onChange={(e) => setCompanyData({ ...companyData, hrName: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">HR Email</label>
                                <input
                                    required
                                    type="email"
                                    className="w-full px-4 py-3 bg-slate-50 border-transparent border focus:border-slate-200 rounded-2xl text-xs font-bold focus:outline-none transition-all"
                                    value={companyData.hrEmail}
                                    onChange={(e) => setCompanyData({ ...companyData, hrEmail: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">HR Phone</label>
                                <input
                                    type="tel"
                                    className="w-full px-4 py-3 bg-slate-50 border-transparent border focus:border-slate-200 rounded-2xl text-xs font-bold focus:outline-none transition-all"
                                    value={companyData.hrPhone}
                                    onChange={(e) => setCompanyData({ ...companyData, hrPhone: e.target.value })}
                                />
                            </div>
                        </div>
                        <button type="submit" className="w-full py-4 bg-slate-900 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-slate-800 transition-all">
                            Complete Registration
                        </button>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Recruiter Modal */}
            <Dialog open={isRecruiterModalOpen} onOpenChange={setIsRecruiterModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Onboard New Recruiter</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleRegisterRecruiter} className="space-y-6 mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full px-4 py-3 bg-slate-50 border-transparent border focus:border-slate-200 rounded-2xl text-xs font-bold focus:outline-none transition-all"
                                    value={recruiterData.name}
                                    onChange={(e) => setRecruiterData({ ...recruiterData, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Business Email</label>
                                <input
                                    required
                                    type="email"
                                    className="w-full px-4 py-3 bg-slate-50 border-transparent border focus:border-slate-200 rounded-2xl text-xs font-bold focus:outline-none transition-all"
                                    value={recruiterData.email}
                                    onChange={(e) => setRecruiterData({ ...recruiterData, email: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Assign Company</label>
                                <select
                                    required
                                    className="w-full px-4 py-3 bg-slate-50 border-transparent border focus:border-slate-200 rounded-2xl text-xs font-bold focus:outline-none transition-all"
                                    value={recruiterData.companyName}
                                    onChange={(e) => setRecruiterData({ ...recruiterData, companyName: e.target.value })}
                                >
                                    <option value="">Select Company...</option>
                                    {companies.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Designation</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 bg-slate-50 border-transparent border focus:border-slate-200 rounded-2xl text-xs font-bold focus:outline-none transition-all"
                                    value={recruiterData.designation}
                                    onChange={(e) => setRecruiterData({ ...recruiterData, designation: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Access Level</label>
                                <div className="flex gap-4">
                                    {['Full', 'Limited', 'View-only'].map(level => (
                                        <button
                                            key={level}
                                            type="button"
                                            onClick={() => setRecruiterData({ ...recruiterData, accessLevel: level })}
                                            className={cn(
                                                "flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all",
                                                recruiterData.accessLevel === level ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                                            )}
                                        >
                                            {level}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="w-full py-4 bg-slate-900 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-slate-800 transition-all">
                            Generate Account & Send Invite
                        </button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
