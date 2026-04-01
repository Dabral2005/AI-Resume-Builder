import { Loader2Icon, MoreVertical } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import GlobalApi from './../../../service/GlobalApi'
import { toast } from 'sonner'

function ResumeCardItem({ resume, refreshData }) {
  const navigation = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = () => {
    setLoading(true);
    GlobalApi.DeleteResumeById(resume.documentId).then(resp => {
      toast('Resume Deleted!');
      refreshData()
      setLoading(false);
      setOpenAlert(false);
    }, (error) => {
      setLoading(false);
    })
  }

  return (
    <div className='group'>
      <Link to={'/dashboard/resume/' + resume.documentId + "/edit"}>
        <div className='card-premium h-[300px] overflow-hidden'>
          {/* Card Top - Visual */}
          <div className='h-[220px] relative overflow-hidden rounded-t-2xl'
            style={{
              background: `linear-gradient(135deg, ${resume?.themeColor || '#7c3aed'}15, ${resume?.themeColor || '#7c3aed'}08)`
            }}
          >
            {/* Decorative elements */}
            <div className='absolute top-4 right-4 w-20 h-20 rounded-full opacity-20'
              style={{ background: resume?.themeColor || '#7c3aed' }}
            ></div>
            <div className='absolute bottom-8 left-4 w-12 h-12 rounded-lg opacity-10'
              style={{ background: resume?.themeColor || '#7c3aed' }}
            ></div>

            {/* Resume Icon */}
            <div className='flex items-center justify-center h-full'>
              <div className='w-20 h-24 bg-white rounded-lg shadow-lg p-3 group-hover:scale-105 transition-transform duration-300 relative'>
                <div className='space-y-1.5'>
                  <div className='h-2 rounded-full w-full' style={{ background: resume?.themeColor || '#7c3aed' }}></div>
                  <div className='h-1 bg-gray-200 rounded-full w-3/4'></div>
                  <div className='h-1 bg-gray-100 rounded-full w-full'></div>
                  <div className='h-1 bg-gray-100 rounded-full w-5/6'></div>
                  <div className='h-1 bg-gray-100 rounded-full w-full'></div>
                  <div className='h-1.5 rounded-full w-2/3 mt-1' style={{ background: resume?.themeColor || '#7c3aed', opacity: 0.3 }}></div>
                  <div className='h-1 bg-gray-100 rounded-full w-full'></div>
                  <div className='h-1 bg-gray-100 rounded-full w-4/5'></div>
                </div>
              </div>
            </div>

            {/* Top color bar */}
            <div className='absolute top-0 left-0 right-0 h-1'
              style={{ background: resume?.themeColor || '#7c3aed' }}
            ></div>
          </div>

          {/* Card Bottom - Info */}
          <div className='px-4 py-3 flex items-center justify-between'>
            <div className='min-w-0'>
              <h3 className='text-sm font-semibold text-gray-900 truncate'>{resume.title}</h3>
              <p className='text-xs text-gray-400 mt-0.5'>
                {resume.createdAt ? new Date(resume.createdAt).toLocaleDateString() : 'Recently created'}
              </p>
            </div>
          </div>
        </div>
      </Link>

      {/* Menu button - positioned outside the link */}
      <div className='relative -mt-10 mr-3 flex justify-end'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className='w-8 h-8 rounded-lg bg-white shadow-sm border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors'>
              <MoreVertical className='h-4 w-4 text-gray-500' />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='rounded-xl shadow-lg border-gray-100'>
            <DropdownMenuItem className='rounded-lg cursor-pointer' onClick={() => navigation('/dashboard/resume/' + resume.documentId + "/edit")}>
              ✏️ Edit
            </DropdownMenuItem>
            <DropdownMenuItem className='rounded-lg cursor-pointer' onClick={() => navigation('/my-resume/' + resume.documentId + "/view")}>
              👁️ View
            </DropdownMenuItem>
            <DropdownMenuItem className='rounded-lg cursor-pointer' onClick={() => navigation('/my-resume/' + resume.documentId + "/view")}>
              📥 Download
            </DropdownMenuItem>
            <DropdownMenuItem className='rounded-lg cursor-pointer text-red-600 focus:text-red-600' onClick={() => setOpenAlert(true)}>
              🗑️ Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AlertDialog open={openAlert}>
        <AlertDialogContent className='rounded-2xl'>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Resume?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this resume
              and all its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className='rounded-xl' onClick={() => setOpenAlert(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete}
              className='rounded-xl bg-red-600 hover:bg-red-700'
              disabled={loading}>
              {loading ? <Loader2Icon className='animate-spin' /> : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default ResumeCardItem