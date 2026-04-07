import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'
import { Digital } from 'react-activity'

export default function loading() {
  return (
    <div className='w-full min-h-screen pb-10 flex gap-10 px-[10%] flex-col relative'>

        <div className='flex flex-col w-full mt-16 gap-4'>
          <div className='w-full flex gap-2 justify-between'>
            <div className='w-full flex gap-2 items-center '>
              <Skeleton className='size-24 rounded-full aspect-square object-cover'/>
            

              <div className='flex-1 flex text-sm font-medium flex-col gap-2'>
                <div className='flex items-center gap-4'>
                    <Skeleton className='w-28 h-10'/>
                    <Skeleton className='w-28 h-10'/>
                </div>
                
                <Skeleton className='w-40 h-6'/>
              </div>
              
            </div>

            <Skeleton className=' h-10 w-32 rounded-full'/>
        
          </div>
        
            <Skeleton className=' h-10 w-48'/>
            <Skeleton className=' h-10 w-44'/>
            <Skeleton className=' h-6 w-20'/>

        </div>

        <Skeleton className=' h-64 w-full'/>
        

    </div>
  )
}

