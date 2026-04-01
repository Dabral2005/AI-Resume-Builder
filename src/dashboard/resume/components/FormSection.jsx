import React, { useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Home, LayoutGrid, User, FileText, Briefcase, GraduationCap, Star, CheckCircle2 } from 'lucide-react'
import Summery from './forms/Summery';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/Skills';
import { Link, Navigate, useParams } from 'react-router-dom';
import ThemeColor from './ThemeColor';

const steps = [
  { label: 'Personal', icon: User },
  { label: 'Summary', icon: FileText },
  { label: 'Experience', icon: Briefcase },
  { label: 'Education', icon: GraduationCap },
  { label: 'Skills', icon: Star },
];

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(true);
  const { resumeId } = useParams();

  return (
    <div>
      {/* Top Actions Bar */}
      <div className='flex justify-between items-center mb-6'>
        <div className='flex gap-3'>
          <Link to={"/dashboard"}>
            <Button variant="outline" size="sm" className='rounded-xl border-gray-200 hover:bg-gray-50'>
              <Home className='w-4 h-4' />
            </Button>
          </Link>
          <ThemeColor />
        </div>
        <div className='flex gap-2'>
          {activeFormIndex > 1 &&
            <Button size="sm" variant="outline"
              className='rounded-xl border-gray-200 hover:bg-gray-50 gap-1'
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}>
              <ArrowLeft className='w-4 h-4' /> Back
            </Button>
          }
          <Button
            disabled={!enableNext}
            className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg shadow-violet-500/20 gap-1"
            size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            {activeFormIndex === 5 ? 'Finish' : 'Next'}
            <ArrowRight className='w-4 h-4' />
          </Button>
        </div>
      </div>

      {/* Step Indicator */}
      <div className='flex items-center mb-8 px-2'>
        {steps.map((step, index) => {
          const stepNum = index + 1;
          const isActive = stepNum === activeFormIndex;
          const isCompleted = stepNum < activeFormIndex;
          const StepIcon = step.icon;

          return (
            <React.Fragment key={index}>
              <div className='flex flex-col items-center gap-1.5 min-w-0'>
                <div
                  className={`step-dot cursor-pointer transition-all duration-300 ${isActive ? 'active' : isCompleted ? 'completed' : 'inactive'
                    }`}
                  onClick={() => setActiveFormIndex(stepNum)}
                >
                  {isCompleted ? (
                    <CheckCircle2 className='w-4 h-4' />
                  ) : (
                    <StepIcon className='w-4 h-4' />
                  )}
                </div>
                <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-violet-600' : isCompleted ? 'text-emerald-600' : 'text-gray-400'
                  }`}>
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`step-line mx-1 mb-5 ${isCompleted ? 'completed' : ''}`}></div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Form Content */}
      <div className='animate-fade-in'>
        {activeFormIndex === 1 ?
          <PersonalDetail enabledNext={(v) => setEnableNext(v)} />
          : activeFormIndex === 2 ?
            <Summery enabledNext={(v) => setEnableNext(v)} />
            : activeFormIndex === 3 ?
              <Experience />
              : activeFormIndex === 4 ?
                <Education />
                : activeFormIndex === 5 ?
                  <Skills />
                  : activeFormIndex === 6 ?
                    <Navigate to={'/my-resume/' + resumeId + "/view"} />
                    : null
        }
      </div>
    </div>
  )
}

export default FormSection