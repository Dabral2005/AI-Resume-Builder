import React from 'react'
import { FileText, Scale, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

function Terms() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8'>
        <Link to="/" className='inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 font-medium mb-8 group transition-all'>
          <ArrowLeft className='w-4 h-4 group-hover:-translate-x-1 transition-transform' />
          Back to Home
        </Link>
        
        <div className='card-premium p-8 md:p-12 border-t-8 border-t-indigo-600 overflow-hidden relative'>
          <div className='absolute top-0 right-0 w-64 h-64 bg-indigo-100/50 rounded-full blur-3xl -mr-32 -mt-32 z-0'></div>
          
          <div className='relative z-10'>
            <div className='flex items-center gap-4 mb-6'>
              <div className='w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center'>
                <Scale className='w-6 h-6 text-indigo-600' />
              </div>
              <h1 className='text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight'>Terms of Service</h1>
            </div>
            
            <p className='text-gray-500 mb-10 text-lg'>Last updated: April 2024</p>
            
            <div className='space-y-10'>
              <section>
                <h2 className='text-xl font-bold text-gray-900 mb-4 flex items-center gap-2'>
                  <CheckCircle2 className='w-5 h-5 text-indigo-500' />
                  1. Acceptance of Terms
                </h2>
                <p className='text-gray-600 leading-relaxed'>
                  By accessing or using CVera, you agree to be bound by these Terms of Service and all applicable laws and regulations. 
                  If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                </p>
              </section>

              <section>
                <h2 className='text-xl font-bold text-gray-900 mb-4 flex items-center gap-2'>
                  <FileText className='w-5 h-5 text-indigo-500' />
                  2. Use License
                </h2>
                <p className='text-gray-600 leading-relaxed'>
                  Permission is granted to use our AI tools to create and download resumes for personal, non-commercial use. 
                  You may not use our services for any illegal purpose or to generate misleading professional documentation.
                </p>
              </section>

              <section>
                <h2 className='text-xl font-bold text-gray-900 mb-4 flex items-center gap-2'>
                  <AlertCircle className='w-5 h-5 text-indigo-500' />
                  3. Disclaimer
                </h2>
                <p className='text-gray-600 leading-relaxed'>
                  The AI-generated content is provided "as is". While we strive for accuracy and professionalism, 
                  the final responsibility for the content and accuracy of your resume lies solely with you. 
                  We do not guarantee job placement or successful application outcomes.
                </p>
              </section>

              <section className='p-6 rounded-2xl bg-indigo-50 border border-indigo-100'>
                <h2 className='text-lg font-bold text-indigo-900 mb-2'>Service Changes</h2>
                <p className='text-indigo-700 text-sm'>
                  We reserve the right to modify or discontinue the service at any time without notice. 
                  Continued use of the platform after changes constitutes acceptance of the new terms.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Terms
