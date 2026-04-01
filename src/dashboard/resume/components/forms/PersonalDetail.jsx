import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { Loader2 } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';

function PersonalDetail({enabledNext}) {
    const params = useParams();
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);

    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Initialize form data with existing info
        if(resumeInfo) {
            setFormData({
                firstName: resumeInfo?.firstName || '',
                lastName: resumeInfo?.lastName || '',
                jobTitle: resumeInfo?.jobTitle || '',
                address: resumeInfo?.address || '',
                phone: resumeInfo?.phone || '',
                email: resumeInfo?.email || ''
            });
        }
    }, [resumeInfo])

    const handleInputChange = (e) => {
        enabledNext(false)
        const {name, value} = e.target;

        setFormData({
            ...formData,
            [name]: value
        })
        setResumeInfo({
            ...resumeInfo,
            [name]: value
        })
    }

    const onSave = (e) => {
        e.preventDefault();
        setLoading(true)
        const data = {
            data: formData
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
        <div className='card-premium p-8 border-t-4 border-t-violet-600 mt-6'>
            <div className='mb-6'>
                <h2 className='text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent'>Personal Detail</h2>
                <p className='text-gray-500 mt-1'>Get Started with the basic information</p>
            </div>

            <form onSubmit={onSave}>
                <div className='grid grid-cols-1 md:grid-cols-2 mt-5 gap-5'>
                    <div className='space-y-2'>
                        <label className='text-sm font-medium text-gray-700'>First Name</label>
                        <Input 
                            name="firstName" 
                            defaultValue={resumeInfo?.firstName} 
                            required 
                            onChange={handleInputChange} 
                            className="bg-gray-50/50 border-gray-200 focus:ring-violet-500 focus:border-violet-500 rounded-xl"
                        />
                    </div>
                    <div className='space-y-2'>
                        <label className='text-sm font-medium text-gray-700'>Last Name</label>
                        <Input 
                            name="lastName" 
                            required 
                            onChange={handleInputChange} 
                            defaultValue={resumeInfo?.lastName} 
                            className="bg-gray-50/50 border-gray-200 focus:ring-violet-500 focus:border-violet-500 rounded-xl"
                        />
                    </div>
                    <div className='space-y-2 col-span-1 md:col-span-2'>
                        <label className='text-sm font-medium text-gray-700'>Job Title</label>
                        <Input 
                            name="jobTitle" 
                            required 
                            defaultValue={resumeInfo?.jobTitle}
                            onChange={handleInputChange} 
                            className="bg-gray-50/50 border-gray-200 focus:ring-violet-500 focus:border-violet-500 rounded-xl"
                        />
                    </div>
                    <div className='space-y-2 col-span-1 md:col-span-2'>
                        <label className='text-sm font-medium text-gray-700'>Address</label>
                        <Input 
                            name="address" 
                            required 
                            defaultValue={resumeInfo?.address}
                            onChange={handleInputChange} 
                            className="bg-gray-50/50 border-gray-200 focus:ring-violet-500 focus:border-violet-500 rounded-xl"
                        />
                    </div>
                    <div className='space-y-2'>
                        <label className='text-sm font-medium text-gray-700'>Phone</label>
                        <Input 
                            name="phone" 
                            required 
                            defaultValue={resumeInfo?.phone}
                            onChange={handleInputChange} 
                            className="bg-gray-50/50 border-gray-200 focus:ring-violet-500 focus:border-violet-500 rounded-xl"
                        />
                    </div>
                    <div className='space-y-2'>
                        <label className='text-sm font-medium text-gray-700'>Email</label>
                        <Input 
                            name="email" 
                            required 
                            defaultValue={resumeInfo?.email}
                            onChange={handleInputChange} 
                            className="bg-gray-50/50 border-gray-200 focus:ring-violet-500 focus:border-violet-500 rounded-xl"
                        />
                    </div>
                </div>
                <div className='mt-8 mb-2 flex justify-end'>
                    <Button 
                        type="submit"
                        disabled={loading}
                        className="btn-premium px-8"
                    >
                        {loading ? <Loader2 className='animate-spin w-4 h-4' /> : 'Save Changes'}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default PersonalDetail