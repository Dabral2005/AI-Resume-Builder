import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../service/GlobalApi'
import { RWebShare } from 'react-web-share'
import { ArrowDownToLine, Share2, CheckCircle2 } from 'lucide-react'

function ViewResume() {
    const [resumeInfo, setResumeInfo] = useState();
    const {resumeId} = useParams();

    useEffect(() => {
        GetResumeInfo();
    }, [])

    const GetResumeInfo = () => {
        GlobalApi.GetResumeById(resumeId).then(resp => {
            setResumeInfo(resp.data.data);
        })
    }

    const HandleDownload = () => {
        window.print();
    }

    return (
        <ResumeInfoContext.Provider value={{resumeInfo, setResumeInfo}}>
            <div className='min-h-screen bg-[#fafafa]' id="no-print">
                <Header />

                <div className='max-w-5xl mx-auto px-6 py-16 animate-fade-in'>
                    {/* Success Banner */}
                    <div className='bg-white border border-slate-100 rounded-[2.5rem] p-10 mb-16 text-center shadow-2xl relative overflow-hidden group'>
                        <div className='absolute top-0 right-0 w-64 h-64 bg-emerald-400/5 rounded-full blur-[100px] -mr-32 -mt-32'></div>
                        <div className='absolute bottom-0 left-0 w-48 h-48 bg-brand-primary/5 rounded-full blur-[80px] -ml-24 -mb-24'></div>
                        
                        <div className='relative z-10'>
                            <div className='w-20 h-20 rounded-[2rem] bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-500 shadow-sm'>
                                <CheckCircle2 className='w-10 h-10 text-emerald-500' />
                            </div>
                            <h2 className='text-4xl font-black text-slate-900 mb-4 font-brand tracking-tight'>Congratulations! Your Resume is Ready.</h2>
                            <p className='text-slate-500 mb-10 text-lg font-medium max-w-2xl mx-auto leading-relaxed'>
                                You've just created a world-class professional document with <span className='text-brand-primary font-bold'>CVera</span>. 
                                It's time to show the world what you're capable of.
                            </p>

                            <div className='flex flex-wrap justify-center gap-6'>
                                <Button 
                                    onClick={HandleDownload}
                                    className="btn-premium px-12 h-14 rounded-2xl shadow-2xl scale-100 hover:scale-105 transition-transform"
                                >
                                    <ArrowDownToLine className='w-6 h-6 mr-3'/>
                                    Download as PDF
                                </Button>

                                <RWebShare
                                    data={{
                                        text: "Check out my professional resume built with CVera!",
                                        url: import.meta.env.VITE_BASE_URL + "/my-resume/" + resumeId + "/view",
                                        title: resumeInfo?.firstName + " " + resumeInfo?.lastName + " resume",
                                    }}
                                >
                                    <Button 
                                        variant="outline"
                                        className="bg-white hover:bg-slate-50 text-slate-900 border-slate-200 rounded-2xl px-10 h-14 font-black transition-all shadow-sm"
                                    >
                                        <Share2 className='w-5 h-5 mr-3'/> 
                                        Share Profile
                                    </Button>
                                </RWebShare>
                            </div>
                        </div>
                    </div>

                    {/* Resume Wrapper Card */}
                    <div className='relative max-w-4xl mx-auto'>
                        <div className='absolute -inset-4 bg-slate-200/40 rounded-[3rem] blur-2xl z-0'></div>
                        <div className='relative z-10 bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] rounded-[2rem] p-4 md:p-12 border border-slate-100 animate-fade-in-up delay-300'>
                            <div className='flex items-center justify-between mb-10 border-b border-slate-50 pb-8'>
                                <h3 className='text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] font-brand'>Official Document Preview</h3>
                                <div className='flex gap-2'>
                                    <div className='w-3 h-3 rounded-full bg-slate-100'></div>
                                    <div className='w-3 h-3 rounded-full bg-slate-100'></div>
                                </div>
                            </div>
                            <div className='bg-slate-50/50 p-2 md:p-8 rounded-[1.5rem] border border-slate-100/50'>
                                <div className='bg-white shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)]' id="print-area">
                                    <ResumePreview />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Print Elements */}
            <div id="print-area" className='hidden'>
                <ResumePreview />
            </div>
        </ResumeInfoContext.Provider>
    )
}

export default ViewResume