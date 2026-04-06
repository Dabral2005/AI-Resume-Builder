import React, { useState } from 'react'
import Header from '@/components/custom/Header'
import { MessageSquare, Mail, HelpCircle, Send, ArrowLeft, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

function Support() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent! Our support team will get back to you soon.");
      e.target.reset();
    }, 1500);
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <Header />
      <div className='max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8'>
        <Link to="/" className='inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 font-medium mb-8 group transition-all'>
          <ArrowLeft className='w-4 h-4 group-hover:-translate-x-1 transition-transform' />
          Back to Home
        </Link>
        
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Contact Info */}
          <div className='lg:col-span-1 space-y-6'>
            <div className='flex items-center gap-4 mb-4'>
              <div className='w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center'>
                <HelpCircle className='w-6 h-6 text-violet-600' />
              </div>
              <h1 className='text-3xl font-extrabold text-gray-900 tracking-tight'>Support</h1>
            </div>
            
            <p className='text-gray-500 mb-8'>
              Need help? We're here for you. Check our FAQs or send us a message directly.
            </p>

            <div className='space-y-4'>
              <div className='p-4 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-start gap-4'>
                <div className='w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0'>
                  <Mail className='w-5 h-5 text-blue-600' />
                </div>
                <div>
                  <h3 className='font-bold text-gray-900'>Email Us</h3>
                  <p className='text-sm text-gray-500'>support@airesumebuilder.com</p>
                </div>
              </div>

              <div className='p-4 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-start gap-4'>
                <div className='w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center shrink-0'>
                  <MessageSquare className='w-5 h-5 text-green-600' />
                </div>
                <div>
                  <h3 className='font-bold text-gray-900'>Live Chat</h3>
                  <p className='text-sm text-gray-500'>Available Mon-Fri, 9am-5pm EST</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className='lg:col-span-2'>
            <div className='card-premium p-8 md:p-10 border-t-8 border-t-emerald-500'>
              <h2 className='text-2xl font-bold text-gray-900 mb-6'>Send a Message</h2>
              <form onSubmit={handleSubmit} className='space-y-5'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-gray-700'>Your Name</label>
                    <Input required placeholder="John Doe" className="rounded-xl border-gray-200 focus:ring-violet-500" />
                  </div>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-gray-700'>Email Address</label>
                    <Input required type="email" placeholder="john@example.com" className="rounded-xl border-gray-200 focus:ring-violet-500" />
                  </div>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-700'>Subject</label>
                  <Input required placeholder="How can we help?" className="rounded-xl border-gray-200 focus:ring-violet-500" />
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-700'>Message</label>
                  <Textarea required placeholder="Describe your issue in detail..." className="min-h-[150px] rounded-xl border-gray-200 focus:ring-violet-500" />
                </div>
                <Button type="submit" disabled={loading} className="btn-premium w-full py-6 text-lg rounded-xl">
                  {loading ? <Loader2 className='animate-spin w-5 h-5' /> : (
                    <>
                      <Send className='w-5 h-5 mr-2' />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Support
