"use client"
import React from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { GoArrowUpRight } from "react-icons/go";
import { serviceFalse } from '@/state/showServiceSlice/showServiceSlice'
import { useDispatch} from 'react-redux'
import {useLockBodyScroll} from '@uidotdev/usehooks'
import Link from 'next/link'

export default function ServiceModalComponent() {
    useLockBodyScroll()
    const dispatch  = useDispatch()

  return (
        <div className='w-full flex justify-between items-center p-3 pt-16 pb-6 sm:pb-3 sm:pt-3'>
            <IoCloseSharp className='text-2xl' onClick={()=>{dispatch(serviceFalse())}}/>
            
            <div className='flex gap-2 items-center text-xs sm:text-sm text-conduit'>
                <Link href="/serviceDetails">
                    <p>Open service on new page </p>
                </Link>
                
                <GoArrowUpRight className='text-sm sm:text-xl'/>
            </div>
        </div>
  )
}
