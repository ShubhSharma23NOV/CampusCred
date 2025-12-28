import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Badge, Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/DesignSystem";
import { Plus, Clock, CheckCircle2 } from "lucide-react";

const opportunities = [
    { id: 1, title: "Database Migration Script", category: "Backend", complexity: "Medium", reward: "Verified Experience", status: "Available" },
    { id: 2, title: "Frontend Component Library", category: "UI/UX", complexity: "High", reward: "Reference Letter", status: "Assigned" },
    { id: 3, title: "Security Patch Research", category: "Security", complexity: "High", reward: "Industry Badge", status: "Available" },
];

export default function MicroProjects() {
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
                    {opportunities.filter(o => o.status === "Available").map((project) => (
                        <Card key={project.id} className="flex flex-col">
                            <CardHeader>
                                <div className="flex justify-between items-start mb-2">
                                    <Badge variant="secondary" className="text-[8px]">{project.category}</Badge>
                                    <Badge variant="outline" className="text-[8px]">{project.complexity}</Badge>
                                </div>
                                <CardTitle className="text-md font-black leading-tight">{project.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{project.reward}</p>
                                <button className="w-full py-3 bg-primary/5 hover:bg-primary text-primary hover:text-white border border-primary/20 transition-all rounded-xl text-[10px] font-black uppercase tracking-widest mt-4">
                                    APPLY FOR PROJECT
                                </button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
