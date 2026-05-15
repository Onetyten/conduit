'use client'
import { profileInterface, serviceInterface } from '@/lib/types'
import React from 'react'
import PostItem from '../home/posts/postItem'
import { Digital } from 'react-activity'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import Link from 'next/link'

interface propType{
    serviceList:serviceInterface[]
    setServiceList:React.Dispatch<React.SetStateAction<serviceInterface[]>>
    triggerRef: (node: HTMLDivElement | null) => void
    loading:boolean
    profile: profileInterface
}

export default function Services({serviceList,loading,triggerRef,profile}:propType) {
    const user = useSelector((state:RootState)=>state.user.user)
    const isOwnProfile = profile._id===user?._id
  return (
    <div className='w-full flex flex-col gap-4 items-center'>
        <div className='w-full font-semibold text-muted h-full flex justify-center items-center min-h-[20dvh]'>
            {serviceList.length>0?(
                <div className='text-xs py-6 gap-6 justify-start grid grid-cols-1 md:grid-cols-2 w-full'>
                    {serviceList.map((item ,index)=>{
                        return(
                            <PostItem key={index} index={index} openLink post={item}/>
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
        {isOwnProfile && 
            <Link href={'/service/new'} className='bg-foreground cursor-pointer hover:bg-conduit flex justify-center items-center text-background gap-2 p-3 px-7 rounded-full text-base' >
                <Plus size={28}/>
                Create a service
            </Link>
        }
        <div ref={triggerRef} className='size-4'>

        </div>
    </div>
  )
}
