import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'

function Header() {
    const { isSignedIn, isLoaded } = useUser();

    // Prevent UI flicker
    if (!isLoaded) return null;

    return (
        <header className='sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-200'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between items-center h-16'>

                    {/* Logo */}
                    <Link 
                        to='/' 
                        className='flex items-center gap-3 active:scale-95 transition-transform'
                    >
                        <img 
                            src="/logo.png" 
                            alt="CVera Logo" 
                            className="w-10 h-10 object-contain rounded-xl"
                            onError={(e) => e.target.style.display = 'none'}
                        />

                        <span className='text-2xl font-black tracking-tight'>
                            <span className='text-slate-900'>CV</span>
                            <span className='text-violet-600'>era</span>
                        </span>
                    </Link>

                    {/* Navigation */}
                    <nav aria-label="Main navigation" className='flex items-center gap-3'>

                        {isSignedIn ? (
                            <div className='flex items-center gap-3'>

                                {/* Dashboard Button */}
                                <Button asChild variant="outline" className="rounded-xl">
                                    <Link to="/dashboard">
                                        Dashboard
                                    </Link>
                                </Button>

                                {/* User Avatar */}
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

                            /* Get Started Button */
                            <Button asChild className="rounded-xl bg-violet-600 hover:bg-violet-700 text-white">
                                <Link to="/auth/sign-in">
                                    Get Started →
                                </Link>
                            </Button>

                        )}

                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header