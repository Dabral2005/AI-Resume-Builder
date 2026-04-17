# CVera — AI Resume Builder: Design Document

**Project Name:** CVera — AI Resume Builder  
**Version:** 1.0  
**Author:** Mohit Dabral  
**Date:** April 2026  

---

## Table of Contents

1. [Introduction](#1-introduction)  
2. [System Overview](#2-system-overview)  
3. [System Architecture](#3-system-architecture)  
4. [Module Design](#4-module-design)  
5. [Component Hierarchy](#5-component-hierarchy)  
6. [Data Design](#6-data-design)  
7. [User Interface Design](#7-user-interface-design)  
8. [API & Service Layer Design](#8-api--service-layer-design)  
9. [Security Design](#9-security-design)  
10. [Error Handling Strategy](#10-error-handling-strategy)  
11. [Deployment Architecture](#11-deployment-architecture)  

---

## 1. Introduction

### 1.1 Purpose

This Design Document provides a comprehensive technical blueprint for **CVera**, an AI-powered resume builder web application. It details the system architecture, module decomposition, data structures, user interface design, service integrations, and deployment strategy adopted to build a production-grade, client-side web application.

### 1.2 Scope

The document covers the design of the following system capabilities:

- User authentication and session handling via Clerk.
- AI-assisted resume content generation via Google Gemini.
- A multi-step resume editor with real-time preview.
- Five professional resume templates with theme customization.
- PDF export and link-based sharing of completed resumes.
- Client-side data persistence using Browser LocalStorage.

### 1.3 Definitions & Abbreviations

| Term | Definition |
|:---|:---|
| **SPA** | Single Page Application |
| **API** | Application Programming Interface |
| **CRUD** | Create, Read, Update, Delete |
| **AI** | Artificial Intelligence |
| **LLM** | Large Language Model |
| **UUID** | Universally Unique Identifier |
| **LocalStorage** | Browser Web Storage API for persisting key-value data |
| **Clerk** | Third-party authentication-as-a-service platform |
| **Gemini** | Google's generative AI model family |

### 1.4 Design Goals

| Goal | Description |
|:---|:---|
| **Modularity** | Self-contained components with clear responsibility boundaries. |
| **Responsiveness** | Fully adaptive layouts for mobile, tablet, and desktop viewports. |
| **Performance** | Client-side data storage eliminates network latency for CRUD operations. |
| **Extensibility** | Template-based architecture allows adding new resume layouts without modifying core logic. |
| **User Experience** | Polished UI with micro-animations, glass morphism, and gradient accents for a premium feel. |

---

## 2. System Overview

CVera is a **React-based Single Page Application** that enables users to create, edit, preview, and export professional resumes with the assistance of AI. The application follows a client-side-first architecture where all resume data is persisted in the browser's LocalStorage, while authentication is delegated to Clerk and AI generation is handled by Google Gemini's API.

### 2.1 High-Level Workflow

```
┌──────────┐     ┌──────────────┐     ┌──────────────────┐     ┌────────────────┐
│   User   │────▶│  Landing     │────▶│  Authentication  │────▶│   Dashboard    │
│          │     │  Page (Home) │     │  (Clerk Sign-In) │     │  (Resume List) │
└──────────┘     └──────────────┘     └──────────────────┘     └───────┬────────┘
                                                                       │
                                                          ┌────────────▼────────────┐
                                                          │   Resume Editor          │
                                                          │  ┌──────────┬─────────┐  │
                                                          │  │Form      │ Live    │  │
                                                          │  │Section   │ Preview │  │
                                                          │  └──────────┴─────────┘  │
                                                          └────────────┬────────────┘
                                                                       │
                                                          ┌────────────▼────────────┐
                                                          │   View / Export Resume   │
                                                          │   (PDF / Share Link)     │
                                                          └─────────────────────────┘
```

### 2.2 Technology Stack

| Layer | Technology | Version |
|:---|:---|:---|
| **UI Library** | React.js | 18.2 |
| **Build Tool** | Vite | 5.2 |
| **Routing** | React Router DOM | 6.23 |
| **Styling** | Tailwind CSS + Vanilla CSS | 3.4 |
| **UI Primitives** | Radix UI (shadcn/ui pattern) | Latest |
| **Icons** | Lucide React | 0.394 |
| **Authentication** | Clerk (`@clerk/clerk-react`) | 5.2 |
| **AI Engine** | Google Generative AI (Gemini 1.5 Flash) | 0.12 |
| **State Management** | React Context API | — |
| **Data Persistence** | Browser LocalStorage | — |
| **PDF Export** | `window.print()` / `react-to-pdf` | — |
| **Sharing** | React Web Share | 2.0 |
| **Notifications** | Sonner | 1.5 |
| **Rich Text** | React Simple WYSIWYG | 3.0 |
| **Ratings** | `@smastrom/react-rating` | 1.5 |

---

## 3. System Architecture

### 3.1 Architectural Pattern

The application follows a **Component-Based Architecture** with a clear separation of concerns across three layers:

```
┌─────────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                          │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌─────────────┐  │
│  │   Home     │ │  Dashboard │ │   Editor   │ │  View/Share │  │
│  │   Page     │ │   Page     │ │   Page     │ │   Page      │  │
│  └────────────┘ └────────────┘ └────────────┘ └─────────────┘  │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐                  │
│  │  Privacy   │ │   Terms    │ │  Support   │  (Legal Pages)   │
│  └────────────┘ └────────────┘ └────────────┘                  │
├─────────────────────────────────────────────────────────────────┤
│                      APPLICATION LAYER                          │
│  ┌──────────────────┐  ┌──────────────────┐                    │
│  │  ResumeInfo      │  │   FormSection    │                    │
│  │  Context (State) │  │   Controller     │                    │
│  └──────────────────┘  └──────────────────┘                    │
├─────────────────────────────────────────────────────────────────┤
│                       SERVICE LAYER                             │
│  ┌──────────────────┐  ┌──────────────────┐                    │
│  │   GlobalApi.js   │  │   AIModal.js     │                    │
│  │  (CRUD via       │  │  (Gemini AI      │                    │
│  │   LocalStorage)  │  │   Integration)   │                    │
│  └──────────────────┘  └──────────────────┘                    │
├─────────────────────────────────────────────────────────────────┤
│                    EXTERNAL SERVICES                            │
│  ┌──────────────────┐  ┌──────────────────┐                    │
│  │   Clerk Auth     │  │  Google Gemini   │                    │
│  │   Service        │  │  API             │                    │
│  └──────────────────┘  └──────────────────┘                    │
├─────────────────────────────────────────────────────────────────┤
│                      DATA LAYER                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │     Browser LocalStorage                                 │   │
│  │     Key: "ai_resume_builder_resumes" → JSON Array        │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Design Patterns Used

| Pattern | Application |
|:---|:---|
| **Context Provider** | `ResumeInfoContext` provides global resume state across the Editor and Preview sub-trees. |
| **Service Abstraction** | `GlobalApi.js` wraps LocalStorage behind a Promise-based API mirroring REST endpoints. |
| **Template Method** | `ResumePreview.jsx` delegates rendering to one of five template components via a switch-based factory. |
| **Observer (Reactive)** | React's `useState` / `useEffect` hooks propagate state changes through the component tree reactively. |
| **Protected Routes** | `App.jsx` checks `isSignedIn` from Clerk and redirects unauthenticated users to `/auth/sign-in`. |

---

## 4. Module Design

### 4.1 Module Decomposition

The application is decomposed into the following logical modules:

| Module | Directory | Responsibility |
|:---|:---|:---|
| **Authentication** | `src/auth/` | Clerk-based sign-in UI and redirect logic. |
| **Landing Page** | `src/home/` | Public marketing page with hero, features, testimonials, CTA sections. |
| **Dashboard** | `src/dashboard/` | Resume list management — create, view, delete resumes. |
| **Resume Editor** | `src/dashboard/resume/` | Multi-step form editor with live preview. |
| **Resume Forms** | `src/dashboard/resume/components/forms/` | Five data entry forms (Personal, Summary, Experience, Education, Skills). |
| **Resume Preview** | `src/dashboard/resume/components/preview/` | Section-level preview components rendering resume data. |
| **Resume Templates** | `src/dashboard/resume/components/templates/` | Five complete resume layout templates (Template1–Template5). |
| **View & Share** | `src/my-resume/` | Final resume preview with PDF export and web sharing. |
| **Legal Pages** | `src/pages/` | Privacy Policy, Terms of Service, and Support pages. |
| **UI Components** | `src/components/ui/` | Reusable shadcn/ui-based primitives (Button, Input, Dialog, etc.). |
| **Custom Components** | `src/components/custom/` | Application-specific shared components (Header). |
| **Context** | `src/context/` | React Context provider for global resume state. |
| **Service** | `service/` | API abstraction (GlobalApi) and AI integration (AIModal). |
| **Data** | `src/data/` | Dummy/mock data for template previews. |

### 4.2 Module Interaction Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                         main.jsx                             │
│                    (Router + ClerkProvider)                   │
└──────────────┬───────────────┬───────────────┬───────────────┘
               │               │               │
        ┌──────▼──────┐ ┌─────▼──────┐ ┌──────▼──────┐
        │   Home      │ │    App     │ │  SignInPage  │
        │  (Public)   │ │ (Protected)│ │  (Auth)      │
        └─────────────┘ └─────┬──────┘ └─────────────┘
                              │
                    ┌─────────▼─────────┐
                    │                   │
              ┌─────▼─────┐     ┌──────▼──────┐
              │ Dashboard │     │ EditResume  │
              │           │     │             │
              └─────┬─────┘     └──────┬──────┘
                    │                  │
              ┌─────▼─────┐    ┌──────▼──────────────┐
              │ AddResume  │    │ ResumeInfoContext   │
              │ ResumeCard │    │   Provider          │
              └────────────┘    └───┬─────────────┬──┘
                                    │             │
                              ┌─────▼─────┐ ┌────▼────────┐
                              │FormSection│ │ResumePreview│
                              └─────┬─────┘ └─────────────┘
                                    │
                 ┌──────────────────┼──────────────────┐
                 │                  │                   │
          ┌──────▼──────┐  ┌───────▼──────┐  ┌────────▼─────┐
          │PersonalDetail│ │  Experience  │  │   Skills     │
          │  Summery     │ │  Education   │  │              │
          └──────────────┘ └──────────────┘  └──────────────┘
```

### 4.3 Detailed Module Descriptions

#### 4.3.1 Authentication Module (`src/auth/`)

| Aspect | Detail |
|:---|:---|
| **Component** | `SignInPage` |
| **Responsibility** | Renders Clerk's `<SignIn>` component within a branded page layout. |
| **Integration** | Uses `@clerk/clerk-react` `SignIn` component with custom appearance overrides. |
| **Navigation** | After successful sign-in, Clerk redirects user to `/dashboard`. |

#### 4.3.2 Dashboard Module (`src/dashboard/`)

| Aspect | Detail |
|:---|:---|
| **Components** | `Dashboard`, `AddResume`, `ResumeCardItem`, `MiniResumePreview` |
| **Responsibility** | Lists all user resumes, provides create/delete operations. |
| **Data Flow** | Calls `GlobalApi.GetUserResumes(email)` on mount; Filters resumes by authenticated user's email. |
| **Resume Creation** | `AddResume` generates a UUID via `uuid` library, calls `GlobalApi.CreateNewResume()`, and navigates to the editor. |
| **Resume Deletion** | `ResumeCardItem` calls `GlobalApi.DeleteResumeById()` after confirmation via `AlertDialog`. |

#### 4.3.3 Resume Editor Module (`src/dashboard/resume/`)

| Aspect | Detail |
|:---|:---|
| **Components** | `EditResume`, `FormSection`, `ResumePreview`, `ThemeColor`, `TemplateSelector` |
| **Layout** | Two-column grid: Form (left) + Live Preview (right). |
| **State Management** | `ResumeInfoContext.Provider` wraps both columns, enabling bidirectional data flow. |
| **Step Navigation** | `FormSection` manages a 5-step wizard: Personal → Summary → Experience → Education → Skills. |
| **Step Indicator** | Visual stepper with active/completed/inactive states and animated connecting lines. |
| **Theme Control** | `ThemeColor` popover: 20 selectable colors persisted via `GlobalApi.UpdateResumeDetail()`. |
| **Template Control** | `TemplateSelector` popover: 5 templates (Professional, Modern Clean, Creative, Executive, Minimalist). |

#### 4.3.4 Form Modules (`src/dashboard/resume/components/forms/`)

| Form Component | Fields | Special Features |
|:---|:---|:---|
| `PersonalDetail.jsx` | First Name, Last Name, Job Title, Address, Phone, Email | Regex validation for phone (`^\\+?[\\d\\s()-]{7,15}$`) and email; `type="tel"` and `type="email"` inputs. |
| `Summery.jsx` | Summary text, AI Generate button | Calls Gemini AI to generate 3 summaries at different experience levels (Senior, Mid, Fresher). Falls back to mock data if no API key. |
| `Experience.jsx` | Position Title, Company, City, State, Start Date, End Date, Currently Working, Work Summary | Rich text editor for work summary; AI-powered bullet point generation; Date validation (end ≥ start). |
| `Education.jsx` | University, Degree, Major, Start Date, End Date, Description | Date validation constraints; Multiple entries supported. |
| `Skills.jsx` | Skill Name, Proficiency Rating (0–5) | Star-based rating input via `@smastrom/react-rating`; Dynamic add/remove entries. |

#### 4.3.5 Template Module (`src/dashboard/resume/components/templates/`)

| Template | Style | Key Characteristics |
|:---|:---|:---|
| `Template1` | Professional | Classic layout with theme-colored header bar and section borders. |
| `Template2` | Modern Clean | Two-column layout with sidebar styling. |
| `Template3` | Creative | Bold section headers with creative typography. |
| `Template4` | Executive | Formal, corporate-style with conservative spacing. |
| `Template5` | Minimalist | Ultra-clean with minimal decoration and maximum whitespace. |

All templates receive `resumeInfo` as a prop and render: Personal Details, Summary, Experience, Education, and Skills sections using the resume's `themeColor`.

#### 4.3.6 View & Share Module (`src/my-resume/`)

| Aspect | Detail |
|:---|:---|
| **Component** | `ViewResume` |
| **Features** | Success banner, PDF download (`window.print()`), Web Share API integration. |
| **Print Handling** | Uses CSS `@media print` rules to hide UI chrome and show only the resume content. |
| **Sharing** | Uses `RWebShare` component to invoke native device share dialogs. |

---

## 5. Component Hierarchy

```
<ClerkProvider>
  <RouterProvider>
    │
    ├── /                    → <Home />
    │                           └── <Header />
    │
    ├── /auth/sign-in        → <SignInPage />
    │
    ├── /dashboard           → <App /> (Protected)
    │   └── <Header />          ├── <Dashboard />
    │   └── <Toaster />         │   ├── <AddResume />
    │   └── <Outlet />          │   └── <ResumeCardItem /> (×N)
    │                           │       └── <MiniResumePreview />
    │
    ├── /dashboard/resume/:id/edit → <App /> (Protected)
    │                                  └── <EditResume />
    │                                      └── <ResumeInfoContext.Provider>
    │                                          ├── <FormSection />
    │                                          │   ├── <ThemeColor />
    │                                          │   ├── <TemplateSelector />
    │                                          │   ├── <PersonalDetail />
    │                                          │   ├── <Summery />
    │                                          │   ├── <Experience />
    │                                          │   │   └── <RichTextEditor />
    │                                          │   ├── <Education />
    │                                          │   └── <Skills />
    │                                          └── <ResumePreview />
    │                                              └── <Template1–5 /> (conditional)
    │
    ├── /my-resume/:id/view  → <ViewResume />
    │                           ├── <Header />
    │                           └── <ResumePreview />
    │
    ├── /privacy             → <Privacy />
    ├── /terms               → <Terms />
    └── /support             → <Support />
```

---

## 6. Data Design

### 6.1 Entity Relationship Overview

```
┌────────────┐        ┌──────────────────────────────┐
│    User     │  1──M  │          Resume               │
│  (Clerk)    │───────▶│                                │
│             │        │  ┌───────────────────────────┐ │
│ • userId    │        │  │     Experience[ ]          │ │
│ • email     │        │  │     • title, company       │ │
│ • firstName │        │  │     • dates, workSummery   │ │
│ • lastName  │        │  ├───────────────────────────┤ │
│ • imageUrl  │        │  │     Education[ ]           │ │
│             │        │  │     • university, degree    │ │
│             │        │  │     • major, dates          │ │
│             │        │  ├───────────────────────────┤ │
│             │        │  │     Skills[ ]               │ │
│             │        │  │     • name, rating          │ │
│             │        │  └───────────────────────────┘ │
└────────────┘        └──────────────────────────────┘
```

### 6.2 Resume Data Object Schema

```json
{
  "id": 1713345678901,
  "documentId": "a1b2c3d4-e5f6-7890-abcd-1234567890ef",
  "userEmail": "user@example.com",
  "userName": "John Doe",
  "title": "My Tech Resume",
  "firstName": "John",
  "lastName": "Doe",
  "jobTitle": "Full Stack Developer",
  "email": "john@example.com",
  "phone": "+1 1234567890",
  "address": "525 N Tryon Street, NC 28117",
  "themeColor": "#7c3aed",
  "templateName": "Template1",
  "summery": "Results-driven developer with 5+ years...",
  "Experience": [
    {
      "id": 1,
      "title": "Full Stack Developer",
      "companyName": "Amazon",
      "city": "New York",
      "state": "NY",
      "startDate": "2021-01-10",
      "endDate": "",
      "currentlyWorking": true,
      "workSummery": "<ul><li>Developed and maintained...</li></ul>"
    }
  ],
  "education": [
    {
      "id": 1,
      "universityName": "MIT",
      "degree": "Master",
      "major": "Computer Science",
      "startDate": "2018-08-15",
      "endDate": "2019-12-20",
      "description": "Focus on AI and ML coursework."
    }
  ],
  "skills": [
    {
      "id": 1,
      "name": "React",
      "rating": 5
    }
  ],
  "createdAt": "2026-04-17T10:30:00.000Z"
}
```

### 6.3 Storage Strategy

| Aspect | Implementation |
|:---|:---|
| **Storage Medium** | Browser LocalStorage |
| **Storage Key** | `ai_resume_builder_resumes` |
| **Format** | JSON-serialized array of Resume objects |
| **Operations** | `JSON.parse()` on read; `JSON.stringify()` on write |
| **Capacity** | ~5–10 MB (browser-dependent) |
| **Scope** | Per-origin; data is browser-specific and not synced across devices |

---

## 7. User Interface Design

### 7.1 Design System

The UI follows a **Premium Violet & Slate** design system with the following core tokens:

#### 7.1.1 Color Palette

| Token | Value | Usage |
|:---|:---|:---|
| **Primary Gradient** | `#7c3aed → #a855f7 → #c084fc` | Buttons, CTAs, accents |
| **Hero Background** | `#0f0c29 → #1a1145 → #24243e` | Landing page hero, sign-in page |
| **Emerald Success** | `#10b981` | Completed steps, success states |
| **Slate Text** | `#1e293b` (dark), `#64748b` (muted) | Body text, secondary text |
| **Card Background** | `#ffffff` with `1px solid #f1f5f9` border | Card surfaces |

#### 7.1.2 Typography

| Element | Font | Weight |
|:---|:---|:---|
| **Body** | Inter | 400 (Regular) |
| **Headings** | Plus Jakarta Sans | 700–800 (Bold/ExtraBold) |
| **Monospace** | System default | Code blocks |

#### 7.1.3 Spacing & Shapes

| Token | Value |
|:---|:---|
| **Border Radius** | `0.75rem` (base), `1rem` (cards), `1.5rem` (large elements) |
| **Card Shadow** | `0 1px 3px rgba(0,0,0,0.06), 0 6px 16px rgba(0,0,0,0.04)` |
| **Hover Shadow** | `0 8px 40px rgba(124, 58, 237, 0.15)` |

#### 7.1.4 Animations

| Animation | Keyframes | Duration | Usage |
|:---|:---|:---|:---|
| `fadeInUp` | opacity 0→1, translateY 30→0 | 0.6s | Page entry transitions |
| `fadeIn` | opacity 0→1 | 0.5s | Component mount |
| `slideInLeft` | opacity 0→1, translateX -30→0 | 0.5s | Sidebar panels |
| `shimmer` | background-position sweep | 2s (∞) | Loading skeletons |
| `pulse-glow` | box-shadow pulse | 2s (∞) | Interactive highlights |
| `float` | translateY 0→-10→0 | 3s (∞) | Decorative elements |

### 7.2 Page Layouts

#### 7.2.1 Landing Page (`/`)

| Section | Description |
|:---|:---|
| **Header** | Sticky glass-morphism nav with logo, Dashboard/Get Started CTA. |
| **Hero** | Dark gradient background with decorative blur orbs, animated badge, headline, subtitle, dual CTA buttons, stats row. |
| **How It Works** | Three-card grid explaining the 3-step process (Template → AI Fill → Download). |
| **Features** | Six feature cards in a responsive grid with hover animations. |
| **Testimonials** | Three testimonial cards with star ratings and user avatars. |
| **CTA Banner** | Dark gradient card with call-to-action to start building. |
| **Footer** | Minimal footer with logo, privacy/terms/support links, copyright. |

#### 7.2.2 Dashboard (`/dashboard`)

| Section | Description |
|:---|:---|
| **Welcome Banner** | Gradient purple header with personalized greeting. |
| **Resume Grid** | Responsive grid (2–5 columns) of resume cards with miniature previews. |
| **Add Resume Card** | Dashed-border card with `+` icon; Opens a dialog for entering resume title. |
| **Empty State** | Illustrated message when no resumes exist. |
| **Loading State** | Animated pulse skeleton placeholders during data fetch. |

#### 7.2.3 Resume Editor (`/dashboard/resume/:id/edit`)

| Section | Description |
|:---|:---|
| **Top Actions Bar** | Home button, Theme Color picker, Template Selector, Back/Next navigation. |
| **Step Indicator** | 5-step horizontal stepper (Personal → Summary → Experience → Education → Skills) with icons & progress lines. |
| **Form Panel (Left)** | Active form component based on current step index. |
| **Preview Panel (Right)** | Live-updating resume preview using the selected template. |

#### 7.2.4 View Resume (`/my-resume/:id/view`)

| Section | Description |
|:---|:---|
| **Success Banner** | Large celebratory card with checkmark, headline, Download PDF & Share Profile buttons. |
| **Document Preview** | Framed resume preview with decorative shadow and label. |

### 7.3 Responsive Breakpoints

| Breakpoint | Columns (Dashboard Grid) | Editor Layout |
|:---|:---|:---|
| `< 768px` (Mobile) | 2 columns | Single column (stacked) |
| `768px–1024px` (Tablet) | 3 columns | Two columns |
| `1024px–1280px` (Desktop) | 4 columns | Two columns |
| `> 1280px` (Wide) | 5 columns | Two columns |

---

## 8. API & Service Layer Design

### 8.1 GlobalApi — Data Service (`service/GlobalApi.js`)

A Promise-based API abstraction over Browser LocalStorage mimicking REST endpoints:

| Method | Signature | Operation | Description |
|:---|:---|:---|:---|
| `CreateNewResume` | `(data) → Promise` | **CREATE** | Generates a new resume with default fields (`themeColor: #7c3aed`, empty arrays for Experience/Education/Skills), appends to storage. |
| `GetUserResumes` | `(userEmail) → Promise` | **READ** | Filters all stored resumes by `userEmail` and returns matching entries. |
| `GetResumeById` | `(documentId) → Promise` | **READ** | Finds a single resume by its `documentId`. |
| `UpdateResumeDetail` | `(documentId, data) → Promise` | **UPDATE** | Merges `data.data` fields into the matching resume object. |
| `DeleteResumeById` | `(documentId) → Promise` | **DELETE** | Removes the resume with matching `documentId` from the array. |

**Internal helpers:**
- `getResumes()` — Reads and parses the JSON array from `localStorage.getItem('ai_resume_builder_resumes')`.
- `saveResumes(resumes)` — Serializes and writes the array via `localStorage.setItem()`.

### 8.2 AIModal — AI Service (`service/AIModal.js`)

| Aspect | Detail |
|:---|:---|
| **Provider** | Google Generative AI (`@google/generative-ai`) |
| **Model** | `gemini-1.5-flash` |
| **Configuration** | Temperature: 1.0, Top-P: 0.95, Top-K: 64, Max Tokens: 8192 |
| **Response Format** | `application/json` (for structured parsing) |
| **Session** | Stateful chat session via `model.startChat()` |
| **Fallback** | If API key is missing/invalid, exports `null` session + mock response generators. |

**Exported Functions:**

| Export | Purpose |
|:---|:---|
| `AIChatSession` | Active Gemini chat session (or `null`). |
| `mockSummaryResponse(jobTitle)` | Returns 3 pre-built summary variants (Senior/Mid/Fresher) for the given job title. |
| `mockExperienceResponse(positionTitle)` | Returns HTML bullet points for experience descriptions. |

### 8.3 External Service Integrations

```
┌─────────────────┐         HTTPS          ┌──────────────────┐
│   CVera Client  │◄══════════════════════▶│   Clerk Auth     │
│   (Browser)     │   Session Management   │   Service        │
│                 │                         └──────────────────┘
│                 │         HTTPS
│                 │◄══════════════════════▶┌──────────────────┐
│                 │   AI Content Gen       │  Google Gemini   │
│                 │                         │  API             │
└─────────────────┘                        └──────────────────┘
```

---

## 9. Security Design

### 9.1 Authentication Flow

```
User → Landing Page → "Get Started" → Clerk Sign-In Page
                                           │
                                    Clerk OAuth / Email
                                           │
                                    ┌──────▼──────┐
                                    │ isSignedIn? │
                                    └──────┬──────┘
                                   Yes     │     No
                              ┌────────────┤────────────────┐
                              ▼                             ▼
                        Dashboard                   Redirect to
                                                   /auth/sign-in
```

### 9.2 Security Measures

| Measure | Implementation |
|:---|:---|
| **Route Protection** | `App.jsx` checks `isSignedIn` via Clerk's `useUser()` hook; unauthenticated users are redirected to `/auth/sign-in`. |
| **API Key Protection** | Environment variables (`VITE_CLERK_PUBLISHABLE_KEY`, `VITE_GOOGLE_AI_API_KEY`) are loaded via Vite's `import.meta.env` and never committed to source control. |
| **User Isolation** | Resume data is filtered by `userEmail` — each user can only access their own resumes. |
| **Input Validation** | Client-side regex validation on phone (`7–15 digits`), email (standard format), date range constraints (end ≥ start), and required field checks. |
| **AI Key Validation** | `AIModal.js` validates the API key exists, is non-empty, and has length > 10 before initializing the Gemini session. |
| **Error Boundaries** | Try-catch blocks around AI session initialization to prevent crashes if the API key is malformed. |

---

## 10. Error Handling Strategy

### 10.1 Error Categories

| Category | Handling Approach |
|:---|:---|
| **Validation Errors** | `toast.error()` notifications via Sonner with field-specific messages (e.g., "Experience #2: End date must be after start date"). |
| **API Errors** | Promise `.catch()` handlers reset loading states and display toast errors. |
| **AI Service Unavailable** | Falls back to `mockSummaryResponse()` / `mockExperienceResponse()` when `AIChatSession` is `null`. |
| **Auth Not Loaded** | Displays a branded loading spinner ("Initializing AI Builder...") until Clerk loads. |
| **Network Errors** | Since data is stored locally, CRUD operations are inherently offline-capable. Only AI and Auth depend on connectivity. |

### 10.2 User Feedback Mechanisms

| Mechanism | Library | Usage |
|:---|:---|:---|
| **Toast Notifications** | Sonner | Success/error messages for save, delete, theme change, template change operations. |
| **Loading Spinners** | Lucide `Loader2` | Shown during resume creation, deletion, and AI generation. |
| **Skeleton Loaders** | Custom CSS | Animated pulse placeholders on Dashboard during data fetch. |
| **Disabled Buttons** | React state | Form submission buttons are disabled when required fields are empty or during async operations. |

---

## 11. Deployment Architecture

### 11.1 Build & Deploy

| Aspect | Detail |
|:---|:---|
| **Build Command** | `vite build` → outputs optimized static files to `dist/`. |
| **Hosting** | Vercel (configured via `vercel.json`). |
| **SPA Routing** | `vercel.json` rewrites all routes to `index.html` for client-side routing. |
| **Environment** | Production environment variables set in Vercel dashboard. |

### 11.2 Deployment Diagram

```
┌────────────────┐      ┌──────────────────┐
│  Source Code    │      │   Vercel CDN     │
│  (GitHub)      │─────▶│  (Static Files)  │
│                │ Push  │                  │
└────────────────┘      └────────┬─────────┘
                                 │
                          ┌──────▼──────┐
                          │   Browser   │
                          │   (Client)  │
                          └──────┬──────┘
                                 │
                    ┌────────────┼────────────┐
                    │            │            │
             ┌──────▼──┐  ┌─────▼────┐  ┌───▼──────┐
             │  Clerk  │  │  Gemini  │  │  Local   │
             │  Auth   │  │  AI API  │  │  Storage │
             └─────────┘  └──────────┘  └──────────┘
```

### 11.3 Environment Variables

| Variable | Purpose | Required |
|:---|:---|:---|
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk authentication public key | ✅ Yes |
| `VITE_GOOGLE_AI_API_KEY` | Google Gemini AI API key | ❌ No (falls back to mocks) |
| `VITE_STRAPI_API_KEY` | Legacy Strapi key (unused in current version) | ❌ No |
| `VITE_BASE_URL` | Base URL for share link generation | ❌ No |

---

> **Document End** — CVera AI Resume Builder Design Document v1.0
