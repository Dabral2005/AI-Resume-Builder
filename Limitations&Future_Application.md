# CVera — AI Resume Builder: Limitations & Future Applications

**Project Name:** CVera — AI Resume Builder  
**Version:** 1.0  
**Author:** Mohit Dabral  
**Date:** April 2026  

---

## Table of Contents

1. [Current Limitations](#1-current-limitations)
2. [Known Technical Constraints](#2-known-technical-constraints)
3. [Future Enhancements](#3-future-enhancements)
4. [Future Applications](#4-future-applications)
5. [Conclusion](#5-conclusion)

---

## 1. Current Limitations

### 1.1 Data Persistence Limitations

| Limitation | Impact | Severity |
|:---|:---|:---|
| **Browser-Only Storage** | All resume data is stored in Browser LocalStorage, which is tied to a single browser on a single device. Users cannot access their resumes from a different browser or device. | High |
| **Storage Capacity** | LocalStorage is limited to ~5–10 MB per origin. Users with many resumes or extensive content may hit this limit. | Medium |
| **No Data Backup** | Clearing browser data, switching browsers, or reinstalling the browser permanently deletes all resumes with no recovery option. | High |
| **No Data Sync** | There is no cloud synchronization. Resumes created on one device are invisible on another. | High |

### 1.2 AI Integration Limitations

| Limitation | Impact | Severity |
|:---|:---|:---|
| **API Key Dependency** | AI features require a valid `VITE_GOOGLE_AI_API_KEY`. Without it, the system falls back to generic mock responses. | Medium |
| **No Contextual Awareness** | The AI generates content based on the job title alone. It does not consider the user's actual work history or skills already entered. | Medium |
| **English Only** | AI-generated content is currently in English. There is no multi-language support for resume content generation. | Medium |
| **Rate Limits** | Google Gemini's free tier has request-per-minute limits. Heavy usage may trigger throttling. | Low |

### 1.3 Feature Limitations

| Limitation | Impact | Severity |
|:---|:---|:---|
| **No Resume Import** | Users cannot import existing resumes from PDF, DOCX, or LinkedIn. All content must be entered manually. | Medium |
| **Limited Templates** | Only 5 resume templates are available. Users seeking highly specialized layouts (academic CV, creative portfolio) may not find a suitable option. | Low |
| **No Multi-Page Support** | Resumes are rendered as a single continuous page. For professionals with extensive experience, content may overflow. | Medium |
| **No Cover Letter** | The system only generates resumes. There is no companion cover letter builder. | Low |
| **No Collaboration** | Only one user can work on a resume at a time. There is no shared editing or reviewer feedback mechanism. | Low |
| **No Print Optimization** | PDF export relies on `window.print()`, which may produce varying results across browsers regarding margins, page breaks, and color accuracy. | Medium |

### 1.4 UI/UX Limitations

| Limitation | Impact | Severity |
|:---|:---|:---|
| **No Undo/Redo** | Users cannot undo or redo changes. Accidental deletions of form content require manual re-entry. | Medium |
| **No Autosave Indicator** | While forms save on submission, there is no persistent autosave with a visible timestamp indicator. | Low |
| **Sign-In Page Branding** | The sign-in page header shows "AIResume" instead of "CVera", a minor branding inconsistency. | Low |

---

## 2. Known Technical Constraints

| Constraint | Detail |
|:---|:---|
| **Client-Side Only** | The application has no backend server. All business logic runs in the browser. This simplifies deployment but limits functionality that requires server-side processing (e.g., scheduled jobs, webhooks). |
| **No SSR/SEO for Dynamic Pages** | The SPA architecture means dynamic pages (Dashboard, Editor, View) are not server-side rendered, limiting SEO for shared resume links. |
| **localStorage Synchronous API** | `localStorage.getItem()` and `setItem()` are synchronous and block the main thread. With large datasets, this could cause momentary UI freezes. |
| **Clerk Dependency** | The entire authentication flow depends on Clerk's availability. If Clerk experiences downtime, users cannot sign in. |
| **Browser Compatibility** | Advanced CSS features (backdrop-filter for glassmorphism, CSS custom properties) may not render correctly on very old browsers. |

---

## 3. Future Enhancements

### 3.1 Short-Term Enhancements (Next Release)

| Enhancement | Description | Priority |
|:---|:---|:---|
| **Cloud Database** | Migrate from LocalStorage to a cloud database (e.g., Firebase Firestore, Supabase) to enable cross-device access and data durability. | High |
| **Autosave** | Implement debounced autosave with visual timestamp indicator (e.g., "Last saved 2 minutes ago"). | High |
| **More Templates** | Add 5–10 additional templates including academic CV, single-column minimal, and creative portfolio styles. | Medium |
| **Multi-Page Resumes** | Support automatic page-breaking for longer resumes, maintaining consistent headers/footers across pages. | Medium |
| **Undo/Redo** | Implement an action history stack to support undo/redo operations in the editor. | Medium |

### 3.2 Medium-Term Enhancements (Future Versions)

| Enhancement | Description | Priority |
|:---|:---|:---|
| **Resume Import** | Allow users to upload an existing PDF or DOCX resume and auto-parse it into structured form fields using AI. | High |
| **Multi-Language AI** | Support AI content generation in multiple languages (Hindi, Spanish, French, German, etc.). | Medium |
| **Cover Letter Builder** | Add a companion tool to generate cover letters tailored to specific job descriptions, sharing context with the resume. | Medium |
| **ATS Score Checker** | Analyze the resume against common ATS parsing rules and provide a compatibility score with improvement suggestions. | Medium |
| **Custom Fonts** | Allow users to select from a curated set of Google Fonts for their resume typography. | Low |
| **Custom Sections** | Let users add custom sections (e.g., Projects, Certifications, Publications, Volunteer Work) beyond the default five. | Medium |

### 3.3 Long-Term Vision

| Enhancement | Description | Priority |
|:---|:---|:---|
| **Job Matching** | Analyze the user's resume against job listings and suggest matching positions, highlighting skill gaps. | Low |
| **Collaboration** | Enable shared editing with role-based permissions (e.g., Career Advisor can provide inline comments). | Low |
| **Analytics Dashboard** | Show users how their shared resume link performs (views, downloads, geographic distribution). | Low |
| **Mobile App** | Build a Progressive Web App (PWA) or React Native app for a native mobile experience. | Low |
| **API/Webhooks** | Expose a REST API for third-party integrations (e.g., LinkedIn profile sync, job board submission). | Low |

---

## 4. Future Applications

Beyond individual resume building, the CVera platform can be extended to serve broader use cases:

### 4.1 Educational Institutions

- **Career Services Integration:** Universities can deploy CVera as a branded tool for their placement cells, helping students build resumes with the institution's templates and branding.
- **Classroom Tool:** Faculty can use CVera in professional development courses to teach resume writing best practices with instant visual feedback.

### 4.2 Recruitment Agencies

- **Candidate Profiling:** Recruitment firms can use CVera to standardize candidate resume formats, making it easier to present candidates to clients with consistent layouts.
- **Bulk Processing:** With backend integration, agencies could manage portfolios of candidate resumes at scale.

### 4.3 HR Departments

- **Internal Mobility:** Employees can use CVera to maintain updated internal profiles for promotions, transfers, and project staffing decisions.
- **Onboarding:** New hires can use CVera to create standardized profiles as part of the onboarding process.

### 4.4 Freelance Platforms

- **Profile Builder:** Freelance marketplaces (e.g., Upwork, Fiverr) could integrate CVera to help freelancers create compelling profile summaries and downloadable portfolios.

---

## 5. Conclusion

CVera v1.0 successfully delivers a functional, AI-powered resume builder with a premium user experience. However, the client-side-only architecture, while offering simplicity and privacy, introduces significant limitations around data durability and cross-device access. The most critical future enhancement is migrating to a cloud-based data layer to ensure users never lose their resume data.

The AI integration with Google Gemini adds substantial value but can be further enhanced with contextual awareness, multi-language support, and advanced features like ATS scoring. The modular, component-based architecture of the codebase makes it well-positioned for iterative feature additions without requiring major rewrites.

---

> **Document End** — CVera AI Resume Builder Limitations & Future Applications v1.0
