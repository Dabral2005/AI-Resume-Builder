import React from 'react';

function Template3({ resumeInfo }) {
  const themeColor = resumeInfo?.themeColor || '#4f46e5';

  return (
    <div className="w-full min-h-[1056px] bg-gray-50 shadow-lg resume-document font-sans flex flex-col">
      {/* Top Header */}
      <div 
        className="w-full text-center py-14 px-8"
        style={{ backgroundColor: themeColor }}
      >
        <h1 className="text-5xl font-serif tracking-[0.2em] uppercase mb-4 text-white">
          {resumeInfo?.firstName} {resumeInfo?.lastName}
        </h1>
        <h2 className="text-lg font-light tracking-[0.3em] uppercase text-slate-100/90">
          {resumeInfo?.jobTitle}
        </h2>
      </div>

      <div className="flex flex-1 p-8 bg-white max-w-[92%] mx-auto shadow-sm my-10">
        {/* Left Column (1/3) */}
        <div className="w-1/3 pr-8 border-r border-slate-100">
          {/* Contact */}
          <div className="mb-10">
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase mb-5 text-slate-900 border-b border-slate-900/10 pb-2">Contact</h3>
            <div className="flex flex-col gap-3.5 text-sm text-slate-600">
              {resumeInfo?.phone && <div className="flex items-center gap-2"><span>📱</span> {resumeInfo?.phone}</div>}
              {resumeInfo?.email && <div className="flex items-center gap-2"><span>✉️</span> {resumeInfo?.email}</div>}
              {resumeInfo?.address && <div className="flex items-center gap-2"><span>📍</span> {resumeInfo?.address}</div>}
            </div>
          </div>

          {/* Education */}
          {resumeInfo?.education?.length > 0 && (
            <div className="mb-10">
              <h3 className="text-xs font-bold tracking-[0.2em] uppercase mb-5 text-slate-900 border-b border-slate-900/10 pb-2">Education</h3>
              <div className="flex flex-col gap-5">
                {resumeInfo?.education.map((edu, index) => (
                  <div key={index}>
                    <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1.5" style={{ color: themeColor }}>
                      {edu?.startDate} - {edu?.endDate}
                    </p>
                    <h4 className="font-bold text-slate-800 text-sm mb-1">{edu?.degree} in {edu?.major}</h4>
                    <p className="text-xs text-slate-500 italic">{edu?.universityName}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {resumeInfo?.skills?.length > 0 && (
            <div>
              <h3 className="text-xs font-bold tracking-[0.2em] uppercase mb-5 text-slate-900 border-b border-slate-900/10 pb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {resumeInfo?.skills.map((skill, index) => (
                  <span key={index} className="text-xs bg-slate-50 text-slate-600 px-2.5 py-1 rounded-md border border-slate-100">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (2/3) */}
        <div className="w-2/3 pl-10">
          {/* Profile */}
          {resumeInfo?.summery && (
              <div className="mb-12">
                  <h3 className="text-xs font-bold tracking-[0.2em] uppercase mb-5 text-slate-900 border-b border-slate-900/10 pb-2">Profile</h3>
                  <p className="text-sm text-slate-600 leading-relaxed text-justify">
                      {resumeInfo?.summery}
                  </p>
              </div>
          )}

          {/* Experience */}
          {resumeInfo?.Experience?.length > 0 && (
            <div>
              <h3 className="text-xs font-bold tracking-[0.2em] uppercase mb-5 text-slate-900 border-b border-slate-900/10 pb-2">Experience</h3>
              <div className="flex flex-col gap-8">
                {resumeInfo?.Experience.map((exp, index) => (
                  <div key={index} className="relative pl-4 border-l-2 border-slate-50 hover:border-primary/20 transition-colors" style={{ borderColor: `${themeColor}10` }}>
                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-1.5">{exp?.title}</h4>
                    <div className="flex justify-between items-center mb-3">
                        <p className="text-xs font-medium text-slate-500">
                            {exp?.companyName} | {exp?.city}, {exp?.state}
                        </p>
                        <p className="text-[10px] font-bold text-primary uppercase" style={{ color: themeColor }}>
                            {exp?.startDate} - {exp?.endDate || 'Present'}
                        </p>
                    </div>
                    <div className="text-sm text-slate-600 leading-relaxed list-outside" dangerouslySetInnerHTML={{ __html: exp?.workSummery }} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Template3;
