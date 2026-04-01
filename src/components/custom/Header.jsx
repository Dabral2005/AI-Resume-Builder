import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'

function Header() {
    const { user, isSignedIn } = useUser();
    return (
        <header className='sticky top-0 z-50 glass shadow-sm'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between items-center h-16'>
                    <Link to={'/'} className='flex items-center gap-2 group'>
                        <div className='w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-all duration-300'>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                <polyline points="10 9 9 9 8 9"></polyline>
                            </svg>
                        </div>
                        <span className='text-xl font-bold tracking-tight'>
                            <span className='gradient-text'>AI</span>
                            <span className='text-gray-800'>Resume</span>
                        </span>
                    </Link>

                    <nav className='flex items-center gap-3'>
                        {isSignedIn ? (
                            <div className='flex gap-3 items-center'>
                                <Link to={'/dashboard'}>
                                    <Button
                                        variant="outline"
                                        className="rounded-xl border-violet-200 text-violet-700 hover:bg-violet-50 hover:border-violet-300 transition-all duration-300 font-medium"
                                    >
                                        Dashboard
                                    </Button>
                                </Link>
                                <UserButton
                                    afterSignOutUrl="/"
                                    appearance={{
                                        elements: {
                                            avatarBox: 'w-9 h-9 ring-2 ring-violet-200 ring-offset-2'
                                        }
                                    }}
                                />
                            </div>
                        ) : (
                            <Link to={'/auth/sign-in'}>
                                <button className='btn-premium text-sm py-2.5 px-6'>
                                    Get Started
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </button>
                            </Link>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header