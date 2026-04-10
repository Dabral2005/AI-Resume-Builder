import React from 'react'

// Formats "2021-01-15" → "Jan 2021" for display on resume
const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr; // Return as-is if not parseable
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

function ExperiencePreview({resumeInfo}) {
  return (
    <div className='my-6'>
        <h2 className='text-center font-bold text-sm mb-2'
        style={{
            color:resumeInfo?.themeColor
        }}
        >Professional Experience</h2>
        <hr style={{
            borderColor:resumeInfo?.themeColor
        }} />

        {resumeInfo?.Experience?.map((experience,index)=>(
            <div key={index} className='my-5'>
                <h2 className='text-sm font-bold'
                 style={{
                    color:resumeInfo?.themeColor
                }}>{experience?.title}</h2>
                <h2 className='text-xs flex justify-between'>{experience?.companyName}{experience?.city ? `, ${experience.city}` : ''}{experience?.state ? `, ${experience.state}` : ''}
                <span>{formatDate(experience?.startDate)} To {experience?.currentlyWorking?'Present':formatDate(experience?.endDate)} </span>
                </h2>
                <div className='text-xs my-2' dangerouslySetInnerHTML={{__html:experience?.workSummery}} />
            </div>
        ))}
    </div>
  )
}

export default ExperiencePreview