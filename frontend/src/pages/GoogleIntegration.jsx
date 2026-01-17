import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/DesignSystem";
import { FileSpreadsheet, Users, BarChart3, Download, Eye, RefreshCw, CheckCircle, Clock, FileCheck } from "lucide-react";
import MockGoogleSheet from "@/components/MockGoogleSheet";

export default function GoogleIntegration() {
    const [showSheet, setShowSheet] = useState(false);
    const [stats, setStats] = useState({
        totalSubmissions: 0,
        pendingReview: 0,
        approved: 0
    });

    React.useEffect(() => {
        updateStats();
        // Auto-refresh stats every 30 seconds to catch new student submissions
        const interval = setInterval(updateStats, 30000);
        return () => clearInterval(interval);
    }, []);

    const updateStats = () => {
        const data = JSON.parse(localStorage.getItem('mockGoogleSheetData') || '[]');
        setStats({
            totalSubmissions: data.length,
            pendingReview: data.filter(item => item.status === 'pending').length,
            approved: data.filter(item => item.status === 'approved').length
        });
    };

    return (
        <div className="p-8 space-y-8">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black tracking-tight">Student Submissions Management</h1>
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Review & Manage Experience Data</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={updateStats}
                        className="px-4 py-2 bg-white border border-border hover:bg-muted/50 rounded-xl transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
                    >
                        <RefreshCw className="w-4 h-4" /> Refresh
                    </button>
                    <button
                        onClick={() => {
                            setShowSheet(true);
                            updateStats();
                        }}
                        className="px-6 py-3 bg-emerald-600 text-white font-black rounded-xl hover:bg-emerald-700 transition-all flex items-center gap-2 text-sm uppercase tracking-widest shadow-lg"
                    >
                        <Eye className="w-4 h-4" /> Open Management Sheet
                    </button>
                </div>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-blue-50 border-blue-200">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-black uppercase tracking-widest text-blue-600 flex items-center gap-2">
                            <Users className="w-4 h-4" /> Total Submissions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black text-blue-700">{stats.totalSubmissions}</div>
                        <p className="text-xs text-blue-600 font-medium mt-1">From student dashboard</p>
                    </CardContent>
                </Card>

                <Card className="bg-amber-50 border-amber-200">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-black uppercase tracking-widest text-amber-600 flex items-center gap-2">
                            <Clock className="w-4 h-4" /> Pending Review
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black text-amber-700">{stats.pendingReview}</div>
                        <p className="text-xs text-amber-600 font-medium mt-1">Awaiting verification</p>
                    </CardContent>
                </Card>

                <Card className="bg-emerald-50 border-emerald-200">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-black uppercase tracking-widest text-emerald-600 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" /> Approved
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black text-emerald-700">{stats.approved}</div>
                        <p className="text-xs text-emerald-600 font-medium mt-1">Verified experiences</p>
                    </CardContent>
                </Card>
            </div>

            {/* Management Interface */}
            <div className="grid grid-cols-1 gap-8">
                {/* Google Sheet Management Card */}
                <Card className="border-emerald-200 shadow-lg hover:shadow-xl transition-all">
                    <CardHeader className="bg-emerald-600 text-white rounded-t-lg">
                        <CardTitle className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                                <FileSpreadsheet className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">Student Experience Management Sheet</h3>
                                <p className="text-emerald-100 text-sm">Review, approve, and manage all student submissions</p>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                        <p className="text-sm text-gray-600 leading-relaxed">
                            View and manage all experience submissions from students. Filter by status, search by student name or company, 
                            approve or reject entries, and export data for institutional records.
                        </p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                Real-time student data
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                Filter and search tools
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                Approve/reject workflow
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                CSV export capability
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={() => {
                                    setShowSheet(true);
                                    updateStats();
                                }}
                                className="flex-1 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
                            >
                                <Eye className="w-4 h-4" /> Open Management Sheet
                            </button>
                            <button
                                onClick={updateStats}
                                className="px-6 py-3 bg-white border border-emerald-200 text-emerald-700 font-bold rounded-xl hover:bg-emerald-50 transition-all flex items-center gap-2"
                            >
                                <RefreshCw className="w-4 h-4" /> Refresh Data
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Workflow Overview */}
            <Card className="bg-gradient-to-r from-blue-50 to-emerald-50 border-none">
                <CardContent className="p-8">
                    <h3 className="text-xl font-bold mb-6 text-center">Student-to-Admin Workflow</h3>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                        <div className="flex flex-col items-center text-center space-y-2">
                            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                            <h4 className="font-bold text-sm">Student Submits</h4>
                            <p className="text-xs text-gray-600">Students log experiences via their dashboard</p>
                        </div>
                        <div className="hidden md:block w-8 h-0.5 bg-gray-300"></div>
                        <div className="flex flex-col items-center text-center space-y-2">
                            <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                            <h4 className="font-bold text-sm">Auto Collection</h4>
                            <p className="text-xs text-gray-600">Data appears instantly in admin management sheet</p>
                        </div>
                        <div className="hidden md:block w-8 h-0.5 bg-gray-300"></div>
                        <div className="flex flex-col items-center text-center space-y-2">
                            <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                            <h4 className="font-bold text-sm">Admin Reviews</h4>
                            <p className="text-xs text-gray-600">Approve, reject, and export verified data</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Mock Components */}
            <MockGoogleSheet 
                isOpen={showSheet} 
                onClose={() => setShowSheet(false)}
            />
        </div>
    );
}