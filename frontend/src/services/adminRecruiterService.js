/**
 * Admin Recruiter Service
 * Handles registration and management of Companies and Recruiters.
 * Uses localStorage for demo persistence.
 */

const COMPANIES_KEY = 'campuscred_admin_companies';
const RECRUITERS_KEY = 'campuscred_admin_recruiters';

const getCompanies = () => {
    const data = localStorage.getItem(COMPANIES_KEY);
    return data ? JSON.parse(data) : [];
};

const saveCompanies = (data) => {
    localStorage.setItem(COMPANIES_KEY, JSON.stringify(data));
};

const getRecruiters = () => {
    const data = localStorage.getItem(RECRUITERS_KEY);
    return data ? JSON.parse(data) : [];
};

const saveRecruiters = (data) => {
    localStorage.setItem(RECRUITERS_KEY, JSON.stringify(data));
};

export const adminRecruiterService = {
    // List all companies
    listCompanies: () => {
        return getCompanies();
    },

    // Register a new company
    registerCompany: (companyData) => {
        const companies = getCompanies();
        const newCompany = {
            ...companyData,
            id: 'COMP_' + Date.now(),
            createdAt: new Date().toISOString(),
            recruitersCount: 0
        };
        companies.unshift(newCompany);
        saveCompanies(companies);
        return newCompany;
    },

    // List all recruiters
    listRecruiters: () => {
        return getRecruiters();
    },

    // Register a new recruiter
    registerRecruiter: (recruiterData) => {
        const recruiters = getRecruiters();
        const newRecruiter = {
            ...recruiterData,
            id: 'REC_' + Date.now(),
            createdAt: new Date().toISOString(),
            status: 'Active'
        };
        recruiters.unshift(newRecruiter);
        saveRecruiters(recruiters);

        // Update company recruiter count
        const companies = getCompanies();
        const companyIndex = companies.findIndex(c => c.name === recruiterData.companyName);
        if (companyIndex !== -1) {
            companies[companyIndex].recruitersCount = (companies[companyIndex].recruitersCount || 0) + 1;
            saveCompanies(companies);
        }

        return newRecruiter;
    },

    // Seed initial data
    seedDemoData: () => {
        const companies = getCompanies();
        if (companies.length === 0) {
            adminRecruiterService.registerCompany({
                name: 'TechCorp Solutions',
                industry: 'IT',
                website: 'https://techcorp.com',
                hrName: 'Sarah Jenkins',
                hrEmail: 'sarah@techcorp.com',
                hrPhone: '+1 234 567 890'
            });
            adminRecruiterService.registerCompany({
                name: 'Global Finance Group',
                industry: 'Finance',
                website: 'https://gfg.finance',
                hrName: 'Robert Miller',
                hrEmail: 'robert@gfg.finance',
                hrPhone: '+1 987 654 321'
            });

            adminRecruiterService.registerRecruiter({
                name: 'Alice Williams',
                email: 'alice@techcorp.com',
                companyName: 'TechCorp Solutions',
                designation: 'Senior Talent Acquisition',
                accessLevel: 'Full'
            });
        }
    }
};
