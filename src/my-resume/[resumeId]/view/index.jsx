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
            <div className='min-h-screen bg-gray-50' id="no-print">
                <Header />

                <div className='max-w-4xl mx-auto px-4 py-12'>
                    {/* Success Banner */}
                    <div className='bg-emerald-50 border border-emerald-100 rounded-2xl p-6 mb-10 text-center animate-fade-in-up relative overflow-hidden'>
                        <div className='absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl'></div>
                        <div className='absolute bottom-0 left-0 w-24 h-24 bg-teal-500/5 rounded-full blur-2xl'></div>
                        
                        <div className='relative'>
                            <div className='w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4'>
                                <CheckCircle2 className='w-6 h-6 text-emerald-600' />
                            </div>
                            <h2 className='text-2xl font-bold text-gray-900 mb-2'>Congrats! Your Ultimate Resume is Ready!</h2>
                            <p className='text-gray-500 mb-6'>Now you are ready to download your resume or share it with recruiters</p>

                            <div className='flex flex-wrap justify-center gap-4'>
                                <Button 
                                    onClick={HandleDownload}
                                    className="btn-premium px-8"
                                >
                                    <ArrowDownToLine className='w-4 h-4 mr-2'/>
                                    Download PDF
                                </Button>

                                <RWebShare
                                    data={{
                                        text: "Check out my amazing professional resume!",
                                        url: import.meta.env.VITE_BASE_URL + "/my-resume/" + resumeId + "/view",
                                        title: resumeInfo?.firstName + " " + resumeInfo?.lastName + " resume",
                                    }}
                                    onClick={() => console.log("shared successfully!")}
                                >
                                    <Button 
                                        variant="outline"
                                        className="bg-white hover:bg-violet-50 text-violet-700 border-violet-200 rounded-xl px-8"
                                    >
                                        <Share2 className='w-4 h-4 mr-2'/> 
                                        Share URL
                                    </Button>
                                </RWebShare>
                            </div>
                        </div>
                    </div>

                    {/* Resume Wrapper Card */}
                    <div className='card-premium p-4 md:p-8 animate-fade-in delay-200'>
                        <h3 className='text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6'>Resume Preview</h3>
                        <div className='bg-gray-100 p-2 md:p-6 rounded-2xl'>
                            <div className='bg-white shadow-sm' id="print-area">
                                <ResumePreview />
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