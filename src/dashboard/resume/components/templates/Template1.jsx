import React from 'react';

function Template1({ resumeInfo }) {
  const themeColor = resumeInfo?.themeColor || '#1e293b'; // Default dark slate

  return (
    <div className="flex w-full min-h-[1056px] bg-white shadow-lg resume-document font-sans">
      {/* Left Sidebar */}
      <div 
        className="w-[35%] p-8 text-white flex flex-col gap-6"
        style={{ backgroundColor: themeColor }}
      >
        <div className="w-40 h-40 mx-auto rounded-full bg-white/20 border-4 border-white/30 overflow-hidden mb-4 flex items-center justify-center">
            {resumeInfo?.profileImage ? (
                <img src={resumeInfo?.profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
                <span className="text-white text-4xl font-bold">{resumeInfo?.firstName?.[0]}{resumeInfo?.lastName?.[0]}</span>
            )}
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-xl font-bold tracking-widest uppercase mb-4 border-b-2 border-white/30 pb-2">Contact</h2>
          <div className="flex flex-col gap-3 text-sm">
            {resumeInfo?.phone && (
              <div>
                <p className="font-semibold text-white/80">Phone</p>
                <p>{resumeInfo?.phone}</p>
              </div>
            )}
            {resumeInfo?.email && (
              <div>
                <p className="font-semibold text-white/80">Email</p>
                <p className="break-words">{resumeInfo?.email}</p>
              </div>
            )}
            {resumeInfo?.address && (
              <div>
                <p className="font-semibold text-white/80">Address</p>
                <p>{resumeInfo?.address}</p>
              </div>
            )}
          </div>
        </div>

        {/* Education */}
        {resumeInfo?.education?.length > 0 && (
          <div>
            <h2 className="text-xl font-bold tracking-widest uppercase mb-4 border-b-2 border-white/30 pb-2">Education</h2>
            <div className="flex flex-col gap-4">
              {resumeInfo?.education.map((edu, index) => (
                <div key={index}>
                  <p className="text-sm text-white/80 mb-1">{edu?.startDate} - {edu?.endDate}</p>
                  <h3 className="font-bold">{edu?.degree} in {edu?.major}</h3>
                  <p className="text-sm">{edu?.universityName}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Expertise/Skills */}
        {resumeInfo?.skills?.length > 0 && (
          <div>
            <h2 className="text-xl font-bold tracking-widest uppercase mb-4 border-b-2 border-white/30 pb-2">Expertise</h2>
            <ul className="list-disc list-inside flex flex-col gap-2 text-sm">
              {resumeInfo?.skills.map((skill, index) => (
                <li key={index}>{skill.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="w-[65%] p-10 bg-[#f8fafc]">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-extrabold text-[#1e293b] tracking-wider uppercase mb-2">
            {resumeInfo?.firstName} <br/> {resumeInfo?.lastName}
          </h1>
          <h2 className="text-2xl font-light tracking-widest text-[#64748b] uppercase">
            {resumeInfo?.jobTitle}
          </h2>
          {resumeInfo?.summery && (
            <p className="mt-6 text-sm text-[#475569] leading-relaxed">
              {resumeInfo?.summery}
            </p>
          )}
        </div>

        {/* Experience */}
        {resumeInfo?.Experience?.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold tracking-widest uppercase text-[#1e293b] mb-6 border-b-2 border-[#e2e8f0] pb-2">Experience</h2>
            <div className="flex flex-col gap-6 relative border-l-2 border-[#cbd5e1] ml-2">
              {resumeInfo?.Experience.map((exp, index) => (
                <div key={index} className="pl-6 relative">
                  <div className="absolute w-3 h-3 bg-white border-2 border-[#1e293b] rounded-full -left-[7px] top-1"></div>
                  <p className="text-sm font-semibold tracking-wider text-[#64748b] mb-1">
                    {exp?.startDate} - {exp?.endDate || 'Present'}
                  </p>
                  <p className="text-[#94a3b8] text-sm mb-1">{exp?.companyName}, {exp?.city}, {exp?.state}</p>
                  <h3 className="text-lg font-bold text-[#1e293b] mb-2">{exp?.title}</h3>
                  <div className="text-sm text-[#475569] leading-relaxed" dangerouslySetInnerHTML={{ __html: exp?.workSummery }} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Template1;
