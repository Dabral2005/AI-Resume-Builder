import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, Loader2 } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnStyles, BtnUnderline, Editor, EditorProvider, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg'
import { AIChatSession, mockExperienceResponse } from './../../../../service/AIModal';
import { toast } from 'sonner';

const PROMPT='position title: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experience level and No JSON array) , give me result in HTML tags'

function RichTextEditor({onRichTextEditorChange, index, defaultValue}) {
    const [value, setValue] = useState(defaultValue);
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)
    const [loading, setLoading] = useState(false);

    const GenerateSummeryFromAI = async () => {
      if (!resumeInfo?.Experience[index]?.title) {
        toast('Please Add Position Title First');
        return;
      }
      setLoading(true)
      const title = resumeInfo.Experience[index].title;
      const prompt = PROMPT.replace('{positionTitle}', title);
      
      try {
          let resp;
          if (AIChatSession) {
              const result = await AIChatSession.sendMessage(prompt);
              resp = result.response.text();
          } else {
              // Fallback Mock Response
              resp = mockExperienceResponse(title);
          }
          const cleanResp = resp.replace('[', '').replace(']', '');
          setValue(cleanResp);
          onRichTextEditorChange({ target: { value: cleanResp } });
      } catch (err) {
          console.error(err);
          toast.error("Failed to generate AI experience points");
      } finally {
          setLoading(false);
      }
    }
  
    return (
        <div className='flex flex-col gap-2 mt-2'>
            <div className='flex justify-between items-center my-2'>
                <label className='text-sm font-semibold text-gray-700'>Responsibilities & Achievements</label>
                <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={GenerateSummeryFromAI}
                    disabled={loading}
                    className="flex gap-2 border-violet-300 text-violet-700 hover:bg-violet-50 transition-colors duration-300 rounded-xl bg-white"
                >
                    {loading ? <Loader2 className='animate-spin w-4 h-4' /> : <Brain className='h-4 w-4'/>} 
                    Generate from AI 
                </Button>
            </div>
            <div className='border-2 border-gray-100 rounded-2xl overflow-hidden focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500 transition-all'>
                <EditorProvider>
                    <Editor 
                        value={value} 
                        onChange={(e) => {
                            setValue(e.target.value);
                            onRichTextEditorChange(e);
                        }}
                        className='min-h-[200px] p-4 bg-gray-50/30'
                    >
                        <Toolbar className='bg-gray-50 border-b border-gray-100 p-2 flex flex-wrap gap-1 rounded-t-xl'>
                            <BtnBold className='p-2 hover:bg-violet-100 rounded-lg'/>
                            <BtnItalic className='p-2 hover:bg-violet-100 rounded-lg'/>
                            <BtnUnderline className='p-2 hover:bg-violet-100 rounded-lg'/>
                            <BtnStrikeThrough className='p-2 hover:bg-violet-100 rounded-lg'/>
                            <Separator className='mx-1 border-l border-gray-300'/>
                            <BtnNumberedList className='p-2 hover:bg-violet-100 rounded-lg'/>
                            <BtnBulletList className='p-2 hover:bg-violet-100 rounded-lg'/>
                            <Separator className='mx-1 border-l border-gray-300'/>
                            <BtnLink className='p-2 hover:bg-violet-100 rounded-lg'/>
                        </Toolbar>
                    </Editor>
                </EditorProvider>
            </div>
        </div>
    )
}

export default RichTextEditor