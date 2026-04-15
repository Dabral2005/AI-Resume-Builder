# AI Resume Builder 🚀

![React](https://img.shields.io/badge/-React-blue?logo=react&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/-TailwindCSS-38B2AC?logo=tailwind-css&logoColor=white)
![Clerk](https://img.shields.io/badge/-Clerk-6C47FF?logo=clerk&logoColor=white)
![Google Gemini](https://img.shields.io/badge/-Google%20Gemini-4285F4?logo=google&logoColor=white)

## 📝 Description

**AI Resume Builder** is a premium, minimal, and highly efficient web application designed for the modern job seeker. Built with a **Slate & Indigo** professional design system, it leverages **Google Gemini AI** to help you craft editorial-grade resumes in minutes. Whether you are a student or a seasoned professional, our application provides a seamless, "no-line" editorial experience that ensures your profile stands out.

## ✨ Key Features

- **🤖 AI-Powered Content**: Generate professional summaries and experience descriptions using Google Gemini AI.
- **🎨 Professional Design System**: A clean, minimal Slate & Indigo aesthetic with smooth hover effects and responsive layouts.
- **📁 Data Persistence**: Optimized profile image handling and real-time form saving to ensure your progress is never lost.
- **🖼️ Diverse Templates**: Multiple editorial-grade resume templates with realistic mock data to visualize your final output.
- **🔐 Secure Authentication**: Integrated with Clerk for a seamless and secure login experience.
- **📄 Export & Share**: High-quality PDF export and live sharing options for easy application.

## 🛠️ Tech Stack

- **Frontend**: React.js, TailwindCSS, Lucide React
- **Authentication**: Clerk Auth
- **AI Integration**: Google Generative AI (Gemini)
- **Styling**: Vanilla CSS + Tailwind Utility Classes
- **State Management**: React Context API
- **Backend API**: Strapi (Managed Storage)

## 📦 Key Dependencies

```json
{
  "@clerk/clerk-react": "^5.2.4",
  "@google/generative-ai": "^0.12.0",
  "lucide-react": "^0.394.0",
  "axios": "^1.7.2",
  "sonner": "^1.4.0",
  "react-router-dom": "^6.23.1"
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- NPM or Yarn

### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/Dabral2005/AI-Resume-Builder.git
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Environment Setup**:
   Create a `.env.local` file and add your API keys:
   ```env
   VITE_STRAPI_API_KEY=your_strapi_key
   VITE_GOOGLE_AI_API_KEY=your_gemini_key
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
   ```
4. **Run development server**:
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```text
├── src
│   ├── components      # UI and Custom Shared Components
│   ├── dashboard       # Dashboard and Resume Editor
│   │   ├── components  # Resume Forms & Preview logic
│   │   └── resume      # Resume-specific routing
│   ├── context         # Global State (ResumeInfoContext)
│   ├── home            # Professional Landing Page
│   ├── my-resume       # Final Preview & Share views
│   └── service         # AI & Backend API integrations
```

## 👥 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

# 🖼️ Brand Experience
*The UI has been recently upgraded to a Professional Slate & Indigo theme. Below are highlights of the editorial experience:*

- **Minimalist Dashboard**: Clean card-based management.
- **AI Assistant**: Smart content generation integrated directly into the editor.
- **Editorial Templates**: Modern, high-contrast resume layouts.

---
# 🖼️ Images📷
INPUT AND OUTPUT SCREEN

1.	Home Screen
 
<img width="796" height="386" alt="image" src="https://github.com/user-attachments/assets/d2a23acc-1d67-49ce-bdca-ae12c3a47b48" />
<img width="799" height="389" alt="image" src="https://github.com/user-attachments/assets/fd7be700-7c49-4d6e-8feb-28773398af02" />
<img width="826" height="404" alt="image" src="https://github.com/user-attachments/assets/b1f0f549-7cec-4ffa-93e1-a8e4a413f30e" />

 <img width="841" height="415" alt="image" src="https://github.com/user-attachments/assets/74bffd48-7f88-4ed3-bb8b-aebea6c27537" />

 <img width="824" height="400" alt="image" src="https://github.com/user-attachments/assets/f5def326-49cf-425e-a3b0-c4cb745a30d0" />




 
 
2.	Authentication
 <img width="825" height="400" alt="image" src="https://github.com/user-attachments/assets/3969f4d3-7bc0-456b-a4f5-20c2e2e14480" />




3.	User Dashboard
 
  <img width="827" height="406" alt="image" src="https://github.com/user-attachments/assets/5c555e7e-e06d-4396-87b1-b68704e62b7d" />

4.	Live Preview
 <img width="838" height="404" alt="image" src="https://github.com/user-attachments/assets/1d003ce1-e7fb-43b3-a063-1edd348029fc" />


5.	AI-Suggestion
 <img width="501" height="425" alt="image" src="https://github.com/user-attachments/assets/ec33d192-cbba-4d56-8123-ef81067a678d" />

6.	Resume Preview & Download
 <img width="826" height="401" alt="image" src="https://github.com/user-attachments/assets/ea16d479-f206-40dc-a457-cb6e1954e4d7" />

7.	Templates and Themes
 <img width="838" height="404" alt="image" src="https://github.com/user-attachments/assets/3dba7601-7ce6-4009-86b5-f0135da833b0" />




---

# 📫 Contact
**Mohit Dabral** - [dabralmohit78@gmail.com](mailto:dabralmohit78@gmail.com)
GitHub: [Dabral2005](https://github.com/Dabral2005)

**Professional Resume Building Made Simple.**
