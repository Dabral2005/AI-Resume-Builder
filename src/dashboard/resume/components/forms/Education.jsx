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
    <div className='card-premium p-8 border-t-4 border-t-violet-600 mt-6'>
      <div className='mb-6'>
        <h2 className='text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent'>Education</h2>
        <p className='text-gray-500 mt-1'>Add your educational background and qualifications</p>
      </div>

      <div className='space-y-6'>
        {educationalList.map((item, index) => (
          <div key={index} className='p-6 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-violet-100 transition-all duration-300 group'>
            <div className='flex items-center justify-between mb-4 border-b border-gray-50 pb-4'>
                <h3 className='font-bold text-gray-700 bg-gray-50 px-4 py-1.5 rounded-full text-sm flex items-center gap-2'>
                    <div className='w-2 h-2 rounded-full bg-violet-500'></div>
                    Education #{index + 1}
                </h3>
            </div>
            
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mb-5'>
              <div className='space-y-1.5 col-span-1 md:col-span-2'>
                <label className='text-sm font-medium text-gray-700'>University / School Name <span className='text-red-500'>*</span></label>
                <Input name="universityName" required maxLength={300} onChange={(e) => handleChange(e, index)} defaultValue={item?.universityName} className="bg-gray-50/50 rounded-xl focus:ring-violet-500 focus:border-violet-500" placeholder="e.g., Indian Institute of Technology"/>
              </div>
              <div className='space-y-1.5'>
                <label className='text-sm font-medium text-gray-700'>Degree <span className='text-red-500'>*</span></label>
                <Input name="degree" required maxLength={100} onChange={(e) => handleChange(e, index)} defaultValue={item?.degree} className="bg-gray-50/50 rounded-xl focus:ring-violet-500 focus:border-violet-500" placeholder="e.g., Bachelor's, Master's"/>
              </div>
              <div className='space-y-1.5'>
                <label className='text-sm font-medium text-gray-700'>Field of Study / Major <span className='text-red-500'>*</span></label>
                <Input name="major" required maxLength={200} onChange={(e) => handleChange(e, index)} defaultValue={item?.major} className="bg-gray-50/50 rounded-xl focus:ring-violet-500 focus:border-violet-500" placeholder="e.g., Computer Science"/>
              </div>
              <div className='space-y-1.5'>
                <label className='text-sm font-medium text-gray-700'>Start Date <span className='text-red-500'>*</span></label>
                <Input type="date" name="startDate" required max={new Date().toISOString().split('T')[0]} onChange={(e) => handleChange(e, index)} defaultValue={formatDateForInput(item?.startDate)} className="bg-gray-50/50 rounded-xl focus:ring-violet-500 focus:border-violet-500"/>
              </div>
              <div className='space-y-1.5'>
                <label className='text-sm font-medium text-gray-700'>End Date (or Expected)</label>
                <Input type="date" name="endDate" onChange={(e) => handleChange(e, index)} defaultValue={formatDateForInput(item?.endDate)} className={`bg-gray-50/50 rounded-xl focus:ring-violet-500 focus:border-violet-500 ${dateErrors[index] ? 'border-red-400 ring-1 ring-red-400' : ''}`}/>
                {dateErrors[index] && <p className='text-[11px] text-red-500 font-medium px-1'>{dateErrors[index]}</p>}
              </div>
              <div className='space-y-1.5 col-span-1 md:col-span-2'>
                <label className='text-sm font-medium text-gray-700'>Additional Description / Honors</label>
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
      
      <div className='flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-100'>
        <div className='flex gap-3 w-full sm:w-auto'>
          <Button variant="outline" onClick={AddNewEducation} className="text-violet-700 border-violet-200 hover:bg-violet-50 rounded-xl gap-2 flex-1 sm:flex-none"> 
            <Plus className='w-4 h-4' /> Add Education
          </Button>
          {educationalList.length > 0 && (
            <Button variant="outline" onClick={RemoveEducation} className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 rounded-xl gap-2 flex-1 sm:flex-none"> 
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

export default Education