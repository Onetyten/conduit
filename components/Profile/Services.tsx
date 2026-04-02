'use client'
import { serviceInterface } from '@/lib/types'
import React from 'react'
import PostItem from '../home/posts/postItem'
import { Digital } from 'react-activity'

interface propType{
    serviceList:serviceInterface[]
    setServiceList:React.Dispatch<React.SetStateAction<serviceInterface[]>>
    triggerRef: (node: HTMLDivElement | null) => void
    loading:boolean
}

export default function Services({serviceList,loading,triggerRef}:propType) {
  return (
    <div className='w-full flex flex-col gap-4 items-center'>
        <div className='w-full font-semibold text-muted h-full flex justify-center items-center min-h-[20dvh]'>
            {serviceList.length>0?(
                <div className='text-xs py-6 gap-6 justify-start grid grid-cols-1 md:grid-cols-2 w-full'>
                    {serviceList.map((item ,index)=>{
                        return(
                            <PostItem key={index} index={index} post={item}/>
                        )
                    })}
                </div>
                ):(
                loading?(
                    <Digital size={30} color="#373f51" />
                ):(
                    <div className='text-3xl font-semibold text-muted'>
                        No Services Available
                    </div>
                )
                
                )}
        </div>
        <div ref={triggerRef} className='size-4'>

        </div>
    </div>
  )
}
