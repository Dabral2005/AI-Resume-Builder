import React from 'react';

function Template4({ resumeInfo }) {
  const themeColor = resumeInfo?.themeColor || '#15803d'; // Default green

  return (
    <div className="w-full min-h-[1056px] bg-white shadow-lg resume-document font-sans flex flex-col">
      {/* Top Header */}
      <div 
        className="w-full py-8 px-10 text-white flex justify-between items-center"
        style={{ backgroundColor: themeColor }}
      >
        <div>
            <h1 className="text-4xl font-bold mb-1">{resumeInfo?.firstName} {resumeInfo?.lastName}</h1>
            <h2 className="text-xl font-medium">{resumeInfo?.jobTitle}</h2>
            <div className="flex flex-wrap gap-x-4 mt-2 text-sm text-white/90">
                {resumeInfo?.address && <span>{resumeInfo?.address}</span>}
                {resumeInfo?.phone && <span>| {resumeInfo?.phone}</span>}
                {resumeInfo?.email && <span>| {resumeInfo?.email}</span>}
            </div>
        </div>
        <div className="w-24 h-24 rounded-full bg-white/20 border-2 border-white/50 overflow-hidden shrink-0 flex items-center justify-center">
            {resumeInfo?.profileImage ? (
                <img src={resumeInfo?.profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
                <span className="text-white text-2xl font-bold">{resumeInfo?.firstName?.[0]}{resumeInfo?.lastName?.[0]}</span>
            )}
        </div>
      </div>

      <div className="flex flex-col p-10 pt-6 gap-8">
        {/* Profile Summary */}
        {resumeInfo?.summery && (
            <div>
                <p className="text-sm font-semibold text-gray-800 leading-relaxed text-justify">
                    A {resumeInfo?.jobTitle} {resumeInfo?.summery}
                </p>
            </div>
        )}

        {/* Experience */}
        {resumeInfo?.Experience?.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: themeColor }}>Professional Experience</h2>
            <div className="flex flex-col gap-6">
              {resumeInfo?.Experience.map((exp, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-32 text-sm text-gray-500 font-medium shrink-0 pt-1">
                    {exp?.startDate} - <br/> {exp?.endDate || 'Present'}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">{exp?.companyName}</h3>
                    <h4 className="text-md font-bold text-gray-700 italic mb-2">{exp?.title}</h4>
                    <div className="text-sm text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: exp?.workSummery }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resumeInfo?.education?.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: themeColor }}>Education</h2>
            <div className="flex flex-col gap-6">
              {resumeInfo?.education.map((edu, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-32 text-sm text-gray-500 font-medium shrink-0 pt-1">
                    {edu?.startDate} - <br/> {edu?.endDate}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-md font-bold text-gray-900">{edu?.degree} in {edu?.major}</h3>
                    <p className="text-sm text-gray-700 mt-1">{edu?.universityName}</p>
                    {edu?.description && <p className="text-sm text-gray-600 mt-2">{edu?.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {resumeInfo?.skills?.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: themeColor }}>Key Skills</h2>
            <ul className="list-disc list-inside flex flex-col gap-2 text-sm text-gray-700 font-medium">
              {resumeInfo?.skills.map((skill, index) => (
                <li key={index}>{skill.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Template4;
