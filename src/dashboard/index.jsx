import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import { useUser } from '@clerk/clerk-react'
import GlobalApi from './../../service/GlobalApi';
import ResumeCardItem from './components/ResumeCardItem';

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    user && GetResumesList()
  }, [user])

  const GetResumesList = () => {
    setLoading(true);
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
      .then(resp => {
        setResumeList(resp.data.data);
        setLoading(false);
      })
  }

  return (
    <div className='min-h-screen bg-gray-50/50'>
      {/* Welcome Banner */}
      <div className='bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 relative overflow-hidden'>
        <div className='absolute inset-0 opacity-10'
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        ></div>
        <div className='max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-10 relative'>
          <div className='flex items-center gap-4'>
            <div className='w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20'>
              <span className='text-2xl'>👋</span>
            </div>
            <div>
              <h2 className='text-white text-2xl md:text-3xl font-bold'>
                Welcome back{user?.firstName ? `, ${user.firstName}` : ''}!
              </h2>
              <p className='text-violet-200 mt-1'>Create and manage your AI-powered resumes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-10'>
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h3 className='text-xl font-bold text-gray-900'>My Resumes</h3>
            <p className='text-gray-500 text-sm mt-1'>
              {resumeList.length > 0 ? `${resumeList.length} resume${resumeList.length > 1 ? 's' : ''} created` : 'Start creating your first resume'}
            </p>
          </div>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
          <AddResume />
          {loading && resumeList.length === 0 ?
            [1, 2, 3, 4].map((item, index) => (
              <div key={index} className='h-[300px] rounded-2xl bg-white animate-pulse border border-gray-100'>
                <div className='h-[220px] bg-gradient-to-b from-gray-100 to-gray-50 rounded-t-2xl'></div>
                <div className='p-4'>
                  <div className='h-4 bg-gray-100 rounded-lg w-3/4'></div>
                  <div className='h-3 bg-gray-50 rounded-lg w-1/2 mt-2'></div>
                </div>
              </div>
            ))
            :
            resumeList.map((resume, index) => (
              <ResumeCardItem resume={resume} key={index} refreshData={GetResumesList} />
            ))
          }
        </div>

        {/* Empty State */}
        {!loading && resumeList.length === 0 && (
          <div className='text-center py-16 animate-fade-in'>
            <div className='w-20 h-20 rounded-3xl bg-violet-50 flex items-center justify-center mx-auto mb-6'>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
              </svg>
            </div>
            <h3 className='text-lg font-bold text-gray-900 mb-2'>No resumes yet</h3>
            <p className='text-gray-500 max-w-sm mx-auto'>
              Click the "+" button above to create your first AI-powered resume and get started!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard