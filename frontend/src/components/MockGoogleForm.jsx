import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/DesignSystem";
import { Send, FileText, User, Mail, Phone, Building2, Calendar, CheckCircle2 } from "lucide-react";

export default function MockGoogleForm({ onSubmit, isOpen, onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        rollNumber: '',
        company: '',
        role: '',
        internshipType: 'internship',
        startDate: '',
        endDate: '',
        skills: '',
        description: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const submissionData = {
            ...formData,
            id: Date.now(),
            timestamp: new Date().toISOString(),
            status: 'pending'
        };
        
        // Save to localStorage (mock Google Sheets)
        const existingData = JSON.parse(localStorage.getItem('mockGoogleSheetData') || '[]');
        existingData.push(submissionData);
        localStorage.setItem('mockGoogleSheetData', JSON.stringify(existingData));
        
        setIsSubmitted(true);
        if (onSubmit) onSubmit(submissionData);
        
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
                name: '', email: '', phone: '', rollNumber: '', company: '', role: '',
                internshipType: 'internship', startDate: '', endDate: '', skills: '', description: ''
            });
            if (onClose) onClose();
        }, 2000);
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    if (!isOpen) return null;

    if (isSubmitted) {
        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <Card className="w-full max-w-md bg-white rounded-3xl shadow-2xl">
                    <CardContent className="p-8 text-center space-y-4">
                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                        </div>
                        <h3 className="text-xl font-black">Submission Recorded!</h3>
                        <p className="text-sm text-muted-foreground">Your response has been saved to the tracking sheet.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="w-full max-w-2xl my-8">
                <Card className="bg-white rounded-3xl shadow-2xl">
                    <CardHeader className="bg-blue-600 text-white rounded-t-3xl p-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl font-bold">Internship Experience Form</CardTitle>
                                    <p className="text-blue-100 text-sm mt-1">CampusCred Data Collection</p>
                                </div>
                            </div>
                            <button 
                                onClick={onClose}
                                className="text-white/80 hover:text-white text-2xl font-bold"
                            >
                                ×
                            </button>
                        </div>
                    </CardHeader>
                    
                    <CardContent className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                        <User className="w-4 h-4" /> Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => handleChange('name', e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                        <Mail className="w-4 h-4" /> Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => handleChange('email', e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="your.email@college.edu"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                        <Phone className="w-4 h-4" /> Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => handleChange('phone', e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="+91 98765 43210"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Roll Number *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.rollNumber}
                                        onChange={(e) => handleChange('rollNumber', e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="2021CS001"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                        <Building2 className="w-4 h-4" /> Company Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.company}
                                        onChange={(e) => handleChange('company', e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="TechCorp Inc."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Role/Position *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.role}
                                        onChange={(e) => handleChange('role', e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Software Developer Intern"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Experience Type *</label>
                                <div className="flex gap-4">
                                    {['internship', 'placement', 'project'].map(type => (
                                        <label key={type} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="internshipType"
                                                value={type}
                                                checked={formData.internshipType === type}
                                                onChange={(e) => handleChange('internshipType', e.target.value)}
                                                className="w-4 h-4 text-blue-600"
                                            />
                                            <span className="text-sm font-medium capitalize">{type}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                        <Calendar className="w-4 h-4" /> Start Date *
                                    </label>
                                    <input
                                        type="date"
                                        required
                                        value={formData.startDate}
                                        onChange={(e) => handleChange('startDate', e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                        <Calendar className="w-4 h-4" /> End Date
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.endDate}
                                        onChange={(e) => handleChange('endDate', e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Skills Used</label>
                                <input
                                    type="text"
                                    value={formData.skills}
                                    onChange={(e) => handleChange('skills', e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="React, Node.js, Python, etc."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => handleChange('description', e.target.value)}
                                    rows={4}
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                    placeholder="Brief description of your work and achievements..."
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-3 px-6 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                                >
                                    <Send className="w-4 h-4" /> Submit Response
                                </button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}