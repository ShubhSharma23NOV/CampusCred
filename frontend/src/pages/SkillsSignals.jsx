import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Progress, Badge } from "@/components/DesignSystem";
import { BarChart3, Database, Globe, Layers } from "lucide-react";

const signals = [
    { skill: "React / Frontend", weight: 85, freq: "High", context: "Used in 8 verified projects" },
    { skill: "Spring Boot / Backend", weight: 65, freq: "Medium", context: "Used in 4 verified projects" },
    { skill: "PostgreSQL", weight: 45, freq: "Low", context: "Used in 2 verified projects" },
    { skill: "System Design", weight: 70, freq: "Medium", context: "Used in 3 verified projects" },
];

export default function SkillsSignals() {
    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-500">
            <header className="space-y-2">
                <h1 className="text-3xl font-black tracking-tight">Skills & Signals</h1>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Experience-Derived Data</p>
            </header>

            <div className="grid gap-8">
                <div className="grid md:grid-cols-2 gap-6">
                    {signals.map((signal) => (
                        <Card key={signal.skill}>
                            <CardHeader className="pb-4">
                                <div className="flex justify-between items-center">
                                    <CardTitle className="text-sm font-black uppercase tracking-tight">{signal.skill}</CardTitle>
                                    <Badge variant="success" className="text-[8px]">{signal.freq} Frequency</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Progress value={signal.weight} className="h-2" />
                                <div className="flex justify-between items-end">
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{signal.context}</p>
                                    <span className="text-xs font-black text-primary">{signal.weight}% Strength</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Card className="bg-muted/30 border-dashed">
                    <CardHeader>
                        <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                            <BarChart3 className="w-4 h-4" /> Consistency Indicators
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.15em] leading-relaxed">
                            Signals are derived automatically from institutional records. Manual editing is disabled to preserve trust and placement value.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
