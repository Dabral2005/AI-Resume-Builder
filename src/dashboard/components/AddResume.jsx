import { Loader2, PlusSquare, Plus } from 'lucide-react'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { v4 as uuidv4 } from 'uuid';
import GlobalApi from './../../../service/GlobalApi'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

function AddResume() {
    const [openDialog, setOpenDialog] = useState(false)
    const [resumeTitle, setResumeTitle] = useState();
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const navigation = useNavigate();

    const onCreate = async () => {
        setLoading(true)
        const uuid = uuidv4();
        const data = {
            data: {
                title: resumeTitle,
                resumeId: uuid,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                userName: user?.fullName
            }
        }

        GlobalApi.CreateNewResume(data).then(resp => {
            if (resp) {
                setLoading(false);
                navigation('/dashboard/resume/' + resp.data.data.documentId + "/edit");
            }
        }, (error) => {
            setLoading(false);
        })
    }

    return (
        <div>
            <div className='group h-[300px] rounded-2xl border-2 border-dashed border-gray-200
                flex flex-col items-center justify-center 
                bg-white hover:bg-violet-50/50
                hover:border-violet-300 cursor-pointer
                transition-all duration-300 ease-out
                hover:shadow-lg hover:shadow-violet-500/5'
                onClick={() => setOpenDialog(true)}
            >
                <div className='w-14 h-14 rounded-2xl bg-gray-50 group-hover:bg-violet-100 
                    flex items-center justify-center mb-3
                    transition-all duration-300 group-hover:scale-110'>
                    <Plus className='w-6 h-6 text-gray-400 group-hover:text-violet-600 transition-colors duration-300' />
                </div>
                <span className='text-sm font-medium text-gray-400 group-hover:text-violet-600 transition-colors duration-300'>
                    Create New
                </span>
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className='rounded-2xl'>
                    <DialogHeader>
                        <DialogTitle className='text-xl font-bold'>Create New Resume</DialogTitle>
                        <DialogDescription asChild>
                            <div className='mt-4'>
                                <p className='text-gray-500 mb-4'>Give your resume a title to get started</p>
                                <Input
                                    className="rounded-xl h-11 border-gray-200 focus:border-violet-400 focus:ring-violet-400"
                                    placeholder="e.g. Full Stack Developer Resume"
                                    onChange={(e) => setResumeTitle(e.target.value)}
                                />
                            </div>
                        </DialogDescription>
                        <div className='flex justify-end gap-3 mt-6'>
                            <Button onClick={() => setOpenDialog(false)} variant="ghost"
                                className='rounded-xl'>
                                Cancel
                            </Button>
                            <Button
                                disabled={!resumeTitle || loading}
                                onClick={() => onCreate()}
                                className='rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg shadow-violet-500/20'>
                                {loading ?
                                    <Loader2 className='animate-spin w-4 h-4' /> : 'Create Resume'
                                }
                            </Button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddResume