import React from 'react';

function Template2({ resumeInfo }) {
  const themeColor = resumeInfo?.themeColor || '#1f2937'; // Default dark slate

  return (
    <div className="flex w-full min-h-[1056px] bg-white shadow-lg resume-document font-sans">
      {/* Left Sidebar */}
      <div 
        className="w-[35%] py-10 px-8 text-white flex flex-col gap-8"
        style={{ backgroundColor: themeColor }}
      >
        <div className="text-center">
            <div className="w-48 h-48 mx-auto rounded-full bg-white/10 border-[6px] border-white/20 overflow-hidden mb-6 flex items-center justify-center">
                {resumeInfo?.profileImage ? (
                    <img src={resumeInfo?.profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                    <span className="text-white text-5xl font-bold">{resumeInfo?.firstName?.[0]}{resumeInfo?.lastName?.[0]}</span>
                )}
            </div>
            <h1 className="text-3xl font-bold tracking-wide mb-2">{resumeInfo?.firstName} <br/> {resumeInfo?.lastName}</h1>
            <h2 className="text-lg text-white/70 tracking-widest">{resumeInfo?.jobTitle}</h2>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-bold tracking-widest uppercase mb-4 text-white">Contact</h3>
          <div className="flex flex-col gap-3 text-sm text-white/90">
            {resumeInfo?.phone && (
              <div className="flex items-center gap-3">
                <span>📞</span>
                <p>{resumeInfo?.phone}</p>
              </div>
            )}
            {resumeInfo?.email && (
              <div className="flex items-center gap-3">
                <span>✉️</span>
                <p className="break-words">{resumeInfo?.email}</p>
              </div>
            )}
            {resumeInfo?.address && (
              <div className="flex items-center gap-3">
                <span>📍</span>
                <p>{resumeInfo?.address}</p>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {resumeInfo?.skills?.length > 0 && (
          <div>
            <h3 className="text-xl font-bold tracking-widest uppercase mb-4 text-white">Skills</h3>
            <ul className="flex flex-col gap-2 text-sm text-white/90 list-none">
              {resumeInfo?.skills.map((skill, index) => (
                <li key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 border border-white rounded-full"></div>
                    {skill.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="w-[65%] py-10 px-12 bg-white">
        
        {/* Profile Summary */}
        {resumeInfo?.summery && (
            <div className="mb-10">
                <h2 className="text-2xl font-bold tracking-widest uppercase text-[#1f2937] border-b-2 border-gray-100 pb-2 mb-4">Profile</h2>
                <p className="text-sm text-gray-600 leading-relaxed text-justify">
                    {resumeInfo?.summery}
                </p>
            </div>
        )}

        {/* Experience */}
        {resumeInfo?.Experience?.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold tracking-widest uppercase text-[#1f2937] border-b-2 border-gray-100 pb-2 mb-6">Work Experience</h2>
            <div className="flex flex-col gap-8">
              {resumeInfo?.Experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-lg font-bold text-[#1f2937]">{exp?.title}</h3>
                      <p className="text-sm font-semibold tracking-wider text-gray-500">
                        {exp?.startDate} - {exp?.endDate || 'Present'}
                      </p>
                  </div>
                  <p className="text-gray-500 text-sm italic mb-2">{exp?.companyName} — {exp?.city}, {exp?.state}</p>
                  <div className="text-sm text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: exp?.workSummery }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resumeInfo?.education?.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold tracking-widest uppercase text-[#1f2937] border-b-2 border-gray-100 pb-2 mb-6">Education</h2>
            <div className="flex flex-col gap-6">
              {resumeInfo?.education.map((edu, index) => (
                <div key={index}>
                  <h3 className="text-lg font-bold text-[#1f2937]">{edu?.degree} in {edu?.major}</h3>
                  <div className="flex justify-between items-baseline mt-1">
                      <p className="text-sm text-gray-500 italic">{edu?.universityName}</p>
                      <p className="text-sm font-semibold text-gray-500">{edu?.startDate} - {edu?.endDate}</p>
                  </div>
                  {edu?.description && <p className="text-sm text-gray-600 mt-2">{edu?.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Template2;
