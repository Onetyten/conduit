"use client"
import React from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { GoArrowUpRight } from "react-icons/go";
import { serviceFalse } from '@/state/showServiceSlice'
import { useDispatch} from 'react-redux'
import {useLockBodyScroll} from '@uidotdev/usehooks'
import Link from 'next/link'
import { serviceInterface } from '@/lib/types';
import { useRouter } from 'next/navigation';

interface propType{
    service:serviceInterface | null
}

export default function ServiceModalComponent({service}:propType) {
    useLockBodyScroll()
    const dispatch  = useDispatch()
    const router = useRouter()

    function handleClose(){
        dispatch(serviceFalse())
        
    }

  return (
        <div className='w-full flex justify-between  items-center p-3'>
            <IoCloseSharp className='text-2xl cursor-pointer ' onClick={handleClose}/>
            
            <div onMouseEnter={()=>router.prefetch(`/service/${service?._id}`)} className='flex gap-2 items-center text-xs sm:text-sm text-conduit'>
                <Link href={`/service/${service?._id}`}>
                    <p>Open service on new page </p>
                </Link>
                
                <GoArrowUpRight className='text-sm sm:text-xl'/>
            </div>
        </div>
  )
}
