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
    const [dateErrors, setDateErrors] = useState({});

    useEffect(() => {
        resumeInfo?.Experience?.length > 0 && setExperinceList(resumeInfo?.Experience)
    }, [])

    const validateDates = (index, startDate, endDate) => {
        const errors = { ...dateErrors };
        if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
            errors[index] = 'End date must be after start date';
        } else {
            delete errors[index];
        }
        setDateErrors(errors);
        return !errors[index];
    };

    const handleChange = (index, event) => {
        const newEntries = [...experinceList];
        const {name, value} = event.target;
        newEntries[index][name] = value;

        // Validate dates when either date field changes
        if (name === 'startDate' || name === 'endDate') {
            const start = name === 'startDate' ? value : newEntries[index].startDate;
            const end = name === 'endDate' ? value : newEntries[index].endDate;
            validateDates(index, start, end);
        }

        setExperinceList(newEntries);
    }

    const handleRichTextEditor = (e, name, index) => {
        const newEntries = [...experinceList];
        newEntries[index][name] = e.target.value;
        setExperinceList(newEntries);
    }

    const AddNewExperience = () => {
        setExperinceList([...experinceList, {
            title: '', companyName: '', city: '', state: '', startDate: '', endDate: '', currentlyWorking: false, workSummery: ''
        }])
    }

    const RemoveExperience = () => {
        if (experinceList.length > 0) {
            const lastIndex = experinceList.length - 1;
            const errors = { ...dateErrors };
            delete errors[lastIndex];
            setDateErrors(errors);
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
        // Validate all entries before saving
        let hasErrors = false;

        for (let i = 0; i < experinceList.length; i++) {
            const exp = experinceList[i];
            if (!exp.title || !exp.companyName || !exp.startDate) {
                toast.error(`Experience #${i + 1}: Position title, company name, and start date are required`);
                hasErrors = true;
                break;
            }
            if (exp.endDate && exp.startDate && new Date(exp.endDate) < new Date(exp.startDate)) {
                toast.error(`Experience #${i + 1}: End date must be after start date`);
                hasErrors = true;
                break;
            }
        }

        if (hasErrors || Object.keys(dateErrors).length > 0) return;

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

    // Helper to format date for display in the input (YYYY-MM-DD)
    const formatDateForInput = (dateStr) => {
        if (!dateStr) return '';
        // If already in YYYY-MM-DD format, return as is
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
        // Try to parse other formats
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return '';
        return d.toISOString().split('T')[0];
    };

    return (
        <div className='card-premium p-10 mt-6 relative overflow-hidden group/form'>
            <div className='absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-2xl -mr-16 -mt-16'></div>
            <div className='relative z-10'>
                <div className='mb-8'>
                    <h2 className='text-3xl font-black text-slate-900 font-brand tracking-tight'>Professional Experience</h2>
                    <p className='text-slate-500 mt-2 font-medium'>Add your previous job experience and achievements</p>
                </div>
                
                <div className='space-y-10'>
                    {experinceList.map((item, index) => (
                        <div key={index} className='p-8 rounded-[2rem] border border-slate-100 bg-white shadow-sm hover:shadow-xl hover:border-brand-primary/20 transition-all duration-500 group'>
                            <div className='flex items-center justify-between mb-8 pb-6 border-b border-slate-50'>
                                <h3 className='font-black text-slate-400 uppercase tracking-[0.2em] text-[10px] flex items-center gap-2'>
                                    <div className='w-2 h-2 rounded-full bg-brand-primary'></div>
                                    Experience #{index + 1}
                                </h3>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6'>
                                <div className='space-y-2'>
                                    <label className='text-[11px] font-black uppercase tracking-[0.2em] text-slate-500'>Position Title <span className='text-red-500'>*</span></label>

                                <Input name="title" required onChange={(e) => handleChange(index, e)} defaultValue={item?.title} className="bg-gray-50/50 rounded-xl focus:ring-violet-500 focus:border-violet-500" placeholder="e.g., Software Engineer"/>
                            </div>
                            <div className='space-y-1.5'>
                                <label className='text-[11px] font-black uppercase tracking-[0.2em] text-slate-500'>Company Name <span className='text-red-500'>*</span></label>
                                <Input name="companyName" required onChange={(e) => handleChange(index, e)} defaultValue={item?.companyName} className="bg-gray-50/50 rounded-xl focus:ring-violet-500 focus:border-violet-500" placeholder="e.g., Google"/>
                            </div>
                            <div className='space-y-1.5'>
                                <label className='text-[11px] font-black uppercase tracking-[0.2em] text-slate-500'>City</label>
                                <Input name="city" onChange={(e) => handleChange(index, e)} defaultValue={item?.city} className="bg-gray-50/50 rounded-xl focus:ring-violet-500 focus:border-violet-500" placeholder="e.g., Bangalore"/>
                            </div>
                            <div className='space-y-1.5'>
                                <label className='text-[11px] font-black uppercase tracking-[0.2em] text-slate-500'>State</label>
                                <Input name="state" onChange={(e) => handleChange(index, e)} defaultValue={item?.state} className="bg-gray-50/50 rounded-xl focus:ring-violet-500 focus:border-violet-500" placeholder="e.g., Karnataka"/>
                            </div>
                            <div className='space-y-1.5'>
                                <label className='text-[11px] font-black uppercase tracking-[0.2em] text-slate-500'>Start Date <span className='text-red-500'>*</span></label>
                                <Input type="date" name="startDate" required onChange={(e) => handleChange(index, e)} defaultValue={formatDateForInput(item?.startDate)} max={new Date().toISOString().split('T')[0]} className="bg-gray-50/50 rounded-xl focus:ring-violet-500 focus:border-violet-500"/>
                            </div>
                            <div className='space-y-1.5'>
                                <label className='text-[11px] font-black uppercase tracking-[0.2em] text-slate-500'>End Date (Leave blank if present)</label>
                                <Input type="date" name="endDate" onChange={(e) => handleChange(index, e)} defaultValue={formatDateForInput(item?.endDate)} max={new Date().toISOString().split('T')[0]} className={`bg-gray-50/50 rounded-xl focus:ring-violet-500 focus:border-violet-500 ${dateErrors[index] ? 'border-red-400 ring-1 ring-red-400' : ''}`}/>
                                {dateErrors[index] && <p className='text-[11px] text-red-500 font-medium px-1'>{dateErrors[index]}</p>}
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

            <div className='flex flex-col sm:flex-row justify-between items-center gap-6 mt-12 pt-10 border-t border-slate-100'>
                <div className='flex gap-4 w-full sm:w-auto'>
                    <Button variant="outline" onClick={AddNewExperience} className="text-brand-primary border-slate-200 hover:bg-brand-primary/5 hover:border-brand-primary rounded-2xl gap-2 flex-1 sm:flex-none h-12 px-6 font-bold shadow-sm transition-all"> 
                        <Plus className='w-5 h-5' /> Add Experience
                    </Button>
                    {experinceList.length > 0 && (
                        <Button variant="ghost" onClick={RemoveExperience} className="text-slate-400 hover:bg-red-50 hover:text-red-600 rounded-2xl gap-2 flex-1 sm:flex-none h-12 font-bold px-6 border border-transparent hover:border-red-100"> 
                            <Trash2 className='w-5 h-5' /> Remove
                        </Button>
                    )}
                </div>
                <Button disabled={loading} onClick={onSave} className="btn-premium w-full sm:w-auto px-10 h-12 rounded-2xl text-lg">
                    {loading ? <Loader2 className='animate-spin w-5 h-5' /> : 'Save Experience'}    
                </Button>
            </div>
        </div>
    </div>
    )
}

export default Experience