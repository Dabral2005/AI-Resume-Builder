import React from 'react'
import { ShieldCheck, Lock, Eye, FileText, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

function Privacy() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8'>
        <Link to="/" className='inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 font-medium mb-8 group transition-all'>
          <ArrowLeft className='w-4 h-4 group-hover:-translate-x-1 transition-transform' />
          Back to Home
        </Link>
        
        <div className='card-premium p-8 md:p-12 border-t-8 border-t-violet-600 overflow-hidden relative'>
          <div className='absolute top-0 right-0 w-64 h-64 bg-violet-100/50 rounded-full blur-3xl -mr-32 -mt-32 z-0'></div>
          
          <div className='relative z-10'>
            <div className='flex items-center gap-4 mb-6'>
              <div className='w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center'>
                <ShieldCheck className='w-6 h-6 text-violet-600' />
              </div>
              <h1 className='text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight'>Privacy Policy</h1>
            </div>
            
            <p className='text-gray-500 mb-10 text-lg'>Last updated: April 2024</p>
            
            <div className='space-y-10'>
              <section>
                <h2 className='text-xl font-bold text-gray-900 mb-4 flex items-center gap-2'>
                  <Eye className='w-5 h-5 text-violet-500' />
                  Information We Collect
                </h2>
                <p className='text-gray-600 leading-relaxed'>
                  We collect information you provide directly to us when you create an account, build a resume, or communicate with us. 
                  This includes your name, email address, professional experience, education, and any other details you choose to include in your resumes.
                </p>
              </section>

              <section>
                <h2 className='text-xl font-bold text-gray-900 mb-4 flex items-center gap-2'>
                  <Lock className='w-5 h-5 text-violet-500' />
                  How We Use Your Information
                </h2>
                <ul className='list-disc list-inside text-gray-600 space-y-2 ml-2'>
                  <li>To provide, maintain, and improve our CVera services.</li>
                  <li>To provide AI-powered content suggestions based on your job history.</li>
                  <li>To protect our users and ensure a secure environment.</li>
                  <li>To communicate with you about updates, security alerts, and support.</li>
                </ul>
              </section>

              <section>
                <h2 className='text-xl font-bold text-gray-900 mb-4 flex items-center gap-2'>
                  <ShieldCheck className='w-5 h-5 text-violet-500' />
                  Data Security
                </h2>
                <p className='text-gray-600 leading-relaxed'>
                  We implement a variety of security measures to maintain the safety of your personal information. 
                  Your resume data is stored securely and is only accessible by you unless you choose to share your resume link publicly.
                </p>
              </section>

              <section className='p-6 rounded-2xl bg-violet-50 border border-violet-100'>
                <h2 className='text-lg font-bold text-violet-900 mb-2'>Contact Us</h2>
                <p className='text-violet-700 text-sm'>
                  If you have any questions about CVera Privacy Policy, please contact us at mohitdabral780@gmail.com
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Privacy
