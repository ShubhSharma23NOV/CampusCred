import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/DesignSystem";
import { FileSpreadsheet, Download, Filter, Search, RefreshCw, Eye, Trash2, CheckCircle, XCircle } from "lucide-react";

export default function MockGoogleSheet({ isOpen, onClose }) {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        if (isOpen) {
            loadData();
        }
    }, [isOpen]);

    useEffect(() => {
        filterData();
    }, [data, searchTerm, statusFilter]);

    const loadData = () => {
        const storedData = JSON.parse(localStorage.getItem('mockGoogleSheetData') || '[]');
        setData(storedData);
    };

    const filterData = () => {
        let filtered = data;
        
        if (searchTerm) {
            filtered = filtered.filter(item => 
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.role.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        if (statusFilter !== 'all') {
            filtered = filtered.filter(item => item.status === statusFilter);
        }
        
        setFilteredData(filtered);
    };

    const updateStatus = (id, newStatus) => {
        const updatedData = data.map(item => 
            item.id === id ? { ...item, status: newStatus } : item
        );
        setData(updatedData);
        localStorage.setItem('mockGoogleSheetData', JSON.stringify(updatedData));
    };

    const deleteEntry = (id) => {
        const updatedData = data.filter(item => item.id !== id);
        setData(updatedData);
        localStorage.setItem('mockGoogleSheetData', JSON.stringify(updatedData));
    };

    const exportToCSV = () => {
        const headers = ['Name', 'Email', 'Roll Number', 'Company', 'Role', 'Type', 'Start Date', 'End Date', 'Skills', 'Status', 'Submitted'];
        const csvContent = [
            headers.join(','),
            ...filteredData.map(item => [
                item.name,
                item.email,
                item.rollNumber,
                item.company,
                item.role,
                item.internshipType,
                item.startDate,
                item.endDate || 'Ongoing',
                item.skills,
                item.status,
                new Date(item.timestamp).toLocaleDateString()
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'internship_data.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="w-full max-w-7xl h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col">
                {/* Header */}
                <div className="bg-emerald-600 text-white rounded-t-3xl p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                            <FileSpreadsheet className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">Internship Tracking Sheet</h2>
                            <p className="text-emerald-100 text-sm">Live data from form submissions</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={exportToCSV}
                            className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl flex items-center gap-2 text-sm font-medium transition-all"
                        >
                            <Download className="w-4 h-4" /> Export CSV
                        </button>
                        <button
                            onClick={loadData}
                            className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-all"
                        >
                            <RefreshCw className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={onClose}
                            className="text-white/80 hover:text-white text-2xl font-bold"
                        >
                            ×
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="p-6 border-b border-gray-200 bg-gray-50">
                    <div className="flex flex-wrap gap-4 items-center">
                        <div className="flex items-center gap-2">
                            <Search className="w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search by name, company, or role..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Filter className="w-4 h-4 text-gray-500" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                        <div className="text-sm text-gray-600 ml-auto">
                            Showing {filteredData.length} of {data.length} entries
                        </div>
                    </div>
                </div>

                {/* Data Table */}
                <div className="flex-1 overflow-auto">
                    {filteredData.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            <div className="text-center">
                                <FileSpreadsheet className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                <p className="text-lg font-medium">No data available</p>
                                <p className="text-sm">Submit the form to see entries here</p>
                            </div>
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead className="bg-gray-100 sticky top-0">
                                <tr>
                                    <th className="text-left p-4 font-bold text-xs uppercase tracking-wider text-gray-600">Student</th>
                                    <th className="text-left p-4 font-bold text-xs uppercase tracking-wider text-gray-600">Company & Role</th>
                                    <th className="text-left p-4 font-bold text-xs uppercase tracking-wider text-gray-600">Type</th>
                                    <th className="text-left p-4 font-bold text-xs uppercase tracking-wider text-gray-600">Duration</th>
                                    <th className="text-left p-4 font-bold text-xs uppercase tracking-wider text-gray-600">Skills</th>
                                    <th className="text-left p-4 font-bold text-xs uppercase tracking-wider text-gray-600">Status</th>
                                    <th className="text-left p-4 font-bold text-xs uppercase tracking-wider text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredData.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="p-4">
                                            <div>
                                                <p className="font-bold text-sm">{item.name}</p>
                                                <p className="text-xs text-gray-500">{item.rollNumber}</p>
                                                <p className="text-xs text-gray-500">{item.email}</p>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div>
                                                <p className="font-bold text-sm">{item.company}</p>
                                                <p className="text-xs text-gray-600">{item.role}</p>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <Badge variant="outline" className="capitalize">
                                                {item.internshipType}
                                            </Badge>
                                        </td>
                                        <td className="p-4">
                                            <div className="text-xs">
                                                <p><strong>Start:</strong> {item.startDate}</p>
                                                <p><strong>End:</strong> {item.endDate || 'Ongoing'}</p>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <p className="text-xs text-gray-600">{item.skills || 'Not specified'}</p>
                                        </td>
                                        <td className="p-4">
                                            <Badge 
                                                variant={
                                                    item.status === 'approved' ? 'success' : 
                                                    item.status === 'rejected' ? 'destructive' : 'warning'
                                                }
                                                className="capitalize"
                                            >
                                                {item.status}
                                            </Badge>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => updateStatus(item.id, 'approved')}
                                                    className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"
                                                    title="Approve"
                                                >
                                                    <CheckCircle className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => updateStatus(item.id, 'rejected')}
                                                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                                                    title="Reject"
                                                >
                                                    <XCircle className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => deleteEntry(item.id)}
                                                    className="p-1 text-gray-600 hover:bg-gray-50 rounded"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-3xl">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                        <p>Data is automatically saved to browser storage</p>
                        <p>Last updated: {new Date().toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}