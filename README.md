# AI-Resume-Builder

![React](https://img.shields.io/badge/-React-blue?logo=react&logoColor=white)

## 📝 Description

AI-Resume-Builder is a powerful React-based web application designed to streamline the job application process by leveraging artificial intelligence. This platform provides users with an intuitive interface to craft professional, high-impact resumes tailored to their specific career goals. With integrated secure authentication, users can save their progress and manage multiple versions of their professional profiles seamlessly across the web. Whether you are a student or a seasoned professional, AI-Resume-Builder simplifies resume creation, ensuring you stand out to recruiters with minimal effort.

## ✨ Features

- 🔐 Auth
- 🕸️ Web


## 🛠️ Tech Stack

- ⚛️ React


## 📦 Key Dependencies

```
@clerk/clerk-react: ^5.2.4
@google/generative-ai: ^0.12.0
@radix-ui/react-alert-dialog: ^1.0.5
@radix-ui/react-dialog: ^1.0.5
@radix-ui/react-dropdown-menu: ^2.0.6
@radix-ui/react-popover: ^1.0.7
@radix-ui/react-slot: ^1.0.2
@smastrom/react-rating: ^1.5.0
axios: ^1.7.2
class-variance-authority: ^0.7.0
clsx: ^2.1.1
lucide-react: ^0.394.0
next-themes: ^0.3.0
react: ^18.2.0
react-dom: ^18.2.0
```

## 🚀 Run Commands

- **dev**: `npm run dev`
- **build**: `npm run build`
- **lint**: `npm run lint`
- **preview**: `npm run preview`


## 📁 Project Structure

```
.
├── components.json
├── index.html
├── jsconfig.json
├── package.json
├── postcss.config.js
├── public
│   ├── cv.png
│   └── logo.svg
├── service
│   ├── AIModal.js
│   └── GlobalApi.js
├── src
│   ├── App.css
│   ├── App.jsx
│   ├── assets
│   │   └── react.svg
│   ├── auth
│   │   └── sign-in
│   │       └── index.jsx
│   ├── components
│   │   ├── custom
│   │   │   └── Header.jsx
│   │   └── ui
│   │       ├── alert-dialog.jsx
│   │       ├── button.jsx
│   │       ├── dialog.jsx
│   │       ├── dropdown-menu.jsx
│   │       ├── input.jsx
│   │       ├── popover.jsx
│   │       ├── sonner.jsx
│   │       └── textarea.jsx
│   ├── context
│   │   └── ResumeInfoContext.jsx
│   ├── dashboard
│   │   ├── components
│   │   │   ├── AddResume.jsx
│   │   │   └── ResumeCardItem.jsx
│   │   ├── index.jsx
│   │   └── resume
│   │       ├── [resumeId]
│   │       │   └── edit
│   │       │       └── index.jsx
│   │       └── components
│   │           ├── FormSection.jsx
│   │           ├── ResumePreview.jsx
│   │           ├── RichTextEditor.jsx
│   │           ├── ThemeColor.jsx
│   │           ├── forms
│   │           │   ├── Education.jsx
│   │           │   ├── Experience.jsx
│   │           │   ├── PersonalDetail.jsx
│   │           │   ├── Skills.jsx
│   │           │   └── Summery.jsx
│   │           └── preview
│   │               ├── EducationalPreview.jsx
│   │               ├── ExperiencePreview.jsx
│   │               ├── PersonalDetailPreview.jsx
│   │               ├── SkillsPreview.jsx
│   │               └── SummeryPreview.jsx
│   ├── data
│   │   └── dummy.jsx
│   ├── home
│   │   └── index.jsx
│   ├── index.css
│   ├── lib
│   │   └── utils.js
│   ├── main.jsx
│   └── my-resume
│       └── [resumeId]
│           └── view
│               └── index.jsx
├── tailwind.config.js
└── vite.config.js
```

## 🛠️ Development Setup

### Node.js/JavaScript Setup
1. Install Node.js (v18+ recommended)
2. Install dependencies: `npm install` or `yarn install`
3. Start development server: (Check scripts in `package.json`, e.g., `npm run dev`)


## 👥 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/Dabral2005/AI-Resume-Builder.git`
3. **Create** a new branch: `git checkout -b feature/your-feature`
4. **Commit** your changes: `git commit -am 'Add some feature'`
5. **Push** to your branch: `git push origin feature/your-feature`
6. **Open** a pull request

Please ensure your code follows the project's style guidelines and includes tests where applicable.

---

