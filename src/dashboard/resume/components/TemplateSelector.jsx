import React, { useContext, useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { Layout } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from './../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

function TemplateSelector() {
  const templates = [
    { name: 'Template1', label: 'Professional', thumbnail: '📄' },
    { name: 'Template2', label: 'Modern Clean', thumbnail: '📋' },
    { name: 'Template3', label: 'Creative', thumbnail: '🎨' },
    { name: 'Template4', label: 'Executive', thumbnail: '👔' },
    { name: 'Template5', label: 'Minimalist', thumbnail: '▫️' },
  ]

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const { resumeId } = useParams();

  const onTemplateSelect = (templateName) => {
    setResumeInfo({
      ...resumeInfo,
      templateName: templateName
    });
    const data = {
      data: {
        templateName: templateName
      }
    }
    GlobalApi.UpdateResumeDetail(resumeId, data).then(resp => {
      toast.success('Template Updated Successfully')
    }, (error) => {
      toast.error('Failed to update template')
    })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-2 rounded-xl border-gray-200 hover:bg-blue-500">
          <Layout className="w-4 h-4" /> 
          Template
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4 rounded-2xl shadow-xl border-gray-100">
        <h2 className='mb-4 text-sm font-black uppercase tracking-widest text-slate-500'>Select Template</h2>
        <div className='grid grid-cols-1 gap-2'>
          {templates.map((template, index) => (
            <div
              key={index}
              onClick={() => onTemplateSelect(template.name)}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border
                ${resumeInfo?.templateName === template.name 
                  ? 'border-violet-500 bg-violet-50' 
                  : 'border-transparent hover:bg-gray-50 hover:border-gray-200'}`}
            >
              <div className='w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-xl border border-gray-100'>
                {template.thumbnail}
              </div>
              <div>
                <p className='text-sm font-bold text-slate-800'>{template.label}</p>
                <p className='text-[10px] text-slate-400 font-medium'>Layout {index + 1}</p>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default TemplateSelector
