import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ClerkProvider } from '@clerk/clerk-react'

import App from './App.jsx'
import Home from './home/index.jsx'
import Dashboard from './dashboard/index.jsx'
import SignInPage from './auth/sign-in/index.jsx'
import EditResume from './dashboard/resume/[resumeId]/edit/index.jsx'
import ViewResume from './my-resume/[resumeId]/view/index.jsx'
import Privacy from './pages/Privacy.jsx'
import Terms from './pages/Terms.jsx'
import Support from './pages/Support.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
console.log("new build v2");
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY in .env file")
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="dashboard/resume/:resumeId/edit" element={<EditResume />} />
            <Route path="my-resume/:resumeId/view" element={<ViewResume />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="support" element={<Support />} />
          </Route>

          <Route path="/auth/sign-in" element={<SignInPage />} />
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
)