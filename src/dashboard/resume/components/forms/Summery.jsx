import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { Brain, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { AIChatSession, mockSummaryResponse } from './../../../../../service/AIModal';

const prompt = "Job Title: {jobTitle} , Depends on job title give me list of  summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format"

function Summery({enabledNext}) {
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
    const [summery, setSummery] = useState();
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState();

    useEffect(() => {
        summery && setResumeInfo({
            ...resumeInfo,
            summery: summery
        })
    }, [summery])

    const GenerateSummeryFromAI = async () => {
        setLoading(true)
        const jobTitle = resumeInfo?.jobTitle || "Professional";
        const PROMPT = prompt.replace('{jobTitle}', jobTitle);
        
        try {
            let resultData;
            if (AIChatSession) {
                const result = await AIChatSession.sendMessage(PROMPT);
                setAiGenerateSummeryList(JSON.parse(result.response.text()));
            } else {
                // Fallback to mock data if no API key
                setAiGenerateSummeryList(JSON.parse(mockSummaryResponse(jobTitle)));
            }
        } catch (e) {
            console.error(e);
            toast.error("Failed to generate AI summary.");
        } finally {
            setLoading(false);
        }
    }

    const onSave = (e) => {
        e.preventDefault();
        setLoading(true)
        const data = {
            data: {
                summery: summery
            }
        }
        GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(resp => {
            enabledNext(true);
            setLoading(false);
            toast("Details updated")
        }, (error) => {
            setLoading(false);
        })
    }
    
    return (
        <div className='mt-6 space-y-6'>
            <div className='card-premium p-8 border-t-4 border-t-violet-600'>
                <div className='mb-6'>
                    <h2 className='text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent'>Summary</h2>
                    <p className='text-gray-500 mt-1'>Add a brief professional summary for your job title</p>
                </div>

                <form className='mt-7' onSubmit={onSave}>
                    <div className='flex justify-between items-end mb-4'>
                        <label className='font-medium text-gray-700'>Professional Summary</label>
                        <Button 
                            variant="outline" 
                            onClick={() => GenerateSummeryFromAI()} 
                            type="button" 
                            size="sm" 
                            className="border-violet-300 text-violet-700 hover:bg-violet-50 transition-colors duration-300 flex gap-2 rounded-xl"
                        > 
                            {loading ? <Loader2 className='animate-spin h-4 w-4' /> : <Brain className='h-4 w-4' />}  
                            Generate from AI
                        </Button>
                    </div>
                    <Textarea 
                        className="mt-2 min-h-[160px] resize-y bg-gray-50/50 border-gray-200 focus:ring-violet-500 focus:border-violet-500 rounded-2xl" 
                        required
                        value={summery}
                        defaultValue={summery ? summery : resumeInfo?.summery}
                        onChange={(e) => setSummery(e.target.value)}
                        placeholder="Write a brief professional summary..."
                    />
                    <div className='mt-6 flex justify-end'>
                        <Button type="submit" disabled={loading} className="btn-premium px-8">
                            {loading ? <Loader2 className='animate-spin w-4 h-4' /> : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>

            {aiGeneratedSummeryList && (
                <div className='card-premium p-8 animate-fade-in-up'>
                    <h2 className='text-xl font-bold text-gray-900 mb-6 flex items-center gap-2'>
                        <Brain className='text-violet-600 w-5 h-5' /> 
                        AI Suggestions
                    </h2>
                    <div className='space-y-4'>
                        {aiGeneratedSummeryList?.map((item, index) => (
                            <div 
                                key={index} 
                                onClick={() => setSummery(item?.summary)}
                                className='p-5 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-violet-50/50 hover:border-violet-200 cursor-pointer transition-all duration-300 group'
                            >
                                <div className='flex items-center justify-between mb-2'>
                                    <h3 className='font-bold text-violet-700 bg-violet-100 px-3 py-1 rounded-full text-xs'>
                                        {item?.experience_level} Level
                                    </h3>
                                    <span className='text-xs font-semibold text-violet-500 opacity-0 group-hover:opacity-100 transition-opacity'>Use this</span>
                                </div>
                                <p className='text-gray-600 leading-relaxed text-sm'>{item?.summary}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Summery