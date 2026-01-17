import React from 'react';
import { GraduationCap, Briefcase, Building2, ArrowRight, BookOpen, Users, Trophy } from "lucide-react";
import logo from '../assets/logo.png';
import collegeBg from '../assets/college_bg.png';

export default function LoginPage({ onLogin, onSwitchToRegister }) {
    const placedStudents = [
        { name: "Priya Singh", company: "Google", package: "45 LPA", role: "SDE-1" },
        { name: "Rahul Verma", company: "Amazon", package: "32 LPA", role: "SDE" },
        { name: "Amit Patel", company: "Goldman Sachs", package: "28 LPA", role: "Analyst" },
        { name: "Sneha Gupta", company: "Microsoft", package: "42 LPA", role: "SWE" },
        { name: "Vikram Malhotra", company: "Adobe", package: "38 LPA", role: "Product Intern" },
        { name: "Anjali Deshmukh", company: "Oracle", package: "22 LPA", role: "Server Eng." },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-background font-sans selection:bg-primary/20">

            {/* HERO SECTION (Login + Branding) */}
            <div className="h-screen flex flex-col bg-background overflow-hidden relative">
                {/* Top Half - Image & Branding (50%) */}
                <div className="relative w-full h-[50vh] flex-shrink-0">
                    <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10"></div>
                    <img
                        src={collegeBg}
                        alt="College Campus"
                        className="w-full h-full object-cover"
                    />
                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 z-20 flex flex-col justify-center items-center text-center p-8">
                        <div className="animate-in fade-in zoom-in duration-700 space-y-4">
                            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/20 p-1.5 shadow-2xl">
                                <img src={logo} alt="Logo" className="w-full h-full object-cover rounded-full" />
                            </div>
                            <div>
                                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none drop-shadow-xl">
                                    CAMPUSCRED
                                </h1>
                                <div className="mt-3 space-y-1">
                                    <p className="text-lg md:text-xl text-white/95 font-bold tracking-wide drop-shadow-md">
                                        Institute Of Engineering and Technology
                                    </p>
                                    <p className="text-lg md:text-xl text-white/90 font-bold tracking-wide drop-shadow-md font-hindi">
                                        देवी अहिल्या विश्वविद्यालय
                                    </p>
                                </div>
                                <div className="w-16 h-1.5 bg-primary mx-auto rounded-full mt-4 shadow-lg shadow-primary/50"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Half - Login Options (50%) */}
                <div className="flex-1 bg-white relative z-30 -mt-8 rounded-t-[2.5rem] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center p-6 md:p-12">
                    <div className="w-full max-w-md space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">

                        <div className="text-center space-y-1 mb-2">
                            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Welcome Back</h2>
                            <p className="text-sm font-medium text-gray-500">Please select your role to continue</p>
                        </div>

                        <div className="space-y-3">
                            {/* Student Login */}
                            <button
                                onClick={() => onLogin('student')}
                                className="w-full group flex items-center p-4 bg-white border border-gray-200 rounded-2xl hover:border-primary hover:bg-primary/5 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5 transition-all duration-300"
                            >
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                    <GraduationCap className="w-6 h-6" />
                                </div>
                                <div className="ml-4 text-left flex-1">
                                    <h3 className="text-base font-bold text-gray-900">Student Login</h3>
                                    <p className="text-xs text-gray-500 font-medium">Access profile & opportunities</p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                            </button>

                            {/* Recruiter Login */}
                            <button
                                onClick={() => onLogin('recruiter')}
                                className="w-full group flex items-center p-4 bg-white border border-gray-200 rounded-2xl hover:border-indigo-600 hover:bg-indigo-50 hover:shadow-lg hover:shadow-indigo-600/10 hover:-translate-y-0.5 transition-all duration-300"
                            >
                                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                                    <Briefcase className="w-6 h-6" />
                                </div>
                                <div className="ml-4 text-left flex-1">
                                    <h3 className="text-base font-bold text-gray-900">Recruiter Login</h3>
                                    <p className="text-xs text-gray-500 font-medium">Post jobs & hire talent</p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                            </button>

                            {/* Admin Login */}
                            <button
                                onClick={() => onLogin('admin')}
                                className="w-full group flex items-center p-4 bg-white border border-gray-200 rounded-2xl hover:border-emerald-600 hover:bg-emerald-50 hover:shadow-lg hover:shadow-emerald-600/10 hover:-translate-y-0.5 transition-all duration-300"
                            >
                                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                                    <Building2 className="w-6 h-6" />
                                </div>
                                <div className="ml-4 text-left flex-1">
                                    <h3 className="text-base font-bold text-gray-900">Admin Portal</h3>
                                    <p className="text-xs text-gray-500 font-medium">Manage campus data</p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                            </button>
                        </div>

                        <div className="pt-4 flex items-center justify-between text-xs font-bold text-gray-500 border-t border-gray-100 mt-4">
                            <button onClick={onSwitchToRegister} className="text-primary hover:underline uppercase tracking-wider text-xs">
                                Create Account
                            </button>
                            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-xs uppercase tracking-wider">
                                Forgot Password?
                            </a>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center animate-bounce z-40">
                    <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center p-1">
                        <div className="w-1 h-2 bg-gray-400 rounded-full animate-scroll"></div>
                    </div>
                </div>
            </div>

            {/* MARQUEE SECTION */}
            <div className="bg-primary text-white py-4 overflow-hidden relative">
                <div className="whitespace-nowrap animate-marquee flex gap-8 items-center">
                    {[...Array(5)].map((_, i) => (
                        <React.Fragment key={i}>
                            <span className="text-lg font-bold uppercase tracking-wider">About IET DAVV:</span>
                            <span className="text-white/80">Institute of Engineering & Technology, Devi Ahilya Vishwavidyalaya is a leading engineering college in Central India established in 1996.</span>
                            <span className="w-2 h-2 rounded-full bg-white/50"></span>
                            <span className="text-lg font-bold uppercase tracking-wider">Latest News:</span>
                            <span className="text-white/80">Placement Season 2024-25 has begun! Top recruiters visiting campus next week.</span>
                            <span className="w-2 h-2 rounded-full bg-white/50"></span>
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* ABOUT IET DAVV SECTION */}
            <div className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl font-black text-gray-900 mb-4">About IET DAVV</h2>
                            <div className="w-20 h-1.5 bg-primary rounded-full"></div>
                        </div>

                        <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                            <p>
                                Among the elite technology institutes of the country, <span className="font-bold text-gray-900">IET DAVV Indore</span> embodies technology, research, and development in the purest form. Our institute boasts of a unique hands-on curriculum and students who epitomize all-around proficiency in technical and professional matters.
                            </p>
                            <p>
                                The <span className="font-bold text-gray-900">Centralized Placement Cell (CPC)</span> was formally established in 2021 to prepare students and make them industry-ready through intensive and innovative training methodologies. We aim for a unified and streamlined placement process to train students and upgrade their skills.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-3 gap-6 pt-4">
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <BookOpen className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-gray-900 text-sm mb-1">Industry-Ready Training</h3>
                                <p className="text-xs text-gray-500">Comprehensive skill development</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Users className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-gray-900 text-sm mb-1">Top Recruiters</h3>
                                <p className="text-xs text-gray-500">Partnerships with leading companies</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Trophy className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-gray-900 text-sm mb-1">100% Support</h3>
                                <p className="text-xs text-gray-500">Dedicated guidance for every student</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-indigo-500/20 rounded-[2rem] blur-xl -z-10"></div>
                        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                            <img
                                src={collegeBg}
                                alt="Students in Classroom"
                                className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                                <p className="text-white font-bold text-xl">Excellence in Education</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* SUCCESS STORIES SECTION */}
            <div className="py-20 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Successful Placements</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Our students are making their mark in top global companies. Here are some of our recent success stories.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {placedStudents.map((student, index) => (
                            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-indigo-100 flex items-center justify-center text-2xl font-black text-primary group-hover:scale-110 transition-transform">
                                        {student.name[0]}
                                    </div>
                                    <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase rounded-full tracking-wider">
                                        Placed
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{student.name}</h3>
                                <p className="text-sm font-medium text-gray-500 mb-4">{student.role}</p>

                                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Company</p>
                                        <p className="text-base font-bold text-indigo-600">{student.company}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Package</p>
                                        <p className="text-xl font-black text-gray-900">{student.package}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="bg-gray-900 text-white py-12 px-6">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-sm">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-white/10 p-1">
                                <img src={logo} alt="Logo" className="w-full h-full object-cover rounded-full" />
                            </div>
                            <span className="font-bold text-lg">CAMPUSCRED</span>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            The official placement and internship portal for IET DAVV. Connecting talent with opportunity.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-4">Contact Us</h4>
                        <p className="text-gray-400">Khandwa Road, Indore - 452017 (M.P.)</p>
                        <p className="text-gray-400 mt-2">Email: placement@ietdavv.edu.in</p>
                        <p className="text-gray-400">Phone: +91-731-2361116</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">About IET</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Placement Statistics</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Recruiter Guidelines</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Student Policy</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs uppercase tracking-widest">
                    © 2024 Institute of Engineering and Technology, Devi Ahilya Vishwavidyalaya. All rights reserved.
                </div>
            </footer>

            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
                @keyframes scroll {
                    0% { transform: translateY(0); opacity: 1; }
                    100% { transform: translateY(10px); opacity: 0; }
                }
                .animate-scroll {
                    animation: scroll 1.5s infinite;
                }
            `}</style>
        </div>
    );
}
