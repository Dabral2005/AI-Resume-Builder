import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Button } from '@/components/ui/button'
import { Loader2, Plus, Trash2 } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from './../../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

function Skills() {
    const [skillsList, setSkillsList] = useState([]);
    const {resumeId} = useParams();
    const [loading, setLoading] = useState(false);
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
   
    useEffect(() => {
        resumeInfo?.skills?.length > 0 && setSkillsList(resumeInfo?.skills)
    }, [])
   
    const handleChange = (index, name, value) => {
        const newEntries = [...skillsList];
        newEntries[index][name] = value;
        setSkillsList(newEntries);
    }

    const AddNewSkills = () => {
        setSkillsList([...skillsList, { name: '', rating: 0 }])
    }
    
    const RemoveSkills = () => {
        if (skillsList.length > 0) {
            setSkillsList(skillsList => skillsList.slice(0, -1))
        }
    }

    const onSave = () => {
        setLoading(true);
        const data = {
            data: {
                skills: skillsList.map(({ id, ...rest }) => rest)
            }
        }

        GlobalApi.UpdateResumeDetail(resumeId, data)
            .then(resp => {
                setLoading(false);
                toast.success('Skills updated successfully!');
            }, (error) => {
                setLoading(false);
                toast.error('Failed to update skills');
            })
    }

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            skills: skillsList
        })
    }, [skillsList])

    return (
        <div className='card-premium p-8 border-t-4 border-t-violet-600 mt-6'>
            <div className='mb-6'>
                <h2 className='text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent'>Professional Skills</h2>
                <p className='text-gray-500 mt-1'>Highlight your top technical and professional skills</p>
            </div>

            <div className='space-y-4 mb-8'>
                {skillsList.map((item, index) => (
                    <div key={index} className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl border border-gray-100 bg-white hover:border-violet-200 transition-colors shadow-sm'>
                        <div className='w-full sm:w-1/2'>
                            <label className='text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block'>Skill Name</label>
                            <Input 
                                className="w-full bg-gray-50/50 rounded-xl focus:ring-violet-500 focus:border-violet-500 border-gray-200"
                                placeholder="e.g. React, Python, Project Management"
                                defaultValue={item.name}
                                onChange={(e) => handleChange(index, 'name', e.target.value)} 
                            />
                        </div>
                        <div className='w-full sm:w-auto mt-2 sm:mt-0'>
                            <label className='text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block sm:hidden'>Proficiency</label>
                            <div className='bg-gray-50 p-2.5 rounded-xl border border-gray-100 flex items-center justify-center w-full sm:w-auto'>
                                <Rating 
                                    style={{ maxWidth: 140 }} 
                                    value={item.rating} 
                                    onChange={(v) => handleChange(index, 'rating', v)}
                                    itemStyles={{
                                        itemShapes: 'circle',
                                        activeFillColor: '#8b5cf6',
                                        inactiveFillColor: '#ede9fe'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {skillsList.length === 0 && (
                <div className='text-center py-10 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 mb-8'>
                    <p className='text-gray-500'>No skills added yet.</p>
                </div>
            )}

            <div className='flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-100'>
                <div className='flex gap-3 w-full sm:w-auto'>
                    <Button variant="outline" onClick={AddNewSkills} className="text-violet-700 border-violet-200 hover:bg-violet-50 rounded-xl gap-2 flex-1 sm:flex-none"> 
                        <Plus className='w-4 h-4' /> Add Skill
                    </Button>
                    {skillsList.length > 0 && (
                        <Button variant="outline" onClick={RemoveSkills} className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 rounded-xl gap-2 flex-1 sm:flex-none"> 
                            <Trash2 className='w-4 h-4' /> Remove
                        </Button>
                    )}
                </div>
                <Button disabled={loading} onClick={onSave} className="btn-premium w-full sm:w-auto px-8">
                    {loading ? <Loader2 className='animate-spin w-4 h-4' /> : 'Save Changes'}    
                </Button>
            </div>
        </div>
    )
}

export default Skills