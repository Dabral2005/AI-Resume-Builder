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
        <a href='/' className='flex items-center gap-3 group w-fit'>
          <img 
            src="/logo.png" 
            alt="CVera Logo" 
            className="w-10 h-10 object-contain rounded-xl"
            onError={(e) => e.target.style.display = 'none'}
          />
          <span className='text-2xl font-black tracking-tight text-white'>
            <span className='text-white'>CV</span>
            <span className='gradient-text'>era</span>
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