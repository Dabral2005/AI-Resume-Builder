import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { Loader2, Plus, Trash2 } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { toast } from 'sonner'

function Education() {
  const [loading, setLoading] = useState(false);
  const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
  const params = useParams();
  const [educationalList, setEducationalList] = useState([]);
  const [dateErrors, setDateErrors] = useState({});

  useEffect(() => {
    resumeInfo?.education?.length > 0 && setEducationalList(resumeInfo?.education)
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

  const handleChange = (event, index) => {
    const newEntries = [...educationalList];
    const {name, value} = event.target;
    newEntries[index][name] = value;

    // Validate dates when either date field changes
    if (name === 'startDate' || name === 'endDate') {
      const start = name === 'startDate' ? value : newEntries[index].startDate;
      const end = name === 'endDate' ? value : newEntries[index].endDate;
      validateDates(index, start, end);
    }

    setEducationalList(newEntries);
  }

  const AddNewEducation = () => {
    setEducationalList([...educationalList, {
      universityName: '', degree: '', major: '', startDate: '', endDate: '', description: ''
    }])
  }

  const RemoveEducation = () => {
    if (educationalList.length > 0) {
      const lastIndex = educationalList.length - 1;
      const errors = { ...dateErrors };
      delete errors[lastIndex];
      setDateErrors(errors);
      setEducationalList(educationalList => educationalList.slice(0, -1));
    }
  }

  const onSave = () => {
    // Validate all entries before saving
    let hasErrors = false;

    for (let i = 0; i < educationalList.length; i++) {
      const edu = educationalList[i];
      if (!edu.universityName || !edu.degree || !edu.major || !edu.startDate) {
        toast.error(`Education #${i + 1}: University, degree, major, and start date are required`);
        hasErrors = true;
        break;
      }
      if (edu.endDate && edu.startDate && new Date(edu.endDate) < new Date(edu.startDate)) {
        toast.error(`Education #${i + 1}: End date must be after start date`);
        hasErrors = true;
        break;
      }
    }

    if (hasErrors || Object.keys(dateErrors).length > 0) return;

    setLoading(true)
    const data = {
      data: {
        education: educationalList.map(({ id, ...rest }) => rest)
      }
    }

    GlobalApi.UpdateResumeDetail(params.resumeId, data).then(resp => {
      setLoading(false);
      toast.success('Education details updated!');
    }, (error) => {
      setLoading(false);
      toast.error('Failed to update education details');
    })
  }

  useEffect(() => {
    if (educationalList && educationalList.length >= 0) {
      setResumeInfo({
        ...resumeInfo,
        education: educationalList
      })
    }
  }, [educationalList])

  // Helper to format date for display in the input (YYYY-MM-DD)
  const formatDateForInput = (dateStr) => {
    if (!dateStr) return '';
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '';
    return d.toISOString().split('T')[0];
  };

  return (
    <div className='card-premium p-10 mt-6 relative overflow-hidden group/form'>
      <div className='absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-2xl -mr-16 -mt-16'></div>
      <div className='relative z-10'>
        <div className='mb-8'>
          <h2 className='text-3xl font-black text-slate-900 font-brand tracking-tight'>Educational Background</h2>
          <p className='text-slate-500 mt-2 font-medium'>Add your educational qualifications and institutional highlights.</p>
        </div>

        <div className='space-y-10'>
          {educationalList.map((item, index) => (
            <div key={index} className='p-8 rounded-[2rem] border border-slate-100 bg-white shadow-sm hover:shadow-xl hover:border-brand-primary/20 transition-all duration-500 group'>
              <div className='flex items-center justify-between mb-8 pb-6 border-b border-slate-50'>
                  <h3 className='font-black text-slate-400 uppercase tracking-[0.2em] text-[10px] flex items-center gap-2'>
                      <div className='w-2 h-2 rounded-full bg-brand-primary'></div>
                      Education #{index + 1}
                  </h3>
              </div>
            
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mb-5'>
              <div className='space-y-1.5 col-span-1 md:col-span-2'>
                <label className='text-[11px] font-black uppercase tracking-[0.2em] text-slate-500'>University / School Name <span className='text-red-500'>*</span></label>
                <Input name="universityName" required maxLength={300} onChange={(e) => handleChange(e, index)} defaultValue={item?.universityName} className="bg-gray-50/50 rounded-xl focus:ring-violet-500 focus:border-violet-500" placeholder="e.g., Indian Institute of Technology"/>
              </div>
              <div className='space-y-1.5'>
                <label className='text-[11px] font-black uppercase tracking-[0.2em] text-slate-500'>Degree <span className='text-red-500'>*</span></label>
                <Input name="degree" required maxLength={100} onChange={(e) => handleChange(e, index)} defaultValue={item?.degree} className="bg-gray-50/50 rounded-xl focus:ring-violet-500 focus:border-violet-500" placeholder="e.g., Bachelor's, Master's"/>
              </div>
              <div className='space-y-1.5'>
                <label className='text-[11px] font-black uppercase tracking-[0.2em] text-slate-500'>Field of Study / Major <span className='text-red-500'>*</span></label>
                <Input name="major" required maxLength={200} onChange={(e) => handleChange(e, index)} defaultValue={item?.major} className="bg-gray-50/50 rounded-xl focus:ring-violet-500 focus:border-violet-500" placeholder="e.g., Computer Science"/>
              </div>
              <div className='space-y-1.5'>
                <label className='text-[11px] font-black uppercase tracking-[0.2em] text-slate-500'>Start Date <span className='text-red-500'>*</span></label>
                <Input type="date" name="startDate" required max={new Date().toISOString().split('T')[0]} onChange={(e) => handleChange(e, index)} defaultValue={formatDateForInput(item?.startDate)} className="bg-gray-50/50 rounded-xl focus:ring-violet-500 focus:border-violet-500"/>
              </div>
              <div className='space-y-1.5'>
                <label className='text-[11px] font-black uppercase tracking-[0.2em] text-slate-500'>End Date (or Expected)</label>
                <Input type="date" name="endDate" onChange={(e) => handleChange(e, index)} defaultValue={formatDateForInput(item?.endDate)} className={`bg-gray-50/50 rounded-xl focus:ring-violet-500 focus:border-violet-500 ${dateErrors[index] ? 'border-red-400 ring-1 ring-red-400' : ''}`}/>
                {dateErrors[index] && <p className='text-[11px] text-red-500 font-medium px-1'>{dateErrors[index]}</p>}
              </div>
              <div className='space-y-1.5 col-span-1 md:col-span-2'>
                <label className='text-[11px] font-black uppercase tracking-[0.2em] text-slate-500'>Additional Description / Honors</label>
                <Textarea name="description" maxLength={2000} onChange={(e) => handleChange(e, index)} defaultValue={item?.description} className="bg-gray-50/50 rounded-xl focus:ring-violet-500 focus:border-violet-500 resize-y min-h-[100px]" placeholder="e.g., Graduated with honors, relevant coursework..."/>
              </div>
            </div>
          </div>
        ))}
        
        {educationalList.length === 0 && (
            <div className='text-center py-10 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50'>
                <p className='text-gray-500 mb-4'>No education entries added yet.</p>
            </div>
        )}
      </div>
      
      <div className='flex flex-col sm:flex-row justify-between items-center gap-6 mt-12 pt-10 border-t border-slate-100'>
        <div className='flex gap-4 w-full sm:w-auto'>
          <Button variant="outline" onClick={AddNewEducation} className="text-brand-primary border-slate-200 hover:text-brand-primary hover:bg-brand-primary/5 hover:border-brand-primary rounded-2xl gap-2 flex-1 sm:flex-none h-12 px-6 font-bold shadow-sm transition-all"> 
            <Plus className='w-5 h-5' /> Add Education
          </Button>
          {educationalList.length > 0 && (
            <Button variant="ghost" onClick={RemoveEducation} className="text-slate-400 hover:bg-red-50 hover:text-red-600 rounded-2xl gap-2 flex-1 sm:flex-none h-12 font-bold px-6 border border-transparent hover:border-red-100"> 
              <Trash2 className='w-5 h-5' /> Remove
            </Button>
          )}
        </div>
        <Button disabled={loading} onClick={onSave} className="btn-premium w-full sm:w-auto px-10 h-12 rounded-2xl text-lg">
          {loading ? <Loader2 className='animate-spin w-5 h-5' /> : 'Save Education'}    
        </Button>
      </div>
    </div>
    </div>
  )
}

export default Education