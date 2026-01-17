import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/DesignSystem";
import { TrendingUp, Link2, BarChart3, Award, Building2, Users, Target, Sparkles } from "lucide-react";
import { analyzeInternshipPlacementLink, analyzeSkillGaps } from "@/services/aiMatching";

// Mock student data
const mockStudents = [
    { id: 1, name: "Shubh S.", cgpa: 8.5, branch: "CS", skills: ["React", "Node.js"], internships: [{ company: "TechCorp", role: "Frontend Intern" }], placementStatus: "placed" },
    { id: 2, name: "Ananya R.", cgpa: 8.2, branch: "IT", skills: ["Java", "Spring"], internships: [{ company: "DataSys", role: "Backend Intern" }], placementStatus: "placed" },
    { id: 3, name: "Rohan M.", cgpa: 7.8, branch: "CS", skills: ["Figma", "React"], internships: [{ company: "DesignStudio", role: "UI Intern" }], placementStatus: "placed" },
    { id: 4, name: "Priya K.", cgpa: 9.1, branch: "CS", skills: ["Python", "ML"], internships: [{ company: "AI Labs", role: "ML Intern" }], placementStatus: "placed" },
    { id: 5, name: "Arjun S.", cgpa: 7.5, branch: "IT", skills: ["Docker", "AWS"], internships: [], placementStatus: "active" },
    { id: 6, name: "Neha P.", cgpa: 7.2, branch: "CS", skills: ["JavaScript"], internships: [], placementStatus: "active" },
    { id: 7, name: "Vikram T.", cgpa: 6.8, branch: "IT", skills: ["HTML", "CSS"], internships: [], placementStatus: "active" },
];

const mockJobRequirements = [
    { role: "Frontend Developer", requiredSkills: ["React", "JavaScript", "CSS"] },
    { role: "Backend Developer", requiredSkills: ["Node.js", "Python", "SQL"] },
    { role: "Full Stack", requiredSkills: ["React", "Node.js", "MongoDB"] },
    { role: "Data Scientist", requiredSkills: ["Python", "Machine Learning", "TensorFlow"] },
];

