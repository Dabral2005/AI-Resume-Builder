import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import Template1 from './templates/Template1'
import Template2 from './templates/Template2'
import Template3 from './templates/Template3'
import Template4 from './templates/Template4'
import Template5 from './templates/Template5'

function ResumePreview() {
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)

    const renderTemplate = () => {
        // Fallback or explicit mapping
        switch(resumeInfo?.templateName) {
            case 'Template1':
                return <Template1 resumeInfo={resumeInfo} />;
            case 'Template2':
                return <Template2 resumeInfo={resumeInfo} />;
            case 'Template3':
                return <Template3 resumeInfo={resumeInfo} />;
            case 'Template4':
                return <Template4 resumeInfo={resumeInfo} />;
            case 'Template5':
                return <Template5 resumeInfo={resumeInfo} />;
            default:
                // Default to Template1 if none provided (for old resumes)
                return <Template1 resumeInfo={resumeInfo} />;
        }
    };

  return (
    <div className='w-full'>
        {renderTemplate()}
    </div>
  )
}

export default ResumePreview