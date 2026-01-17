import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/DesignSystem";
import { Filter, X, Search } from "lucide-react";

export default function EligibilityFilter({ onFilterChange, onClose }) {
    const [filters, setFilters] = useState({
        minCGPA: '',
        branches: [],
        requiredSkills: [],
        experienceType: '',
        requiresInternship: false
    });

    const [skillInput, setSkillInput] = useState('');

    const branchOptions = [
        'Computer Science',
        'Information Technology',
        'Electronics',
        'Mechanical',
        'Civil',
        'Electrical'
    ];

    const handleBranchToggle = (branch) => {
        setFilters(prev => ({
            ...prev,
            branches: prev.branches.includes(branch)
                ? prev.branches.filter(b => b !== branch)
                : [...prev.branches, branch]
        }));
    };

    const handleAddSkill = () => {
        if (skillInput.trim() && !filters.requiredSkills.includes(skillInput.trim())) {
            setFilters(prev => ({
                ...prev,
                requiredSkills: [...prev.requiredSkills, skillInput.trim()]
            }));
            setSkillInput('');
        }
    };

    const handleRemoveSkill = (skill) => {
        setFilters(prev => ({
            ...prev,
            requiredSkills: prev.requiredSkills.filter(s => s !== skill)
        }));
    };

    const handleApply = () => {
        onFilterChange(filters);
        if (onClose) onClose();
    };

    const handleReset = () => {
        const resetFilters = {
            minCGPA: '',
            branches: [],
            requiredSkills: [],
            experienceType: '',
            requiresInternship: false
        };
        setFilters(resetFilters);
        onFilterChange(resetFilters);
    };

    return (
        <Card className="border-blue-200">
            <CardHeader className="bg-blue-50 border-b border-blue-100">
                <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Filter className="w-5 h-5 text-blue-600" />
                        <span className="text-lg font-bold text-blue-900">Automatic Eligibility Filter</span>
                    </div>
                    {onClose && (
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </CardTitle>
                <p className="text-xs text-blue-600 mt-1">AI-powered candidate filtering</p>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
                {/* CGPA Filter */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Minimum CGPA</label>
                    <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        value={filters.minCGPA}
                        onChange={(e) => setFilters(prev => ({ ...prev, minCGPA: e.target.value }))}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., 7.5"
                    />
                </div>

                {/* Branch Filter */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Preferred Branches</label>
                    <div className="grid grid-cols-2 gap-2">
                        {branchOptions.map(branch => (
                            <button
                                key={branch}
                                onClick={() => handleBranchToggle(branch)}
                                className={`p-2 text-xs font-medium rounded-lg border-2 transition-all ${
                                    filters.branches.includes(branch)
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                                }`}
                            >
                                {branch}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Skills Filter */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Required Skills</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={skillInput}
                            onChange={(e) => setSkillInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                            className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="e.g., React, Python"
                        />
                        <button
                            onClick={handleAddSkill}
                            className="px-4 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all"
                        >
                            Add
                        </button>
                    </div>
                    {filters.requiredSkills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                            {filters.requiredSkills.map(skill => (
                                <span
                                    key={skill}
                                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                                >
                                    {skill}
                                    <button
                                        onClick={() => handleRemoveSkill(skill)}
                                        className="hover:text-blue-900"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Experience Type */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Experience Type</label>
                    <select
                        value={filters.experienceType}
                        onChange={(e) => setFilters(prev => ({ ...prev, experienceType: e.target.value }))}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">Any Experience</option>
                        <option value="internship">Internship</option>
                        <option value="project">Project</option>
                        <option value="fulltime">Full-time</option>
                    </select>
                </div>

                {/* Internship Requirement */}
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        id="requiresInternship"
                        checked={filters.requiresInternship}
                        onChange={(e) => setFilters(prev => ({ ...prev, requiresInternship: e.target.checked }))}
                        className="w-5 h-5 text-blue-600 rounded"
                    />
                    <label htmlFor="requiresInternship" className="text-sm font-bold text-gray-700">
                        Requires Prior Internship Experience
                    </label>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <button
                        onClick={handleReset}
                        className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all"
                    >
                        Reset
                    </button>
                    <button
                        onClick={handleApply}
                        className="flex-1 py-3 px-6 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all"
                    >
                        Apply Filters
                    </button>
                </div>

                {/* Active Filters Summary */}
                {(filters.minCGPA || filters.branches.length > 0 || filters.requiredSkills.length > 0) && (
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                        <p className="text-xs font-black uppercase tracking-wider text-blue-900 mb-2">Active Filters</p>
                        <div className="space-y-1 text-xs text-blue-700">
                            {filters.minCGPA && <p>• Minimum CGPA: {filters.minCGPA}</p>}
                            {filters.branches.length > 0 && <p>• Branches: {filters.branches.join(', ')}</p>}
                            {filters.requiredSkills.length > 0 && <p>• Skills: {filters.requiredSkills.join(', ')}</p>}
                            {filters.experienceType && <p>• Experience: {filters.experienceType}</p>}
                            {filters.requiresInternship && <p>• Requires internship experience</p>}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
