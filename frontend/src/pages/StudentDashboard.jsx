import { Card, CardContent, CardHeader, CardTitle, Badge, Progress } from "@/components/DesignSystem";
import { ShieldCheck, Zap, BarChart3, Clock, CheckCircle2, AlertCircle } from "lucide-react";

export default function StudentDashboard() {
    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-500">
            <header className="space-y-2">
                <h1 className="text-3xl font-black tracking-tight">Student Dashboard</h1>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Credibility Overview</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-primary" /> Verified Experience
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-black">12</div>
                        <p className="text-[10px] font-bold text-muted-foreground mt-1 uppercase tracking-wider">Confirmed by Institution</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                            <Zap className="w-4 h-4 text-amber-500" /> Active Projects
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-black">3</div>
                        <p className="text-[10px] font-bold text-muted-foreground mt-1 uppercase tracking-wider">Currently in-progress</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Reliability
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-black">98%</div>
                        <Progress value={98} className="h-1.5 mt-3" />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                            <BarChart3 className="w-4 h-4 text-indigo-500" /> Placement Value
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-black">High</div>
                        <p className="text-[10px] font-bold text-muted-foreground mt-1 uppercase tracking-wider">Top 5% of your cohort</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-black uppercase tracking-widest">Top Skills in Use</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider">React / Frontend</span>
                            <Badge variant="success">Heavy Usage</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider">System Design</span>
                            <Badge variant="success">Frequent</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider">PostgreSQL / DB</span>
                            <Badge variant="secondary">Emerging</Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-black uppercase tracking-widest">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex gap-4">
                            <div className="w-1 h-10 bg-primary rounded-full shrink-0" />
                            <div>
                                <p className="text-sm font-bold">Micro-Project Completed</p>
                                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Dec 27 • API Performance Audit</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-1 h-10 bg-emerald-500 rounded-full shrink-0" />
                            <div>
                                <p className="text-sm font-bold">Skill Verified</p>
                                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Dec 24 • Institutional Auth Flow</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
