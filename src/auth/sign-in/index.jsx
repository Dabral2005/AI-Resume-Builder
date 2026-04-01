import { SignIn } from '@clerk/clerk-react'
import React from 'react'

function SignInPage() {
  return (
    <div className='min-h-screen flex flex-col'
      style={{
        background: 'linear-gradient(135deg, #0f0c29 0%, #1a1145 40%, #24243e 100%)'
      }}
    >
      {/* Header */}
      <div className='p-6'>
        <a href='/' className='flex items-center gap-2 group w-fit'>
          <div className='w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-400 flex items-center justify-center shadow-lg shadow-violet-500/30'>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <span className='text-xl font-bold tracking-tight text-white'>
            <span className='gradient-text'>AI</span>Resume
          </span>
        </a>
      </div>

      {/* Sign In Card */}
      <div className='flex-1 flex items-center justify-center p-4 pb-20'>
        <div className='animate-fade-in-up'>
          <SignIn
            appearance={{
              elements: {
                rootBox: 'mx-auto',
                card: 'shadow-2xl shadow-violet-500/10 border border-white/10',
                headerTitle: 'text-2xl font-bold',
                headerSubtitle: 'text-gray-400',
                formButtonPrimary: 'bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-700 hover:to-purple-600 shadow-lg shadow-violet-500/25 transition-all duration-300',
              }
            }}
          />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className='fixed top-20 right-20 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl pointer-events-none'></div>
      <div className='fixed bottom-20 left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none'></div>
    </div>
  )
}

export default SignInPage