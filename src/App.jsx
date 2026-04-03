import './App.css'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import Header from './components/custom/Header'
import { Toaster } from './components/ui/sonner'

function App() {
  const { isLoaded, isSignedIn } = useUser();
  const location = useLocation();

  // Wait until Clerk loads
  if (!isLoaded) return null;

  // Allow public routes
  const publicRoutes = ['/', '/auth/sign-in'];

  if (!isSignedIn && !publicRoutes.includes(location.pathname)) {
    return <Navigate to="/auth/sign-in" />;
  }

  return (
    <>
      <Header />
      <Outlet />
      <Toaster />
    </>
  );
}

export default App;