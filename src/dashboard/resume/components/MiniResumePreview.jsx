import React from 'react'
import Template1 from './templates/Template1'
import Template2 from './templates/Template2'
import Template3 from './templates/Template3'
import Template4 from './templates/Template4'
import Template5 from './templates/Template5'

function MiniResumePreview({ resumeInfo, scale = 0.25 }) {
    const renderTemplate = () => {
        switch(resumeInfo?.templateName) {
            case 'Template1': return <Template1 resumeInfo={resumeInfo} />;
            case 'Template2': return <Template2 resumeInfo={resumeInfo} />;
            case 'Template3': return <Template3 resumeInfo={resumeInfo} />;
            case 'Template4': return <Template4 resumeInfo={resumeInfo} />;
            case 'Template5': return <Template5 resumeInfo={resumeInfo} />;
            default:          return <Template1 resumeInfo={resumeInfo} />;
        }
    };

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
            <div style={{ 
                transform: `scale(${scale})`, 
                transformOrigin: 'top left',
                width: `${100 / scale}%`,
                height: `${100 / scale}%`,
                pointerEvents: 'none'
            }}>
                {renderTemplate()}
            </div>
        </div>
    )
}

export default MiniResumePreview
