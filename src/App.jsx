import './App.css'
import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import Header from './components/custom/Header'
import { Toaster } from './components/ui/sonner'

function App() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-slate-50'>
        <div className='flex flex-col items-center gap-4'>
          <div className='w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin'></div>
          <p className='text-slate-500 font-medium animate-pulse'>Initializing AI Builder...</p>
        </div>
      </div>
    )
  }

  if (!isSignedIn) {
    return <Navigate to={'/auth/sign-in'} />
  }

  return (
    <>
      <Header />
      <Outlet />
      <Toaster />
    </>
  )
}

export default App
