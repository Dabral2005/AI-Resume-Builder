import React from 'react';

function Template5({ resumeInfo }) {
  const themeAccent = resumeInfo?.themeColor || '#000000'; 

  return (
    <div className="w-full min-h-[1056px] bg-white shadow-lg resume-document font-serif text-gray-900 flex flex-col px-12 py-12 pb-16">
      
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl tracking-widest uppercase mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            {resumeInfo?.firstName} {resumeInfo?.lastName}
        </h1>
        <div className="flex flex-wrap justify-center items-center gap-x-2 text-sm">
            {resumeInfo?.address && <span>{resumeInfo?.address}</span>}
            {resumeInfo?.phone && <><span className="font-bold">•</span><span>{resumeInfo?.phone}</span></>}
            {resumeInfo?.email && <><span className="font-bold">•</span><span>{resumeInfo?.email}</span></>}
        </div>
      </div>

      {resumeInfo?.summery && (
          <p className="text-sm text-center italic mb-6 leading-relaxed max-w-4xl mx-auto">
              "{resumeInfo?.summery}"
          </p>
      )}

      {/* Education */}
      {resumeInfo?.education?.length > 0 && (
        <div className="mb-5">
          <h2 className="text-lg font-bold uppercase border-b-[1.5px] border-black pb-1 mb-3" style={{ borderBottomColor: themeAccent }}>Education</h2>
          <div className="flex flex-col gap-3">
            {resumeInfo?.education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-md font-bold">{edu?.universityName}</h3>
                    <p className="text-sm font-semibold">{edu?.startDate} - {edu?.endDate}</p>
                </div>
                <div className="flex justify-between items-baseline">
                    <p className="text-sm italic">{edu?.degree} in {edu?.major}</p>
                    <p className="text-sm text-gray-600">GPA: {edu?.description || 'N/A'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {resumeInfo?.Experience?.length > 0 && (
        <div className="mb-5">
          <h2 className="text-lg font-bold uppercase border-b-[1.5px] border-black pb-1 mb-3" style={{ borderBottomColor: themeAccent }}>Experience</h2>
          <div className="flex flex-col gap-4">
            {resumeInfo?.Experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-md font-bold">{exp?.companyName}</h3>
                    <p className="text-sm font-semibold">{exp?.startDate} - {exp?.endDate || 'Present'}</p>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                    <p className="text-sm italic">{exp?.title}</p>
                    <p className="text-sm text-gray-600">{exp?.city}, {exp?.state}</p>
                </div>
                <div className="text-sm leading-relaxed template-5-ul pl-4" dangerouslySetInnerHTML={{ __html: exp?.workSummery }} />
              </div>
            ))}
          </div>
          <style dangerouslySetInnerHTML={{__html: `
            .template-5-ul ul { list-style-type: disc !important; padding-left: 1.5rem !important; margin: 0 !important; }
            .template-5-ul li { margin-bottom: 0.25rem !important; }
          `}} />
        </div>
      )}

      {/* Skills */}
      {resumeInfo?.skills?.length > 0 && (
        <div className="mb-5">
          <h2 className="text-lg font-bold uppercase border-b-[1.5px] border-black pb-1 mb-3" style={{ borderBottomColor: themeAccent }}>Technical Skills</h2>
          <div className="text-sm flex flex-wrap gap-x-2">
            <span className="font-bold">Languages / Tools:</span>
            {resumeInfo?.skills.map((skill, index) => (
              <span key={index}>{skill.name}{index < resumeInfo.skills.length - 1 ? ',' : ''}</span>
            ))}
          </div>
        </div>
      )}
      
    </div>
  );
}

export default Template5;
