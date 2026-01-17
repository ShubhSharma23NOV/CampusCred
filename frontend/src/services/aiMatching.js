// AI Matching Algorithm Service
// Simulates Gemini AI-powered candidate-job matching

/**
 * Calculate match score between candidate and job requirements
 * @param {Object} candidate - Student profile with skills, CGPA, branch, internships
 * @param {Object} jobRequirements - Job requirements from recruiter
 * @returns {Object} Match score and breakdown
 */
export const calculateMatchScore = (candidate, jobRequirements) => {
    const weights = {
        skills: 0.40,      // 40% - Skills match
        academic: 0.20,    // 20% - CGPA/Branch fit
        experience: 0.25,  // 25% - Internship relevance
        credibility: 0.15  // 15% - Verification history
    };

    // Skills matching
    const skillsScore = calculateSkillsMatch(
        candidate.skills || [],
        jobRequirements.requiredSkills || []
    );

    // Academic fit
    const academicScore = calculateAcademicFit(
        candidate.cgpa || 0,
        candidate.branch || '',
        jobRequirements.minCGPA || 0,
        jobRequirements.preferredBranches || []
    );

    // Experience relevance
    const experienceScore = calculateExperienceRelevance(
        candidate.internships || [],
        jobRequirements.experienceType || ''
    );

    // Credibility score
    const credibilityScore = candidate.credibilityScore || 0;

    // Calculate weighted total
    const totalScore = Math.round(
        (skillsScore * weights.skills) +
        (academicScore * weights.academic) +
        (experienceScore * weights.experience) +
        (credibilityScore * weights.credibility)
    );

    return {
        totalScore,
        breakdown: {
            skills: skillsScore,
            academic: academicScore,
            experience: experienceScore,
            credibility: credibilityScore
        },
        recommendation: getRecommendation(totalScore),
        matchLevel: getMatchLevel(totalScore)
    };
};

/**
 * Calculate skills match percentage
 */
const calculateSkillsMatch = (candidateSkills, requiredSkills) => {
    if (!requiredSkills.length) return 100;
    
    const candidateSkillsLower = candidateSkills.map(s => s.toLowerCase());
    const matchedSkills = requiredSkills.filter(skill => 
        candidateSkillsLower.includes(skill.toLowerCase())
    );
    
    const directMatch = (matchedSkills.length / requiredSkills.length) * 100;
    
    // Add bonus for extra relevant skills
    const bonusSkills = candidateSkills.length - matchedSkills.length;
    const bonus = Math.min(bonusSkills * 2, 20);
    
    return Math.min(directMatch + bonus, 100);
};

/**
 * Calculate academic fit score
 */
const calculateAcademicFit = (cgpa, branch, minCGPA, preferredBranches) => {
    let score = 0;
    
    // CGPA scoring (60% of academic score)
    if (cgpa >= minCGPA) {
        const cgpaExcess = cgpa - minCGPA;
        score += Math.min(60 + (cgpaExcess * 10), 100) * 0.6;
    } else {
        score += (cgpa / minCGPA) * 60 * 0.6;
    }
    
    // Branch scoring (40% of academic score)
    if (preferredBranches.length === 0 || preferredBranches.includes(branch)) {
        score += 40 * 0.4;
    } else {
        score += 20 * 0.4; // Partial credit for other branches
    }
    
    return Math.round(score);
};

/**
 * Calculate experience relevance score
 */
const calculateExperienceRelevance = (internships, experienceType) => {
    if (!internships.length) return 30; // Base score for no experience
    
    let score = 50; // Base score for having experience
    
    // Check for relevant internships
    const relevantInternships = internships.filter(internship => 
        internship.type?.toLowerCase().includes(experienceType.toLowerCase()) ||
        internship.role?.toLowerCase().includes(experienceType.toLowerCase())
    );
    
    if (relevantInternships.length > 0) {
        score += 30; // Bonus for relevant experience
        
        // Additional bonus for multiple relevant internships
        if (relevantInternships.length > 1) {
            score += Math.min((relevantInternships.length - 1) * 10, 20);
        }
    }
    
    return Math.min(score, 100);
};

/**
 * Get recommendation text based on score
 */
const getRecommendation = (score) => {
    if (score >= 85) return "Highly Recommended - Excellent match";
    if (score >= 70) return "Recommended - Strong candidate";
    if (score >= 55) return "Consider - Good potential";
    if (score >= 40) return "Review - May need development";
    return "Not Recommended - Significant gaps";
};

/**
 * Get match level category
 */
const getMatchLevel = (score) => {
    if (score >= 85) return "excellent";
    if (score >= 70) return "strong";
    if (score >= 55) return "good";
    if (score >= 40) return "fair";
    return "weak";
};

/**
 * Filter candidates by eligibility criteria
 * @param {Array} candidates - List of all candidates
 * @param {Object} criteria - Eligibility criteria
 * @returns {Array} Filtered and sorted candidates
 */
