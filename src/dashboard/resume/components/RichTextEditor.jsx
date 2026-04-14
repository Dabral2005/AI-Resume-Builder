import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, Loader2 } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnStyles, BtnUnderline, Editor, EditorProvider, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg'
import { AIChatSession, mockExperienceResponse } from './../../../../service/AIModal';
import { toast } from 'sonner';

const PROMPT = 'Position Title: {positionTitle}. Based on this position, provide 5-7 professional resume bullet points highlighting key responsibilities and achievements. Return ONLY a valid HTML <ul> element with <li> tags. Do not include any other text or JSON. Ensure points are impactful and use action verbs.'

function RichTextEditor({onRichTextEditorChange, index, defaultValue}) {
    const [value, setValue] = useState(defaultValue);
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)
    const [loading, setLoading] = useState(false);

    const GenerateSummeryFromAI = async () => {
      if (!resumeInfo?.Experience[index]?.title) {
        toast.error('Please save the Position Title before generating.');
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
              // Clean up potential markdown or wrapper text
              resp = resp.replace(/```html/g, '').replace(/```/g, '').trim();
          } else {
              resp = mockExperienceResponse(title);
          }
          
          setValue(resp);
          onRichTextEditorChange({ target: { value: resp } });
          toast.success("AI Experience Generated!");
      } catch (err) {
          console.error("AI Generation Error:", err);
          toast.error("Failed to generate AI experience points. Using fallback.");
          const fallback = mockExperienceResponse(title);
          setValue(fallback);
          onRichTextEditorChange({ target: { value: fallback } });
      } finally {
          setLoading(false);
      }
    }
  
    return (
        <div className='flex flex-col gap-2 mt-4'>
            <div className='flex justify-between items-center my-3'>
                <label className='text-[11px] font-black uppercase tracking-[0.2em] text-slate-500'>Responsibilities & Achievements</label>
                <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={GenerateSummeryFromAI}
                    disabled={loading}
                    className="flex gap-2 border-brand-primary/20 text-brand-primary hover:bg-brand-primary/5 hover:border-brand-primary transition-all duration-300 rounded-2xl bg-white h-10 px-4 font-bold shadow-sm"
                >
                    {loading ? <Loader2 className='animate-spin w-4 h-4' /> : <Brain className='h-4 w-4'/>} 
                    AI Assistant 
                </Button>
            </div>
            <div className='border-2 border-slate-100 rounded-[1.5rem] overflow-hidden focus-within:border-brand-primary/40 focus-within:ring-4 focus-within:ring-brand-primary/5 transition-all duration-300 shadow-sm'>
                <EditorProvider>
                    <Editor 
                        value={value} 
                        onChange={(e) => {
                            setValue(e.target.value);
                            onRichTextEditorChange(e);
                        }}
                        className='min-h-[250px] p-6 bg-white outline-none prose prose-slate max-w-none'
                    >
                        <Toolbar className='bg-slate-50/80 backdrop-blur-md border-b border-slate-100 p-2.5 flex flex-wrap gap-1.5'>
                            <BtnBold className='p-2.5 hover:bg-brand-primary/10 hover:text-brand-primary rounded-xl transition-colors'/>
                            <BtnItalic className='p-2.5 hover:bg-brand-primary/10 hover:text-brand-primary rounded-xl transition-colors'/>
                            <BtnUnderline className='p-2.5 hover:bg-brand-primary/10 hover:text-brand-primary rounded-xl transition-colors'/>
                            <BtnStrikeThrough className='p-2.5 hover:bg-brand-primary/10 hover:text-brand-primary rounded-xl transition-colors'/>
                            <Separator className='mx-2 border-l border-slate-200 h-6 my-auto'/>
                            <BtnNumberedList className='p-2.5 hover:bg-brand-primary/10 hover:text-brand-primary rounded-xl transition-colors'/>
                            <BtnBulletList className='p-2.5 hover:bg-brand-primary/10 hover:text-brand-primary rounded-xl transition-colors'/>
                            <Separator className='mx-2 border-l border-slate-200 h-6 my-auto'/>
                            <BtnLink className='p-2.5 hover:bg-brand-primary/10 hover:text-brand-primary rounded-xl transition-colors'/>
                        </Toolbar>
                    </Editor>
                </EditorProvider>
            </div>
        </div>
    )
}

export default RichTextEditor