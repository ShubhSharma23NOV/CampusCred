/**
 * Gemini AI Integration Service
 * Handles AI-powered features like candidate matching, skill analysis, and insights
 */

// Gemini AI API configuration
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

/**
 * Check if Gemini AI is configured
 */
export const isGeminiConfigured = () => {
    return GEMINI_API_KEY && GEMINI_API_KEY !== 'your_gemini_api_key_here';
};

/**
 * Generate AI insights for candidate profile
 * @param {Object} candidate - Candidate data
 * @returns {Promise<string>} AI-generated insights
 */
export const generateCandidateInsights = async (candidate) => {
    if (!isGeminiConfigured()) {
        return generateMockInsights(candidate);
    }

    try {
        const prompt = `
Analyze this candidate profile and provide a brief professional summary (2-3 sentences):

Name: ${candidate.name}
CGPA: ${candidate.cgpa}
Branch: ${candidate.branch}
Skills: ${candidate.skills?.join(', ')}
Internships: ${candidate.internships?.length || 0}
Credibility Score: ${candidate.credibilityScore}%

Focus on their strengths, experience quality, and placement readiness.
        `;

        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            })
        });

        const data = await response.json();
        return data.candidates[0]?.content?.parts[0]?.text || generateMockInsights(candidate);
    } catch (error) {
        console.error('Gemini AI error:', error);
        return generateMockInsights(candidate);
    }
};

/**
 * Generate mock insights when Gemini is not configured
 */
const generateMockInsights = (candidate) => {
    const insights = [];
    
    if (candidate.cgpa >= 8.5) {
        insights.push("Strong academic performance demonstrates consistent excellence");
    } else if (candidate.cgpa >= 7.5) {
        insights.push("Solid academic foundation with good technical understanding");
    }
    
    if (candidate.internships?.length > 1) {
        insights.push("multiple verified internships show practical industry exposure");
    } else if (candidate.internships?.length === 1) {
        insights.push("relevant internship experience adds practical value");
    }
    
    if (candidate.credibilityScore >= 95) {
        insights.push("and exceptional verification history builds strong trust");
    } else if (candidate.credibilityScore >= 85) {
        insights.push("with reliable verification record");
    }
    
    return `Candidate demonstrates ${insights.join(', ')}.`;
};

/**
 * Analyze skill gaps in student cohort
 * @param {Array} students - Student cohort
 * @param {Array} marketDemands - Market skill demands
 * @returns {Promise<Object>} Skill gap analysis
 */
export const analyzeSkillGaps = async (students, marketDemands) => {
    if (!isGeminiConfigured()) {
        return generateMockSkillGapAnalysis(students, marketDemands);
    }

    try {
        const studentSkills = students.flatMap(s => s.skills || []);
        const uniqueSkills = [...new Set(studentSkills)];
        
        const prompt = `
Analyze the skill gap between student cohort and market demands:

Student Skills (${uniqueSkills.length} unique): ${uniqueSkills.join(', ')}
Market Demands: ${marketDemands.join(', ')}
Total Students: ${students.length}

Provide:
1. Top 3 critical skill gaps
2. Recommended training priorities
3. Emerging skills to focus on

Keep response concise and actionable.
        `;

        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            })
        });

        const data = await response.json();
        return {
            analysis: data.candidates[0]?.content?.parts[0]?.text,
            isAIGenerated: true
        };
    } catch (error) {
        console.error('Gemini AI error:', error);
        return generateMockSkillGapAnalysis(students, marketDemands);
    }
};

/**
 * Generate mock skill gap analysis
 */
const generateMockSkillGapAnalysis = (students, marketDemands) => {
    return {
        analysis: `
**Critical Skill Gaps:**
1. Cloud Technologies (AWS, Azure) - High demand, low coverage
2. Modern Frameworks (React, Next.js) - Growing demand
3. DevOps Tools (Docker, Kubernetes) - Essential for deployment

**Training Priorities:**
- Focus on cloud certifications and hands-on projects
- Encourage modern web framework adoption
- Introduce CI/CD and containerization concepts

**Emerging Skills:**
- AI/ML integration in applications
- Microservices architecture
- Serverless computing
        `,
        isAIGenerated: false
    };
};

/**
 * Generate placement predictions using AI
 * @param {Object} student - Student data
 * @param {Array} historicalData - Historical placement data
 * @returns {Promise<Object>} Placement prediction
 */
export const predictPlacementProbability = async (student, historicalData) => {
    // Simplified prediction algorithm
    // In production, this would use Gemini AI with historical data
    
    let probability = 50; // Base probability
    
    // CGPA factor
    if (student.cgpa >= 8.5) probability += 20;
    else if (student.cgpa >= 7.5) probability += 10;
    else if (student.cgpa < 6.5) probability -= 10;
    
    // Internship factor
    if (student.internships?.length >= 2) probability += 15;
    else if (student.internships?.length === 1) probability += 10;
    else probability -= 5;
    
    // Credibility factor
    if (student.credibilityScore >= 95) probability += 10;
    else if (student.credibilityScore >= 85) probability += 5;
    
    // Skills factor
    if (student.skills?.length >= 5) probability += 5;
    
    // Cap at 95% (never 100% certain)
    probability = Math.min(probability, 95);
    probability = Math.max(probability, 10); // Minimum 10%
    
    return {
        probability: Math.round(probability),
        confidence: probability >= 70 ? 'high' : probability >= 50 ? 'medium' : 'low',
        factors: {
            academic: student.cgpa >= 7.5 ? 'positive' : 'neutral',
            experience: student.internships?.length > 0 ? 'positive' : 'negative',
            credibility: student.credibilityScore >= 85 ? 'positive' : 'neutral',
            skills: student.skills?.length >= 5 ? 'positive' : 'neutral'
        }
    };
};

/**
 * Generate strategic recommendations for institution
 * @param {Object} analyticsData - Institutional analytics
 * @returns {Promise<Array>} Recommendations
 */
export const generateInstitutionalRecommendations = async (analyticsData) => {
    const recommendations = [];
    
    // Placement rate analysis
    if (analyticsData.placementRate < 70) {
        recommendations.push({
            priority: 'high',
            category: 'Placement',
            recommendation: 'Focus on industry partnerships and skill development programs',
            impact: 'Could improve placement rate by 15-20%'
        });
    }
    
    // Internship conversion analysis
    if (analyticsData.internshipConversionRate < 60) {
        recommendations.push({
            priority: 'high',
            category: 'Internships',
            recommendation: 'Strengthen internship-to-placement pipeline with targeted companies',
            impact: 'Increase conversion rate significantly'
        });
    }
    
    // Skill gap analysis
    if (analyticsData.skillGaps?.length > 5) {
        recommendations.push({
            priority: 'medium',
            category: 'Training',
            recommendation: 'Implement focused training programs for high-demand skills',
            impact: 'Bridge critical skill gaps in 6-8 months'
        });
    }
    
    // Credibility score analysis
    if (analyticsData.averageCredibility < 80) {
        recommendations.push({
            priority: 'medium',
            category: 'Verification',
            recommendation: 'Encourage more students to complete verification process',
            impact: 'Improve recruiter trust and engagement'
        });
    }
    
    return recommendations;
};

export default {
    isGeminiConfigured,
    generateCandidateInsights,
    analyzeSkillGaps,
    predictPlacementProbability,
    generateInstitutionalRecommendations
};
