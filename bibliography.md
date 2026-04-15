# Project Bibliography / Tech Stack - CVera 🚀

This document outlines the core technologies, frameworks, APIs, and libraries used to build and manage the CVera project based on its dependency tree and service configurations.

## Core Architecture & Frameworks
- **React (v18.2)**: The core JavaScript library used for building the user interface.
- **Vite (v5.2)**: The fast frontend build tool and development server providing hot-module replacement (HMR).
- **React Router DOM (v6.23)**: Handles all client-side page routing (e.g., navigating between Dashboard, Editor, and Preview).

## Authentication & Identity
- **Clerk (`@clerk/clerk-react`)**: A comprehensive User Management and Authentication platform handling user sign-ups, sign-ins (e.g., Google Auth), and securing routes.

## AI & Machine Learning Integrations
- **Google Generative AI SDK (`@google/generative-ai`)**: Connects the app to Google's highly performant AI models.
- **Model Used**: Specifically utilizing `gemini-1.5-flash` (configured in `service/AIModal.js`) to generate dynamic resume summaries, optimize experience descriptions, and suggest keywords intelligently.

## UI / Styling & Design System
- **Tailwind CSS (v3.4)**: The primary mechanism for styling components utilizing a utility-first approach.
- **Radix UI**: Foundational unstyled React building block primitives ensuring accessibility (includes `Alert Dialog`, `Dialog`, `Popover`, `Dropdown Menu`).
- **Class Variance Authority & Tailwind Merge / clsx**: Used together to confidently assemble component class names dynamically (pattern characteristic of `shadcn/ui` components).
- **Lucide React**: The unified, scalable vector graphics icon system.
- **Next Themes**: Handles the Dark/Light theme toggle gracefully in React.

## Form Elements & Interactive Components
- **React Simple WYSIWYG**: A lightweight Rich Text Editor leveraged within the "Work Experience" section for formatting descriptions.
- **React Rating (`@smastrom/react-rating`)**: Provides the interactive 5-star visual rating input used in the "Skills" section.
- **Sonner (`sonner`)**: An opinionated, beautifully animated toast notification system providing feedback on validation and save states.

## Exporting & Sharing
- **React to PDF (`react-to-pdf`)**: Used to convert the visually rendered HTML DOM of the resume into a downloadable PDF format.
- **React Web Share (`react-web-share`)**: Enables invoking the device's native sharing dialog (e.g., on mobile phones or modern browsers) to send resume links.

## Data Persistence & HTTP
- **Local Storage API**: Configured in `service/GlobalApi.js` to mock a backend database (simulating standard CRUD endpoints). Holds all structured resume JSON locally under the key `ai_resume_builder_resumes`.
- **Axios**: Included for generic REST API fetching operations, should the backend switch to a dedicated remote HTTP service. 