export const filterByEligibility = (candidates, criteria) => {
    return candidates
        .filter(candidate => {
            // CGPA filter
            if (criteria.minCGPA && candidate.cgpa < criteria.minCGPA) {
                return false;
            }
            
            // Branch filter
            if (criteria.branches?.length && !criteria.branches.includes(candidate.branch)) {
                return false;
            }
            
            // Skills filter (must have at least one required skill)
            if (criteria.requiredSkills?.length) {
                const hasRequiredSkill = criteria.requiredSkills.some(skill =>
                    candidate.skills?.some(s => s.toLowerCase().includes(skill.toLowerCase()))
                );
                if (!hasRequiredSkill) return false;
            }
            
            // Internship experience filter
            if (criteria.requiresInternship && (!candidate.internships || candidate.internships.length === 0)) {
                return false;
            }
            
            return true;
        })
        .map(candidate => ({
            ...candidate,
            matchScore: calculateMatchScore(candidate, criteria)
        }))
        .sort((a, b) => b.matchScore.totalScore - a.matchScore.totalScore);
};

/**
 * Analyze internship to placement conversion
 * @param {Array} students - List of students with internship and placement data
 * @returns {Object} Analytics data
 */
export const analyzeInternshipPlacementLink = (students) => {
    const withInternship = students.filter(s => s.internships?.length > 0);
    const withoutInternship = students.filter(s => !s.internships?.length);
    
    const internshipPlaced = withInternship.filter(s => s.placementStatus === 'placed').length;
    const noInternshipPlaced = withoutInternship.filter(s => s.placementStatus === 'placed').length;
    
    const conversionRate = withInternship.length > 0 
        ? (internshipPlaced / withInternship.length) * 100 
        : 0;
    
    const noInternshipRate = withoutInternship.length > 0
        ? (noInternshipPlaced / withoutInternship.length) * 100
        : 0;
    
    // Company-wise conversion
    const companyConversion = {};
    withInternship.forEach(student => {
        student.internships?.forEach(internship => {
            const company = internship.company;
            if (!companyConversion[company]) {
                companyConversion[company] = { total: 0, placed: 0 };
            }
            companyConversion[company].total++;
            if (student.placementStatus === 'placed') {
                companyConversion[company].placed++;
            }
        });
    });
    
    return {
        totalStudents: students.length,
        withInternship: withInternship.length,
        withoutInternship: withoutInternship.length,
        conversionRate: Math.round(conversionRate),
        noInternshipRate: Math.round(noInternshipRate),
        advantage: Math.round(conversionRate - noInternshipRate),
        companyConversion: Object.entries(companyConversion).map(([company, data]) => ({
            company,
            conversionRate: Math.round((data.placed / data.total) * 100),
            total: data.total,
            placed: data.placed
        })).sort((a, b) => b.conversionRate - a.conversionRate)
    };
};

/**
 * Generate skill gap analysis
 * @param {Array} students - Student cohort
 * @param {Array} jobRequirements - Market requirements
 * @returns {Object} Skill gap analysis
 */
export const analyzeSkillGaps = (students, jobRequirements) => {
    const allStudentSkills = students.flatMap(s => s.skills || []);
    const skillFrequency = {};
    
    allStudentSkills.forEach(skill => {
        const normalized = skill.toLowerCase();
        skillFrequency[normalized] = (skillFrequency[normalized] || 0) + 1;
    });
    
    const requiredSkills = jobRequirements.flatMap(job => job.requiredSkills || []);
    const requiredFrequency = {};
    
    requiredSkills.forEach(skill => {
        const normalized = skill.toLowerCase();
        requiredFrequency[normalized] = (requiredFrequency[normalized] || 0) + 1;
    });
    
    // Find gaps
    const gaps = [];
    Object.keys(requiredFrequency).forEach(skill => {
        const demand = requiredFrequency[skill];
        const supply = skillFrequency[skill] || 0;
        const coverage = students.length > 0 ? (supply / students.length) * 100 : 0;
        
        if (coverage < 50) {
            gaps.push({
                skill,
                demand,
                supply,
                coverage: Math.round(coverage),
                gap: Math.round(50 - coverage),
                priority: coverage < 20 ? 'high' : coverage < 35 ? 'medium' : 'low'
            });
        }
    });
    
    return {
        totalSkillsInMarket: Object.keys(requiredFrequency).length,
        totalSkillsInCohort: Object.keys(skillFrequency).length,
        gaps: gaps.sort((a, b) => b.gap - a.gap),
        topStudentSkills: Object.entries(skillFrequency)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([skill, count]) => ({ skill, count })),
        topDemandedSkills: Object.entries(requiredFrequency)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([skill, count]) => ({ skill, count }))
    };
};

export default {
    calculateMatchScore,
    filterByEligibility,
    analyzeInternshipPlacementLink,
    analyzeSkillGaps
};
