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
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');

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

    const validatePhone = (value) => {
        if (!value) return '';
        // Allow formats: +91 9876543210, (123)-456-7890, 123-456-7890, +1 123 456 7890
        const phoneRegex = /^\+?[\d\s()-]{7,15}$/;
        if (!phoneRegex.test(value)) {
            return 'Invalid phone number (7-15 digits, e.g., +91 9876543210)';
        }
        // Must contain at least 7 digits
        const digitCount = value.replace(/\D/g, '').length;
        if (digitCount < 7 || digitCount > 15) {
            return 'Phone number must have 7-15 digits';
        }
        return '';
    };

    const validateEmail = (value) => {
        if (!value) return '';
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value)) {
            return 'Invalid email address (e.g., name@example.com)';
        }
        return '';
    };

    const handleInputChange = (e) => {
        enabledNext(false)
        const {name, value} = e.target;

        if (name === 'phone') {
            setPhoneError(validatePhone(value));
        }

        if (name === 'email') {
            setEmailError(validateEmail(value));
        }

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

        // Run all validations before save
        const phoneErr = validatePhone(formData.phone);
        const emailErr = validateEmail(formData.email);
        setPhoneError(phoneErr);
        setEmailError(emailErr);

        if (phoneErr || emailErr) {
            toast.error("Please fix form errors before saving");
            return;
        }

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
            toast.error("Failed to update details")
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
                        <label className='text-sm font-medium text-gray-700'>First Name <span className='text-red-500'>*</span></label>
                        <Input 
                            name="firstName" 
                            defaultValue={resumeInfo?.firstName} 
                            required 
                            maxLength={100}
                            onChange={handleInputChange} 
                            className="bg-gray-50/50 border-gray-200 focus:ring-violet-500 focus:border-violet-500 rounded-xl"
                            placeholder="e.g., John"
                        />
                    </div>
                    <div className='space-y-2'>
                        <label className='text-sm font-medium text-gray-700'>Last Name <span className='text-red-500'>*</span></label>
                        <Input 
                            name="lastName" 
                            required 
                            maxLength={100}
                            onChange={handleInputChange} 
                            defaultValue={resumeInfo?.lastName} 
                            className="bg-gray-50/50 border-gray-200 focus:ring-violet-500 focus:border-violet-500 rounded-xl"
                            placeholder="e.g., Doe"
                        />
                    </div>
                    <div className='space-y-2 col-span-1 md:col-span-2'>
                        <label className='text-sm font-medium text-gray-700'>Job Title <span className='text-red-500'>*</span></label>
                        <Input 
                            name="jobTitle" 
                            required 
                            maxLength={200}
                            defaultValue={resumeInfo?.jobTitle}
                            onChange={handleInputChange} 
                            className="bg-gray-50/50 border-gray-200 focus:ring-violet-500 focus:border-violet-500 rounded-xl"
                            placeholder="e.g., Full Stack Developer"
                        />
                    </div>
                    <div className='space-y-2 col-span-1 md:col-span-2'>
                        <label className='text-sm font-medium text-gray-700'>Address <span className='text-red-500'>*</span></label>
                        <Input 
                            name="address" 
                            required 
                            maxLength={500}
                            defaultValue={resumeInfo?.address}
                            onChange={handleInputChange} 
                            className="bg-gray-50/50 border-gray-200 focus:ring-violet-500 focus:border-violet-500 rounded-xl"
                            placeholder="e.g., 525 N Tryon Street, NC 28117"
                        />
                    </div>
                    <div className='space-y-2'>
                        <label className='text-sm font-medium text-gray-700'>Phone <span className='text-red-500'>*</span></label>
                        <Input 
                            name="phone" 
                            type="tel"
                            required 
                            maxLength={20}
                            defaultValue={resumeInfo?.phone}
                            onChange={handleInputChange} 
                            className={`bg-gray-50/50 border-gray-200 focus:ring-violet-500 focus:border-violet-500 rounded-xl ${phoneError ? 'border-red-400 ring-1 ring-red-400' : ''}`}
                            placeholder="+91 9876543210"
                        />
                        {phoneError && <p className='text-[11px] text-red-500 font-medium px-1'>{phoneError}</p>}
                    </div>
                    <div className='space-y-2'>
                        <label className='text-sm font-medium text-gray-700'>Email <span className='text-red-500'>*</span></label>
                        <Input 
                            name="email" 
                            type="email"
                            required 
                            maxLength={255}
                            defaultValue={resumeInfo?.email}
                            onChange={handleInputChange} 
                            className={`bg-gray-50/50 border-gray-200 focus:ring-violet-500 focus:border-violet-500 rounded-xl ${emailError ? 'border-red-400 ring-1 ring-red-400' : ''}`}
                            placeholder="name@example.com"
                        />
                        {emailError && <p className='text-[11px] text-red-500 font-medium px-1'>{emailError}</p>}
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