export default function InternshipPlacementAnalytics() {
    const [linkageData, setLinkageData] = useState(null);
    const [skillGapData, setSkillGapData] = useState(null);

    useEffect(() => {
        const linkage = analyzeInternshipPlacementLink(mockStudents);
        const gaps = analyzeSkillGaps(mockStudents, mockJobRequirements);
        setLinkageData(linkage);
        setSkillGapData(gaps);
    }, []);

    if (!linkageData || !skillGapData) return null;

    return (
        <div className="p-8 space-y-8">
            <header className="space-y-1">
                <h1 className="text-3xl font-black tracking-tight">Internship → Placement Analytics</h1>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">AI-Powered Linkage Analysis</p>
            </header>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="bg-emerald-50 border-emerald-200">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-black uppercase tracking-widest text-emerald-600 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" /> Conversion Rate
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black text-emerald-700">{linkageData.conversionRate}%</div>
                        <p className="text-xs text-emerald-600 font-medium mt-1">With internship experience</p>
                    </CardContent>
                </Card>

                <Card className="bg-amber-50 border-amber-200">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-black uppercase tracking-widest text-amber-600 flex items-center gap-2">
                            <Users className="w-4 h-4" /> Without Internship
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black text-amber-700">{linkageData.noInternshipRate}%</div>
                        <p className="text-xs text-amber-600 font-medium mt-1">Placement rate</p>
                    </CardContent>
                </Card>

                <Card className="bg-blue-50 border-blue-200">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-black uppercase tracking-widest text-blue-600 flex items-center gap-2">
                            <Target className="w-4 h-4" /> Advantage
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black text-blue-700">+{linkageData.advantage}%</div>
                        <p className="text-xs text-blue-600 font-medium mt-1">Internship benefit</p>
                    </CardContent>
                </Card>

                <Card className="bg-purple-50 border-purple-200">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-black uppercase tracking-widest text-purple-600 flex items-center gap-2">
                            <Building2 className="w-4 h-4" /> Companies
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black text-purple-700">{linkageData.companyConversion.length}</div>
                        <p className="text-xs text-purple-600 font-medium mt-1">Tracked for conversion</p>
                    </CardContent>
                </Card>
            </div>

            {/* AI Insights */}
            <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
                <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-purple-600 rounded-xl">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-purple-900 mb-2">AI-Generated Insights</h3>
                            <div className="space-y-2 text-sm text-purple-800">
                                <p>• Students with internship experience are <strong>{linkageData.advantage}% more likely</strong> to secure placements</p>
                                <p>• <strong>{linkageData.withInternship}</strong> students have completed internships, representing <strong>{Math.round((linkageData.withInternship / linkageData.totalStudents) * 100)}%</strong> of the cohort</p>
                                <p>• Top performing companies show <strong>75%+ conversion rates</strong> from internship to placement</p>
                                <p>• Recommendation: Encourage more students to pursue internships in their pre-final year</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Company-wise Conversion */}
                <Card>
                    <CardHeader className="border-b border-gray-100">
                        <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                            <Link2 className="w-4 h-4 text-emerald-600" /> Company-wise Conversion Rates
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="space-y-4">
                            {linkageData.companyConversion.slice(0, 5).map((company, idx) => (
                                <div key={idx} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Building2 className="w-4 h-4 text-gray-500" />
                                            <span className="font-bold text-sm">{company.company}</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="font-black text-emerald-600">{company.conversionRate}%</span>
                                            <p className="text-xs text-gray-500">{company.placed}/{company.total} placed</p>
                                        </div>
                                    </div>
                                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600"
                                            style={{ width: `${company.conversionRate}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Skill Gap Analysis */}
                <Card>
                    <CardHeader className="border-b border-gray-100">
                        <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                            <BarChart3 className="w-4 h-4 text-amber-600" /> Skill Gap Analysis
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="space-y-4">
                            {skillGapData.gaps.slice(0, 5).map((gap, idx) => (
                                <div key={idx} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-sm capitalize">{gap.skill}</span>
                                            <Badge 
                                                variant={gap.priority === 'high' ? 'destructive' : gap.priority === 'medium' ? 'warning' : 'secondary'}
                                                className="text-[8px]"
                                            >
                                                {gap.priority} priority
                                            </Badge>
                                        </div>
                                        <div className="text-right">
                                            <span className="font-black text-amber-600">{gap.coverage}%</span>
                                            <p className="text-xs text-gray-500">coverage</p>
                                        </div>
                                    </div>
                                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div 
                                            className={`h-full ${
                                                gap.priority === 'high' ? 'bg-gradient-to-r from-red-500 to-red-600' :
                                                gap.priority === 'medium' ? 'bg-gradient-to-r from-amber-500 to-amber-600' :
                                                'bg-gradient-to-r from-gray-400 to-gray-500'
                                            }`}
                                            style={{ width: `${gap.coverage}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Comparison Chart */}
            <Card>
                <CardHeader className="border-b border-gray-100">
                    <CardTitle className="text-sm font-black uppercase tracking-widest">Placement Success: With vs Without Internship</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                    <div className="grid grid-cols-2 gap-8">
                        <div className="text-center space-y-4">
                            <div className="w-32 h-32 mx-auto rounded-full bg-emerald-100 flex items-center justify-center border-8 border-emerald-200">
                                <div>
                                    <div className="text-4xl font-black text-emerald-700">{linkageData.conversionRate}%</div>
                                    <div className="text-xs font-bold text-emerald-600 uppercase">Placed</div>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">With Internship</h4>
                                <p className="text-sm text-gray-600">{linkageData.withInternship} students</p>
                            </div>
                        </div>
                        <div className="text-center space-y-4">
                            <div className="w-32 h-32 mx-auto rounded-full bg-gray-100 flex items-center justify-center border-8 border-gray-200">
                                <div>
                                    <div className="text-4xl font-black text-gray-700">{linkageData.noInternshipRate}%</div>
                                    <div className="text-xs font-bold text-gray-600 uppercase">Placed</div>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">Without Internship</h4>
                                <p className="text-sm text-gray-600">{linkageData.withoutInternship} students</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                    <CardTitle className="text-sm font-black uppercase tracking-widest text-blue-900 flex items-center gap-2">
                        <Award className="w-4 h-4" /> Strategic Recommendations
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white rounded-xl p-4 border border-blue-100">
                            <h5 className="font-bold text-sm text-blue-900 mb-2">For Students</h5>
                            <ul className="space-y-1 text-xs text-blue-700">
                                <li>• Pursue internships in pre-final year</li>
                                <li>• Focus on companies with high conversion rates</li>
                                <li>• Build skills in high-demand areas</li>
                            </ul>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-blue-100">
                            <h5 className="font-bold text-sm text-blue-900 mb-2">For Institution</h5>
                            <ul className="space-y-1 text-xs text-blue-700">
                                <li>• Strengthen industry partnerships</li>
                                <li>• Address skill gaps through training</li>
                                <li>• Track and promote successful pathways</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
