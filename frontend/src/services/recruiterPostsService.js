/**
 * Recruiter Posts Service
 * Handles CRUD operations for Job/Internship posts and applicant management.
 * Uses localStorage for mock data persistence in demo mode.
 */

const POSTS_KEY = 'campuscred_recruiter_posts';
const APPLICANTS_KEY = 'campuscred_post_applicants';

// Mock students data for matching demo
const MOCK_STUDENTS = [
    { id: 'S101', name: 'Aman Gupta', role: 'Frontend Developer', skills: ['React', 'Tailwind', 'JavaScript'], cgpa: 8.5, credibility: 95, verifiedProofs: 12 },
    { id: 'S102', name: 'Sneha Kapur', role: 'Fullstack Dev', skills: ['Node.js', 'React', 'MongoDB'], cgpa: 9.1, credibility: 98, verifiedProofs: 15 },
    { id: 'S103', name: 'Vikram Singh', role: 'Backend Engineer', skills: ['Java', 'Spring Boot', 'SQL'], cgpa: 7.8, credibility: 82, verifiedProofs: 8 },
    { id: 'S104', name: 'Riya Jaiswal', role: 'UI/UX Designer', skills: ['Figma', 'Adobe XD', 'HTML/CSS'], cgpa: 8.2, credibility: 88, verifiedProofs: 10 },
];

const getPosts = () => {
    const posts = localStorage.getItem(POSTS_KEY);
    return posts ? JSON.parse(posts) : [];
};

const savePosts = (posts) => {
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
};

const getApplicants = () => {
    const applicants = localStorage.getItem(APPLICANTS_KEY);
    return applicants ? JSON.parse(applicants) : {};
};

const saveApplicants = (applicants) => {
    localStorage.setItem(APPLICANTS_KEY, JSON.stringify(applicants));
};

export const recruiterPostsService = {
    // List all posts
    listPosts: () => {
        return getPosts();
    },

    // Create a new post
    createPost: (postData) => {
        const posts = getPosts();
        const newPost = {
            ...postData,
            id: 'POST_' + Date.now(),
            applicantsCount: 0,
            status: postData.status || 'Live',
            createdAt: new Date().toISOString(),
        };
        posts.unshift(newPost);
        savePosts(posts);
        return newPost;
    },

    // Update existing post
    updatePost: (id, updates) => {
        const posts = getPosts();
        const index = posts.findIndex(p => p.id === id);
        if (index !== -1) {
            posts[index] = { ...posts[index], ...updates };
            savePosts(posts);
            return posts[index];
        }
        return null;
    },

    // Close a post
    closePost: (id) => {
        return recruiterPostsService.updatePost(id, { status: 'Closed' });
    },

    // List applicants for a specific post
    listApplicants: (postId) => {
        const allApplicants = getApplicants();
        const postApplicants = allApplicants[postId] || [];

        // Enrich with mock student data and calculate matching score
        return postApplicants.map(app => {
            const student = MOCK_STUDENTS.find(s => s.id === app.studentId) || {
                id: app.studentId,
                name: 'Unknown Student',
                role: 'Unknown',
                skills: [],
                cgpa: 0,
                credibility: 0,
                verifiedProofs: 0
            };

            // Simple deterministic matching score calculation
            const post = getPosts().find(p => p.id === postId);
            let matchScore = 0;
            if (post) {
                // Skills overlap match: 40%
                const skillOverlap = student.skills.filter(s => post.requiredSkills.includes(s)).length;
                const skillScore = post.requiredSkills.length > 0 ? (skillOverlap / post.requiredSkills.length) * 40 : 40;

                // CGPA fit: 20%
                const cgpaScore = student.cgpa >= post.minCgpa ? 20 : (student.cgpa / post.minCgpa) * 20;

                // Internship relevance (Mock logic): 25%
                const relevanceScore = 20; // Defaulting for demo

                // Credibility: 15%
                const credibilityScore = (student.credibility / 100) * 15;

                matchScore = Math.round(skillScore + cgpaScore + relevanceScore + credibilityScore);
            }

            return {
                ...student,
                status: app.status,
                appliedAt: app.appliedAt,
                matchScore: matchScore > 100 ? 100 : matchScore
            };
        });
    },

    // Update applicant status (Shortlist/Reject)
    updateApplicantStatus: (postId, studentId, status) => {
        const allApplicants = getApplicants();
        if (allApplicants[postId]) {
            const index = allApplicants[postId].findIndex(a => a.studentId === studentId);
            if (index !== -1) {
                allApplicants[postId][index].status = status;
                saveApplicants(allApplicants);
                return true;
            }
        }
        return false;
    },

    // Mock applying to a post (for testing)
    applyToPost: (studentId, postId) => {
        const allApplicants = getApplicants();
        if (!allApplicants[postId]) allApplicants[postId] = [];

        // Prevent duplicate applications
        if (allApplicants[postId].some(a => a.studentId === studentId)) return false;

        allApplicants[postId].push({
            studentId,
            status: 'Applied',
            appliedAt: new Date().toISOString()
        });
        saveApplicants(allApplicants);

        // Update applicant count in post
        const posts = getPosts();
        const postIndex = posts.findIndex(p => p.id === postId);
        if (postIndex !== -1) {
            posts[postIndex].applicantsCount = (posts[postIndex].applicantsCount || 0) + 1;
            savePosts(posts);
        }
        return true;
    },

    // Seed initial data if empty
    seedDemoData: () => {
        const posts = getPosts();
        if (posts.length === 0) {
            recruiterPostsService.createPost({
                jobTitle: 'Frontend Intern',
                type: 'Internship',
                companyName: 'TechCorp',
                location: 'Remote',
                stipend: '25,000',
                requiredSkills: ['React', 'Tailwind'],
                allowedBranches: ['CS', 'IT'],
                minCgpa: 7.5,
                backlogAllowed: 'No',
                description: 'We are looking for a passionate Frontend Intern...',
                deadline: '2026-02-15',
                status: 'Live'
            });

            recruiterPostsService.createPost({
                jobTitle: 'Associate Software Engineer',
                type: 'Placement',
                companyName: 'GlobalSync',
                location: 'Onsite - Bangalore',
                stipend: '12 LPA',
                requiredSkills: ['Java', 'SQL', 'Spring Boot'],
                allowedBranches: ['CS', 'IT', 'EC'],
                minCgpa: 8.0,
                backlogAllowed: 'No',
                description: 'Join our core engineering team...',
                deadline: '2026-03-10',
                status: 'Live'
            });

            // Add some mock applicants
            const updatedPosts = getPosts();
            recruiterPostsService.applyToPost('S101', updatedPosts[0].id);
            recruiterPostsService.applyToPost('S102', updatedPosts[0].id);
            recruiterPostsService.applyToPost('S103', updatedPosts[1].id);
        }
    }
};
