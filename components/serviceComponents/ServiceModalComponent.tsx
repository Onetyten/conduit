"use client"
import React from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { GoArrowUpRight } from "react-icons/go";
import { serviceFalse } from '@/state/showServiceSlice/showServiceSlice'
import { useDispatch} from 'react-redux'
import {useLockBodyScroll} from '@uidotdev/usehooks'
import Link from 'next/link'
import { setToProfile } from '@/state/profileIsMe/profileIsMeSlice';

export default function ServiceModalComponent() {
    useLockBodyScroll()
    const dispatch  = useDispatch()

    function handleClose(){
        dispatch(setToProfile())
        dispatch(serviceFalse())
        
    }

  return (
        <div className='w-full flex justify-between  items-center p-3'>
            <IoCloseSharp className='text-2xl cursor-pointer ' onClick={handleClose}/>
            
            <div className='flex gap-2 items-center text-xs sm:text-sm text-conduit'>
                <Link href="/serviceDetails">
                    <p>Open service on new page </p>
                </Link>
                
                <GoArrowUpRight className='text-sm sm:text-xl'/>
            </div>
        </div>
  )
}
