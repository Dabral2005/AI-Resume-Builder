# Design Document - CVera AI Resume Builder 🎨

This document outlines the architectural design and UI/UX philosophy of the CVera platform.

## 1. System Architecture
CVera is built using a modern, scalable technology stack:
- **Frontend**: React.js 18 with Vite for optimized building and HMR.
- **State Management**: React Context API (`ResumeInfoContext`) manages the shared resume state between the multi-step form editor and the real-time preview panel.
- **Routing**: `react-router-dom` v6 handles client-side navigation.
- **Authentication**: Clerk provides a secure, component-based authentication flow.
- **AI Integration**: Custom service layers connect to the **Google Generative AI (Gemini 1.5 Flash)** SDK for intelligent content generation.
- **Storage/Backend**: Local Storage.

## 2. UI/UX Design Philosophy

### 2.1 The Slate & Indigo Aesthetic
The application follows a premium **Slate & Indigo** design system:
- **Colors**: Deep slates (`#0f172a`) for backgrounds and text, with vibrant indigo (`#4f46e5`) and violet (`#7c3aed`) as primary accent colors.
- **Typography**: Utilizing **Plus Jakarta Sans** and **Inter** for an editorial, modern feel.
- **Glassmorphism**: Subtle use of `backdrop-filter: blur()` and semi-transparent white borders to create depth and modern layering.
- **No-Line Policy**: A minimalist design approach that uses white space and subtle elevation (shadows) instead of heavy grid lines.

### 2.2 Component Hierarchy
- **Dashboard**: Simple, card-based overview of the user's resumes.
- **Resume Editor**:
    - **Progressive Disclosure**: Forms are broken into logical steps (Personal, Experience, Education, Skills).
    - **Live Synchronized Preview**: The right side of the editor updates in real-time as the user types.
- **Preview/Share**: A dedicated view for high-fidelity rendering, optimized for both screen viewing and PDF conversion.

## 3. Data Schema
The primary state object, `ResumeInfo`, follows this structure:

```json
{
  "firstName": "String",
  "lastName": "String",
  "jobTitle": "String",
  "address": "String",
  "phone": "String",
  "email": "String",
  "themeColor": "String",
  "summary": "String",
  "experience": [
    {
      "title": "String",
      "companyName": "String",
      "city": "String",
      "state": "String",
      "startDate": "String",
      "endDate": "String",
      "currentlyWorking": "Boolean",
      "workSummary": "HTML String"
    }
  ],
  "education": [
    {
      "universityName": "String",
      "startDate": "String",
      "endDate": "String",
      "degree": "String",
      "major": "String",
      "description": "String"
    }
  ],
  "skills": [
    {
      "name": "String",
      "rating": "Number"
    }
  ]
}
```

## 4. UI Patterns & Guidelines
- **Buttons**: Consistent use of rounded-xl corners and smooth hover scale effects.
- **Toasts**: `sonner` is utilized for non-intrusive, beautifully animated status feedback.
- **Animations**: CSS keyframes (`fadeInUp`, `pulse-glow`) are used to make the interface feel "alive" and responsive.

---

**CVera - Designing a Professional Future.**
