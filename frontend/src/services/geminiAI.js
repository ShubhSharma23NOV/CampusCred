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

/**
 * Evaluate placement readiness score using Gemini AI
 * @param {Object} candidate - Student profile
 * @param {Object} jobRole - Job requirements
 * @returns {Promise<Object>} Detailed evaluation
 */
export const evaluatePlacementReadiness = async (candidate, jobRole) => {
    if (!isGeminiConfigured()) {
        console.warn("Gemini API key not found. Returning mock evaluation.");
        return generateMockEvaluation(candidate, jobRole);
    }

    try {
        const prompt = `
You are an AI career coach for a campus recruitment platform.

Your task:
1. Evaluate the student's personal profile against a target job role.
2. Generate a Placement Readiness Score (0–100).
3. Assign a readiness label for the student's dashboard display.
4. Provide structured, encouraging, and actionable insights addressed directly to the student.

Scoring Weights:
- Skills Match: 40%
- Internship Relevance: 25%
- Verification & Credibility: 20%
- Academic Performance (CGPA): 15%

Input:
Student Profile:
- Skills: ${candidate.skills?.join(', ') || 'None'}
- Internships: ${candidate.internships?.map(i => i.role + ' at ' + i.company).join(', ') || 'None'}
- Verification Status: ${candidate.isVerified ? 'Verified' : 'Not Verified'}
- Credibility Score (0–100): ${candidate.credibilityScore}
- CGPA: ${candidate.cgpa}

Job Role:
- Required Skills: ${jobRole.requiredSkills?.join(', ') || 'General'}
- Job Domain: ${jobRole.domain || 'General'}

Instruction for AI: Use 'You' and 'Your' to address the student directly. Be encouraging and focus on growth.

Output Format (STRICT JSON, no extra text):

{
  "readinessScore": number,
  "readinessLabel": "Ready | Moderate | Needs Improvement",
  "summary": "One-line encouraging insight addressed to the student",
  "breakdown": {
    "skills": number,
    "internship": number,
    "verification": number,
    "academic": number
  },
  "keyReasons": [
    "Encouraging Reason 1",
    "Encouraging Reason 2",
    "Encouraging Reason 3"
  ],
  "improvementTips": [
    "Personalized Tip 1",
    "Personalized Tip 2"
  ]
}

Label Rules:
- Score ≥ 75 → Ready
- Score 50–74 → Moderate
- Score < 50 → Needs Improvement
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
        const text = data.candidates[0]?.content?.parts[0]?.text;

        if (!text) throw new Error("No response from Gemini");

        return parseEvaluationResponse(text);

    } catch (error) {
        console.error('Gemini AI error:', error);
        return generateMockEvaluation(candidate, jobRole);
    }
};

/**
 * Parse the raw text response from Gemini into a structured object
 */
const parseEvaluationResponse = (text) => {
    try {
        // Clean up markdown code blocks if present
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleanedText);
    } catch (e) {
        console.error("Error parsing AI response", e);
        // Fallback to mock if parsing fails
        return {
            readinessScore: 0,
            readinessLabel: "Error",
            summary: "Failed to parse AI response",
            breakdown: { skills: 0, internship: 0, verification: 0, academic: 0 },
            keyReasons: ["Error parsing response"],
            improvementTips: []
        };
    }
};

/**
 * Generate mock evaluation for fallback
 */
/**
 * Run placement evaluation using Antigravity API
 * @param {Object} params - { student, job }
 * @returns {Promise<Object>} Evaluation result
 */
export async function runPlacementEvaluation({
    student,
    job
}) {
    const prompt = `
You are an AI career coach for a campus placement platform.

Your task:
1. Evaluate the student's personal profile against a target job role.
2. Generate a Placement Readiness Score (0–100) that reflects their fit.
3. Assign a readiness label for the student's dashboard.
4. Provide structured, encouraging, and actionable insights addressed directly to the student.

Scoring Weights:
- Skills Match: 40%
- Internship Relevance: 25%
- Verification & Credibility: 20%
- Academic Performance (CGPA): 15%

Student Profile:
- Skills: ${student.skills.join(", ")}
- Internships: ${student.internships.map(i => i.role).join(", ")}
- Verification Status: ${student.isVerified ? "Verified" : "Not Verified"}
- Credibility Score: ${student.credibilityScore}
- CGPA: ${student.cgpa}

Job Role:
- Required Skills: ${job.requiredSkills.join(", ")}
- Job Domain: ${job.domain}

Instruction for AI: Use 'You' and 'Your' to address the student directly. Be encouraging and focus on growth.

Output Format (STRICT JSON only):

{
  "readinessScore": number,
  "readinessLabel": "Ready | Moderate | Needs Improvement",
  "summary": "One-line encouraging insight addressed to the student",
  "breakdown": {
    "skills": number,
    "internship": number,
    "verification": number,
    "academic": number
  },
  "keyReasons": ["Encouraging reason 1", "Encouraging reason 2", "Encouraging reason 3"],
  "improvementTips": ["Personalized tip 1", "Personalized tip 2"]
}
`;

    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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
        const text = data.candidates[0]?.content?.parts[0]?.text;

        if (!text) throw new Error("No response from Gemini");

        // Clean up markdown code blocks if present
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleanedText);
    } catch (error) {
        console.error("AI Evaluation Error:", error);
        return generateMockEvaluation(student, job);
    }
}

/**
 * Generate mock evaluation for fallback
 */
const generateMockEvaluation = (candidate, jobRole) => {
    return {
        readinessScore: 75,
        readinessLabel: "Ready",
        summary: "You are a strong candidate with a great skill match! Focus on gaining a bit more experience to be fully prepared.",
        breakdown: {
            skills: 80,
            internship: 70,
            verification: 100,
            academic: 85
        },
        keyReasons: [
            "Your core skills align perfectly with the job requirements",
            "Your academic performance is consistently strong",
            "You have relevant internship experience that adds value"
        ],
        improvementTips: [
            "Try to take on more complex hands-on projects to deepen your expertise",
            "Consider earning an advanced certification in your primary skill area"
        ]
    };
};

/**
 * Run recruitment assistant using Antigravity API
 * @param {Object} params - { company, student }
 * @returns {Promise<Object>} Recruitment result
 */
export async function runRecruitmentAssistant({
    company,
    student
}) {
    const prompt = `
You are an AI recruitment assistant for a campus placement platform.

Your task:
1. Present company placement information in a student-friendly way.
2. Clearly list job role requirements and eligibility criteria.
3. Generate an application form that a student must fill to apply.

Company Information:
- Company Name: ${company.name}
- Job Role: ${company.role}
- Job Domain: ${company.domain}
- Required Skills: ${company.requiredSkills.join(", ")}
- Minimum CGPA: ${company.minCgpa}
- Eligible Branches: ${company.eligibleBranches.join(", ")}
- Internship Preferred: ${company.internshipRequired ? "Yes" : "No"}

Student Profile:
- Name: ${student.name}
- Branch: ${student.branch}
- CGPA: ${student.cgpa}
- Skills: ${student.skills.join(", ")}

Instructions:
- Clearly mention if the student is eligible or not.
- If eligible, generate an “Apply Now” form.
- Keep language simple and professional.

Output Format (STRICT JSON):

{
  "companyOverview": {
    "companyName": "",
    "jobRole": "",
    "jobDomain": ""
  },
  "eligibilityStatus": "Eligible | Not Eligible",
  "requirements": {
    "skills": [],
    "minCGPA": number,
    "branches": [],
    "internshipPreference": ""
  },
  "applyForm": {
    "fields": [
      { "label": "Full Name", "type": "text", "required": true },
      { "label": "Email", "type": "email", "required": true },
      { "label": "Resume Link", "type": "url", "required": true },
      { "label": "Why should we hire you?", "type": "textarea", "required": true },
      { "label": "Relevant Skills", "type": "text", "required": true }
    ]
  }
}
`;

    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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
        const text = data.candidates[0]?.content?.parts[0]?.text;

        if (!text) throw new Error("No response from Gemini");

        // Clean up markdown code blocks if present
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleanedText);
    } catch (error) {
        console.error("AI Recruitment Assistant Error:", error);
        return {
            eligibilityStatus: "Error",
            companyOverview: { companyName: company.name, jobRole: company.role, jobDomain: company.domain },
            requirements: { skills: [], minCGPA: 0, branches: [], internshipPreference: "" },
            applyForm: { fields: [] }
        };
    }
}

/**
 * Check eligibility for multiple jobs
 * @param {Object} student - Student profile
 * @param {Array} jobsList - List of available jobs
 * @returns {Promise<Object>} Eligibility results
 */
export async function checkJobEligibility(student, jobsList) {
    const prompt = `
You are an AI placement assistant for students.

Your task:
1. Show a list of companies currently open for placements.
2. For each company, display job role and requirements.
3. Check whether the student is eligible.
4. Clearly mark jobs as “Eligible” or “Not Eligible”.

Student Profile:
- Name: ${student.name}
- Branch: ${student.branch}
- CGPA: ${student.cgpa}
- Skills: ${student.skills.join(", ")}

Available Jobs:
${JSON.stringify(jobsList, null, 2)}

Instructions:
- Compare student profile with each job.
- Eligibility depends on CGPA, branch, and skills.
- Keep output structured for frontend rendering.

Output Format (STRICT JSON):

{
  "jobs": [
    {
      "companyName": "",
      "jobRole": "",
      "requirements": {
        "skills": [],
        "minCGPA": number,
        "branches": []
      },
      "eligibilityStatus": "Eligible | Not Eligible",
      "reason": ""
    }
  ]
}
`;

    return callGemini(prompt);
}

/**
 * Generate application form for a specific job
 * @param {string} companyName 
 * @param {string} jobRole 
 * @returns {Promise<Object>} Form structure
 */
export async function generateApplicationForm(companyName, jobRole) {
    const prompt = `
You are an AI form generator for campus placements.

Your task:
1. Generate a job application form for a student.
2. The form should be similar to Google Forms.
3. Include only relevant fields for recruiters.

Job Details:
- Company Name: ${companyName}
- Job Role: ${jobRole}

Output Format (STRICT JSON):

{
  "formTitle": "",
  "fields": [
    { "label": "Full Name", "type": "text", "required": true },
    { "label": "Email ID", "type": "email", "required": true },
    { "label": "Resume Link", "type": "url", "required": true },
    { "label": "Relevant Skills", "type": "text", "required": true },
    { "label": "Why should we hire you?", "type": "textarea", "required": true }
  ]
}
`;

    return callGemini(prompt);
}

/**
 * Analyze a student application for a recruiter
 * @param {string} companyName 
 * @param {string} jobRole 
 * @param {Object} application - The full application data
 * @returns {Promise<Object>} Analysis result
 */
export async function analyzeApplication(companyName, jobRole, application) {
    const prompt = `
You are an AI recruiter assistant.

Your task:
1. Analyze student applications for a job.
2. Summarize each applicant clearly.
3. Help recruiter quickly decide.

Job Details:
- Company Name: ${companyName}
- Job Role: ${jobRole}

Student Application:
${JSON.stringify(application, null, 2)}

Output Format (STRICT JSON):

{
  "applicantCard": {
    "name": "",
    "branch": "",
    "cgpa": number,
    "skills": [],
    "placementReadiness": number
  },
  "strengths": [],
  "concerns": [],
  "recommendation": "Strong Fit | Moderate Fit | Not Recommended"
}
`;

    return callGemini(prompt);
}

/**
 * Filter candidates based on eligibility criteria
 * @param {Array} candidates - List of candidates
 * @param {Object} criteria - Filter criteria
 * @returns {Array} Filtered candidates
 */
export function filterByEligibility(candidates, criteria) {
    return candidates.filter(candidate => {
        // Filter by skills (if any match)
        if (criteria.skills && criteria.skills.length > 0) {
            const hasSkill = criteria.skills.some(skill =>
                candidate.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
            );
            if (!hasSkill) return false;
        }

        // Filter by verification status
        if (criteria.verifiedOnly && !candidate.verified) {
            return false;
        }

        // Filter by minimum CGPA
        if (criteria.minCgpa && candidate.cgpa < criteria.minCgpa) {
            return false;
        }

        return true;
    });
}

// Helper to call Gemini and parse JSON
async function callGemini(prompt) {
    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) throw new Error("No response from Gemini");

        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleanedText);
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw error;
    }
}

export default {
    isGeminiConfigured,
    generateCandidateInsights,
    analyzeSkillGaps,
    predictPlacementProbability,
    generateInstitutionalRecommendations,
    evaluatePlacementReadiness,
    runPlacementEvaluation,
    runRecruitmentAssistant,
    checkJobEligibility,
    generateApplicationForm,
    analyzeApplication,
    filterByEligibility
};
