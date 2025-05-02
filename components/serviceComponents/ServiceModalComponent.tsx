import React from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { GoArrowUpRight } from "react-icons/go";
import { serviceFalse } from '@/state/showServiceSlice/showServiceSlice'
import { useDispatch} from 'react-redux'
import {useLockBodyScroll} from '@uidotdev/usehooks'

export default function ServiceModalComponent() {
    useLockBodyScroll()
    const dispatch  = useDispatch()

  return (
        <div className='w-full flex justify-between items-center p-3'>
            <IoCloseSharp className='text-2xl' onClick={()=>{dispatch(serviceFalse())}}/>
            
            <div className='flex gap-2 items-center text-sm text-conduit'>
                <p>Open service on new page </p>
                <GoArrowUpRight className='text-xl'/>
            </div>
        </div>
  )
}
