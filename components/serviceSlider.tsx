'use client'

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serviceFalse } from '@/state/showServiceSlice/showServiceSlice'
import { IoCloseSharp } from "react-icons/io5";
import { GoArrowUpRight } from "react-icons/go";

const ServiceSlider = () => {
    const dispatch  = useDispatch()
    const showReduxModal = useSelector((state)=> state.showService.showService)
    console.log(showReduxModal)
  return (
    <div>
        {showReduxModal&&(
            <div className='h-screen w-full right-0 top-0 fixed flex'>
                <div className='w-[50%] bg-slate-500/50 backdrop-blur-xs' onClick={()=>{dispatch(serviceFalse())}}>

                </div>
                <div className='w-[50%] bg-white flex flex-col'>
                    <div className='w-full flex justify-between items-center p-3'>
                        <IoCloseSharp className='text-2xl' onClick={()=>{dispatch(serviceFalse())}}/>
                        
                        <div className='flex gap-2 items-center text-sm text-conduit'>
                            <p>Open service on new page </p>
                            <GoArrowUpRight className='text-xl'/>
                        </div>

                    </div>
                
                </div>
            </div>
            )}
    </div>
    
  )
}

export default ServiceSlider