import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/DesignSystem";
import { Sparkles, TrendingUp, Target, Award, Brain, Zap } from "lucide-react";
import { calculateMatchScore } from "@/services/aiMatching";

export default function AIMatchingPanel({ candidate, jobRequirements }) {
    const [matchData, setMatchData] = useState(null);

    React.useEffect(() => {
        if (candidate && jobRequirements) {
            const result = calculateMatchScore(candidate, jobRequirements);
            setMatchData(result);
        }
    }, [candidate, jobRequirements]);

    if (!matchData) return null;

    const getScoreColor = (score) => {
        if (score >= 85) return "text-emerald-600 bg-emerald-50";
        if (score >= 70) return "text-blue-600 bg-blue-50";
        if (score >= 55) return "text-amber-600 bg-amber-50";
        return "text-gray-600 bg-gray-50";
    };

    const getMatchLevelColor = (level) => {
        const colors = {
            excellent: "bg-emerald-500",
            strong: "bg-blue-500",
            good: "bg-amber-500",
            fair: "bg-orange-500",
            weak: "bg-gray-500"
        };
        return colors[level] || "bg-gray-500";
    };

    return (
        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50">
            <CardHeader className="border-b border-purple-100">
                <CardTitle className="flex items-center gap-2 text-purple-900">
                    <div className="p-2 bg-purple-600 rounded-lg">
                        <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold">AI Match Analysis</h3>
                        <p className="text-xs text-purple-600 font-medium">Powered by Gemini AI</p>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
                {/* Overall Score */}
                <div className="text-center space-y-2">
                    <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${getScoreColor(matchData.totalScore)} border-4 border-white shadow-lg`}>
                        <div>
                            <div className="text-3xl font-black">{matchData.totalScore}</div>
                            <div className="text-[10px] font-bold uppercase tracking-wider">Match</div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${getMatchLevelColor(matchData.matchLevel)} animate-pulse`}></div>
                        <p className="text-sm font-bold text-gray-700">{matchData.recommendation}</p>
                    </div>
                </div>

                {/* Score Breakdown */}
                <div className="space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-widest text-gray-600 flex items-center gap-2">
                        <Target className="w-3.5 h-3.5" /> Score Breakdown
                    </h4>
                    
                    {/* Skills */}
                    <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-gray-700">Skills Match (40%)</span>
                            <span className="font-black text-purple-600">{matchData.breakdown.skills}/100</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-500"
                                style={{ width: `${matchData.breakdown.skills}%` }}
                            />
                        </div>
                    </div>

                    {/* Academic */}
                    <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-gray-700">Academic Fit (20%)</span>
                            <span className="font-black text-blue-600">{matchData.breakdown.academic}/100</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                                style={{ width: `${matchData.breakdown.academic}%` }}
                            />
                        </div>
                    </div>

                    {/* Experience */}
                    <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-gray-700">Experience Relevance (25%)</span>
                            <span className="font-black text-emerald-600">{matchData.breakdown.experience}/100</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-500"
                                style={{ width: `${matchData.breakdown.experience}%` }}
                            />
                        </div>
                    </div>

                    {/* Credibility */}
                    <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-gray-700">Credibility Score (15%)</span>
                            <span className="font-black text-amber-600">{matchData.breakdown.credibility}/100</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-500"
                                style={{ width: `${matchData.breakdown.credibility}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* AI Insights */}
                <div className="bg-white rounded-xl p-4 border border-purple-100">
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <Sparkles className="w-4 h-4 text-purple-600" />
                        </div>
                        <div className="flex-1">
                            <h5 className="text-xs font-black uppercase tracking-wider text-purple-900 mb-2">AI Insights</h5>
                            <ul className="space-y-1 text-xs text-gray-600">
                                {matchData.breakdown.skills >= 80 && (
                                    <li className="flex items-center gap-2">
                                        <Zap className="w-3 h-3 text-emerald-500" />
                                        <span>Strong technical skill alignment</span>
                                    </li>
                                )}
                                {matchData.breakdown.experience >= 70 && (
                                    <li className="flex items-center gap-2">
                                        <TrendingUp className="w-3 h-3 text-blue-500" />
                                        <span>Relevant prior experience detected</span>
                                    </li>
                                )}
                                {matchData.breakdown.credibility >= 90 && (
                                    <li className="flex items-center gap-2">
                                        <Award className="w-3 h-3 text-amber-500" />
                                        <span>Highly verified profile</span>
                                    </li>
                                )}
                                {matchData.totalScore >= 85 && (
                                    <li className="flex items-center gap-2">
                                        <Target className="w-3 h-3 text-purple-500" />
                                        <span>Top candidate for this role</span>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
