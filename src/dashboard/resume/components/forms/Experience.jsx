import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import RichTextEditor from '../RichTextEditor'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { toast } from 'sonner'
import { Loader2, Plus, Trash2 } from 'lucide-react'

function Experience() {
    const [experinceList, setExperinceList] = useState([]);
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
    const params = useParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        resumeInfo?.Experience?.length > 0 && setExperinceList(resumeInfo?.Experience)
    }, [])

    const handleChange = (index, event) => {
        const newEntries = [...experinceList];
        const {name, value} = event.target;
        newEntries[index][name] = value;
        setExperinceList(newEntries);
    }

    const handleRichTextEditor = (e, name, index) => {
        const newEntries = [...experinceList];
        newEntries[index][name] = e.target.value;
        setExperinceList(newEntries);
    }

    const AddNewExperience = () => {
        setExperinceList([...experinceList, {
            title: '', companyName: '', city: '', state: '', startDate: '', endDate: '', workSummery: ''
        }])
    }

    const RemoveExperience = () => {
        if (experinceList.length > 0) {
            setExperinceList(experinceList => experinceList.slice(0, -1))
        }
    }

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            Experience: experinceList
        });
    }, [experinceList]);

    const onSave = () => {
        setLoading(true)
        const data = {
            data: {
                Experience: experinceList.map(({ id, ...rest }) => rest)
            }
        }
        GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(res => {
            setLoading(false);
            toast('Experience details updated successfully');
        }, (error) => {
            setLoading(false);
            toast.error('Failed to update experience');
        })
    }

    return (
        <div className='card-premium p-8 border-t-4 border-t-violet-600 mt-6'>
            <div className='mb-6'>
                <h2 className='text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent'>Professional Experience</h2>
                <p className='text-gray-500 mt-1'>Add your previous job experience and achievements</p>
            </div>
            
            <div className='space-y-6'>
                {experinceList.map((item, index) => (
                    <div key={index} className='p-6 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-violet-100 transition-all duration-300 group'>
                        <div className='flex items-center justify-between mb-4 border-b border-gray-50 pb-4'>
                            <h3 className='font-bold text-gray-700 bg-gray-50 px-4 py-1.5 rounded-full text-sm flex items-center gap-2'>
                                <div className='w-2 h-2 rounded-full bg-violet-500'></div>
                                Experience #{index + 1}
                            </h3>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mb-5'>
                            <div className='space-y-1.5'>
                                <label className='text-sm font-medium text-gray-700'>Position Title</label>
                                <Input name="title" onChange={(e) => handleChange(index, e)} defaultValue={item?.title} className="bg-gray-50/50 rounded-xl focus:ring-violet-500 focus:border-violet-500"/>
                            </div>
                            <div className='space-y-1.5'>
                                <label className='text-sm font-medium text-gray-700'>Company Name</label>
                                <Input name="companyName" onChange={(e) => handleChange(index, e)} defaultValue={item?.companyName} className="bg-gray-50/50 rounded-xl focus:ring-violet-500 focus:border-violet-500"/>
                            </div>
                            <div className='space-y-1.5'>
                                <label className='text-sm font-medium text-gray-700'>City</label>
                                <Input name="city" onChange={(e) => handleChange(index, e)} defaultValue={item?.city} className="bg-gray-50/50 rounded-xl focus:ring-violet-500 focus:border-violet-500"/>
                            </div>
                            <div className='space-y-1.5'>
                                <label className='text-sm font-medium text-gray-700'>State</label>
                                <Input name="state" onChange={(e) => handleChange(index, e)} defaultValue={item?.state} className="bg-gray-50/50 rounded-xl focus:ring-violet-500 focus:border-violet-500"/>
                            </div>
                            <div className='space-y-1.5'>
                                <label className='text-sm font-medium text-gray-700'>Start Date</label>
                                <Input type="date" name="startDate" onChange={(e) => handleChange(index, e)} defaultValue={item?.startDate} className="bg-gray-50/50 rounded-xl focus:ring-violet-500 focus:border-violet-500"/>
                            </div>
                            <div className='space-y-1.5'>
                                <label className='text-sm font-medium text-gray-700'>End Date (Leave blank if present)</label>
                                <Input type="date" name="endDate" onChange={(e) => handleChange(index, e)} defaultValue={item?.endDate} className="bg-gray-50/50 rounded-xl focus:ring-violet-500 focus:border-violet-500"/>
                            </div>
                            <div className='col-span-1 md:col-span-2 mt-2'>
                                <RichTextEditor index={index} defaultValue={item?.workSummery} onRichTextEditorChange={(e) => handleRichTextEditor(e, 'workSummery', index)}/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {experinceList.length === 0 && (
                <div className='text-center py-10 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50'>
                    <p className='text-gray-500 mb-4'>No work experience added yet.</p>
                </div>
            )}

            <div className='flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-100'>
                <div className='flex gap-3 w-full sm:w-auto'>
                    <Button variant="outline" onClick={AddNewExperience} className="text-violet-700 border-violet-200 hover:bg-violet-50 rounded-xl gap-2 flex-1 sm:flex-none"> 
                        <Plus className='w-4 h-4' /> Add Experience
                    </Button>
                    {experinceList.length > 0 && (
                        <Button variant="outline" onClick={RemoveExperience} className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 rounded-xl gap-2 flex-1 sm:flex-none"> 
                            <Trash2 className='w-4 h-4' /> Remove
                        </Button>
                    )}
                </div>
                <Button disabled={loading} onClick={onSave} className="btn-premium w-full sm:w-auto px-8">
                    {loading ? <Loader2 className='animate-spin w-4 h-4' /> : 'Save Changes'}    
                </Button>
            </div>
        </div>
    )
}

export default Experience