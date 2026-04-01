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

  useEffect(() => {
    resumeInfo?.education?.length > 0 && setEducationalList(resumeInfo?.education)
  }, [])

  const handleChange = (event, index) => {
    const newEntries = [...educationalList];
    const {name, value} = event.target;
    newEntries[index][name] = value;
    setEducationalList(newEntries);
  }

  const AddNewEducation = () => {
    setEducationalList([...educationalList, {
      universityName: '', degree: '', major: '', startDate: '', endDate: '', description: ''
    }])
  }

  const RemoveEducation = () => {
    if (educationalList.length > 0) {
      setEducationalList(educationalList => educationalList.slice(0, -1));
    }
  }

  const onSave = () => {
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
                <label className='text-sm font-medium text-gray-700'>University / School Name</label>
                <Input name="universityName" onChange={(e) => handleChange(e, index)} defaultValue={item?.universityName} className="bg-gray-50/50 rounded-xl focus:ring-violet-500 focus:border-violet-500"/>
              </div>
              <div className='space-y-1.5'>
                <label className='text-sm font-medium text-gray-700'>Degree (e.g. Bachelor's)</label>
                <Input name="degree" onChange={(e) => handleChange(e, index)} defaultValue={item?.degree} className="bg-gray-50/50 rounded-xl focus:ring-violet-500 focus:border-violet-500"/>
              </div>
              <div className='space-y-1.5'>
                <label className='text-sm font-medium text-gray-700'>Field of Study / Major</label>
                <Input name="major" onChange={(e) => handleChange(e, index)} defaultValue={item?.major} className="bg-gray-50/50 rounded-xl focus:ring-violet-500 focus:border-violet-500"/>
              </div>
              <div className='space-y-1.5'>
                <label className='text-sm font-medium text-gray-700'>Start Date</label>
                <Input type="date" name="startDate" onChange={(e) => handleChange(e, index)} defaultValue={item?.startDate} className="bg-gray-50/50 rounded-xl focus:ring-violet-500 focus:border-violet-500"/>
              </div>
              <div className='space-y-1.5'>
                <label className='text-sm font-medium text-gray-700'>End Date (or Expected)</label>
                <Input type="date" name="endDate" onChange={(e) => handleChange(e, index)} defaultValue={item?.endDate} className="bg-gray-50/50 rounded-xl focus:ring-violet-500 focus:border-violet-500"/>
              </div>
              <div className='space-y-1.5 col-span-1 md:col-span-2'>
                <label className='text-sm font-medium text-gray-700'>Additional Description / Honors</label>
                <Textarea name="description" onChange={(e) => handleChange(e, index)} defaultValue={item?.description} className="bg-gray-50/50 rounded-xl focus:ring-violet-500 focus:border-violet-500 resize-y min-h-[100px]"/>
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