import Header from '@/components/custom/Header'
import { AtomIcon, Edit, Share2, FileText, Sparkles, Zap, Download, Star, ArrowRight, CheckCircle2 } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='min-h-screen'>
      <Header />

      {/* ===== Hero Section ===== */}
      <section className='relative overflow-hidden'
        style={{
          background: 'linear-gradient(135deg, #0f0c29 0%, #1a1145 40%, #24243e 100%)'
        }}
      >
        {/* Decorative Blurs */}
        <div className='absolute top-10 left-10 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl'></div>
        <div className='absolute bottom-10 right-10 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl'></div>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl'></div>

        {/* Grid Pattern Overlay */}
        <div className='absolute inset-0 opacity-[0.03]'
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        ></div>

        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28'>
          <div className='text-center'>
            {/* Badge */}
            <div className='animate-fade-in-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8'>
              <Sparkles className='w-4 h-4 text-violet-400' />
              <span className='text-sm text-violet-300 font-medium'>Powered by AI Technology</span>
            </div>

            {/* Headline */}
            <h1 className='animate-fade-in-up text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tight'>
              Build Your Resume
              <br />
              <span className='gradient-text'>With AI Intelligence</span>
            </h1>

            {/* Subtitle */}
            <p className='animate-fade-in-up delay-100 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed opacity-0'>
              Effortlessly craft a standout resume with our AI-powered builder.
              Get personalized content suggestions, professional formatting, and land your dream job.
            </p>

            {/* CTA Buttons */}
            <div className='animate-fade-in-up delay-200 flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0'>
              <Link to="/dashboard">
                <button className='btn-premium text-base py-3.5 px-8 rounded-xl'>
                  Start Building Free
                  <ArrowRight className='w-5 h-5' />
                </button>
              </Link>
              <Link to="/dashboard" className='group flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 px-6 py-3.5'>
                <div className='w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300'>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </div>
                <span className='font-medium'>See how it works</span>
              </Link>
            </div>

            {/* Stats */}
            <div className='animate-fade-in-up delay-300 grid grid-cols-3 gap-8 max-w-lg mx-auto mt-16 opacity-0'>
              <div className='text-center'>
                <p className='text-3xl font-bold text-white'>10K+</p>
                <p className='text-sm text-gray-500 mt-1'>Resumes Created</p>
              </div>
              <div className='text-center border-x border-white/10'>
                <p className='text-3xl font-bold text-white'>95%</p>
                <p className='text-sm text-gray-500 mt-1'>Success Rate</p>
              </div>
              <div className='text-center'>
                <p className='text-3xl font-bold text-white'>4.9</p>
                <p className='text-sm text-gray-500 mt-1'>User Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Separator */}
        <div className='absolute bottom-0 left-0 right-0'>
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 50L48 45.7C96 41.3 192 32.7 288 30.2C384 27.7 480 31.3 576 38.5C672 45.7 768 56.3 864 58.8C960 61.3 1056 55.7 1152 48.5C1248 41.3 1344 32.7 1392 28.3L1440 24V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* ===== How It Works Section ===== */}
      <section className='py-20 px-4 bg-white'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-16'>
            <span className='inline-block px-4 py-1.5 rounded-full bg-violet-50 text-violet-600 text-sm font-semibold mb-4'>
              Simple Process
            </span>
            <h2 className='text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight'>
              How It Works
            </h2>
            <p className='text-gray-500 mt-3 text-lg max-w-xl mx-auto'>
              Create your professional resume in just 3 simple steps
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {/* Step 1 */}
            <div className='card-premium p-8 text-center group relative overflow-hidden'>
              <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left'></div>
              <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300'>
                <FileText className='w-7 h-7 text-violet-600' />
              </div>
              <div className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-violet-50 text-violet-600 font-bold text-sm mb-4'>1</div>
              <h3 className='text-xl font-bold text-gray-900 mb-3'>Choose a Template</h3>
              <p className='text-gray-500 leading-relaxed'>
                Select from our collection of professionally designed resume templates that match your industry and style.
              </p>
            </div>

            {/* Step 2 */}
            <div className='card-premium p-8 text-center group relative overflow-hidden'>
              <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left'></div>
              <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300'>
                <Sparkles className='w-7 h-7 text-purple-600' />
              </div>
              <div className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-50 text-purple-600 font-bold text-sm mb-4'>2</div>
              <h3 className='text-xl font-bold text-gray-900 mb-3'>Fill with AI Assistance</h3>
              <p className='text-gray-500 leading-relaxed'>
                Let AI generate professional content for your experience, skills, and summary. Edit and customize to your liking.
              </p>
            </div>

            {/* Step 3 */}
            <div className='card-premium p-8 text-center group relative overflow-hidden'>
              <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-rose-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left'></div>
              <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300'>
                <Download className='w-7 h-7 text-pink-600' />
              </div>
              <div className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-pink-50 text-pink-600 font-bold text-sm mb-4'>3</div>
              <h3 className='text-xl font-bold text-gray-900 mb-3'>Download & Share</h3>
              <p className='text-gray-500 leading-relaxed'>
                Download your polished resume as PDF or share a unique link with recruiters and hiring managers directly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Features Section ===== */}
      <section className='py-20 px-4 bg-gradient-to-b from-gray-50 to-white'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-16'>
            <span className='inline-block px-4 py-1.5 rounded-full bg-violet-50 text-violet-600 text-sm font-semibold mb-4'>
              Features
            </span>
            <h2 className='text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight'>
              Everything You Need
            </h2>
            <p className='text-gray-500 mt-3 text-lg max-w-xl mx-auto'>
              Powerful features to help you create the perfect resume
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {[
              { icon: Sparkles, title: 'AI Content Generation', desc: 'Generate professional summaries and bullet points tailored to your job title', color: 'violet' },
              { icon: Edit, title: 'Real-time Preview', desc: 'See changes instantly as you edit your resume with our live preview panel', color: 'blue' },
              { icon: Zap, title: 'One-Click Design', desc: 'Change your entire resume theme and color scheme with a single click', color: 'amber' },
              { icon: Share2, title: 'Easy Sharing', desc: 'Share your resume with a unique URL or download as a beautifully formatted PDF', color: 'emerald' },
              { icon: FileText, title: 'ATS Friendly', desc: 'Our templates are optimized for Applicant Tracking Systems used by top companies', color: 'rose' },
              { icon: Star, title: 'Smart Suggestions', desc: 'Get AI-powered suggestions for skills and experience based on your target role', color: 'purple' },
            ].map((feature, index) => (
              <div key={index} className='group p-6 rounded-2xl bg-white border border-gray-100 hover:border-violet-100 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300'>
                <div className={`w-12 h-12 rounded-xl bg-${feature.color}-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-6 h-6 text-${feature.color}-500`} />
                </div>
                <h3 className='text-lg font-bold text-gray-900 mb-2'>{feature.title}</h3>
                <p className='text-gray-500 text-sm leading-relaxed'>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Testimonials Section ===== */}
      <section className='py-20 px-4 bg-white'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-16'>
            <span className='inline-block px-4 py-1.5 rounded-full bg-violet-50 text-violet-600 text-sm font-semibold mb-4'>
              Testimonials
            </span>
            <h2 className='text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight'>
              Loved by Job Seekers
            </h2>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {[
              { name: 'Sarah Chen', role: 'Software Engineer at Google', text: 'This AI resume builder helped me land interviews at top tech companies. The AI suggestions were incredibly relevant and professional.', rating: 5 },
              { name: 'Michael Park', role: 'Product Manager at Meta', text: 'I was amazed at how quickly I could create a polished resume. The real-time preview feature saved me hours of formatting work.', rating: 5 },
              { name: 'Emily Davis', role: 'UX Designer at Apple', text: 'The templates are modern and ATS-friendly. I received more callbacks after switching to a resume built with this tool.', rating: 5 },
            ].map((testimonial, index) => (
              <div key={index} className='card-premium p-6'>
                <div className='flex gap-1 mb-4'>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className='w-4 h-4 fill-amber-400 text-amber-400' />
                  ))}
                </div>
                <p className='text-gray-600 mb-6 leading-relaxed text-sm'>"{testimonial.text}"</p>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm'>
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className='font-semibold text-gray-900 text-sm'>{testimonial.name}</p>
                    <p className='text-gray-500 text-xs'>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA Section ===== */}
      <section className='py-20 px-4'>
        <div className='max-w-4xl mx-auto'>
          <div className='relative rounded-3xl overflow-hidden p-12 md:p-16 text-center'
            style={{
              background: 'linear-gradient(135deg, #0f0c29 0%, #1a1145 40%, #24243e 100%)'
            }}
          >
            <div className='absolute top-0 right-0 w-64 h-64 bg-violet-600/20 rounded-full blur-3xl'></div>
            <div className='absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl'></div>

            <div className='relative'>
              <h2 className='text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight'>
                Ready to Build Your <span className='gradient-text'>Perfect Resume?</span>
              </h2>
              <p className='text-gray-400 mb-8 text-lg max-w-lg mx-auto'>
                Join thousands of professionals who've already landed their dream jobs with AI-powered resumes.
              </p>
              <Link to="/dashboard">
                <button className='btn-premium text-base py-3.5 px-10 rounded-xl'>
                  Get Started — It's Free
                  <ArrowRight className='w-5 h-5' />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className='border-t border-gray-100 py-12 px-4 bg-white'>
        <div className='max-w-6xl mx-auto'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-6'>
            <div className='flex items-center gap-2'>
              <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center'>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
              </div>
              <span className='font-bold text-gray-800'>
                <span className='gradient-text'>AI</span>Resume
              </span>
            </div>
            <div className='flex gap-8 text-sm text-gray-500'>
              <a href='#' className='hover:text-violet-600 transition-colors'>Privacy</a>
              <a href='#' className='hover:text-violet-600 transition-colors'>Terms</a>
              <a href='#' className='hover:text-violet-600 transition-colors'>Support</a>
            </div>
            <p className='text-sm text-gray-400'>© 2024 AI Resume Builder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home