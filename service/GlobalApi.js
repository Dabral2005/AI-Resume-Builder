// LocalStorage-based API service (replaces Strapi backend)
// Same interface as the original GlobalApi so all components work unchanged

const STORAGE_KEY = 'ai_resume_builder_resumes';

const getResumes = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

const saveResumes = (resumes) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));
};

const CreateNewResume = (data) => {
    return new Promise((resolve) => {
        const resumes = getResumes();
        const newResume = {
            id: Date.now(),
            documentId: data.data.resumeId || Date.now().toString(),
            ...data.data,
            themeColor: '#7c3aed',
            summery: '',
            Experience: [],
            education: [],
            skills: [],
            createdAt: new Date().toISOString(),
        };
        resumes.push(newResume);
        saveResumes(resumes);
        resolve({
            data: {
                data: newResume
            }
        });
    });
};

const GetUserResumes = (userEmail) => {
    return new Promise((resolve) => {
        const resumes = getResumes();
        const filtered = resumes.filter(r => r.userEmail === userEmail);
        resolve({
            data: {
                data: filtered
            }
        });
    });
};

const UpdateResumeDetail = (id, data) => {
    return new Promise((resolve) => {
        const resumes = getResumes();
        const index = resumes.findIndex(r => r.documentId === id);
        if (index !== -1) {
            resumes[index] = { ...resumes[index], ...data.data };
            saveResumes(resumes);
        }
        resolve({
            data: {
                data: resumes[index]
            }
        });
    });
};

const GetResumeById = (id) => {
    return new Promise((resolve) => {
        const resumes = getResumes();
        const resume = resumes.find(r => r.documentId === id);
        resolve({
            data: {
                data: resume || null
            }
        });
    });
};

const DeleteResumeById = (id) => {
    return new Promise((resolve) => {
        let resumes = getResumes();
        resumes = resumes.filter(r => r.documentId !== id);
        saveResumes(resumes);
        resolve({ data: { data: null } });
    });
};

export default {
    CreateNewResume,
    GetUserResumes,
    UpdateResumeDetail,
    GetResumeById,
    DeleteResumeById
};