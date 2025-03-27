'use client'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serviceFalse } from '@/state/showServiceSlice/showServiceSlice'
import { IoCloseSharp } from "react-icons/io5";
import { GoArrowUpRight } from "react-icons/go";
import Image from 'next/image';

const ServiceSlider = () => {
    const dispatch  = useDispatch()
    const showReduxModal = useSelector((state)=> state.showService.showService)
    const serviceRedux = useSelector((state)=> state.service.service)
    console.log(showReduxModal)

  



  return (
    <div>
        {showReduxModal&&(
            <div className='h-screen w-full right-0 top-0 fixed flex'>
                <div className='w-[50%] bg-slate-500/50 backdrop-blur-xs' onClick={()=>{dispatch(serviceFalse())}}>

                </div>
                <div className='w-[50%] bg-white flex flex-col gap-2'>
                    <div className='w-full flex justify-between items-center p-3'>
                        <IoCloseSharp className='text-2xl' onClick={()=>{dispatch(serviceFalse())}}/>
                        
                        <div className='flex gap-2 items-center text-sm text-conduit'>
                            <p>Open service on new page </p>
                            <GoArrowUpRight className='text-xl'/>
                        </div>

                    </div>
                    <div className='flex justify-between p-3 items-center'>
                        <div className='flex items-center gap-2'>
                            <div className='relative w-12 h-12'>
                                
                                <Image src={serviceRedux?.galleryImages[0]} fill alt='profilepic' className='rounded-full' />
                                <div className='bg-lime-500 absolute bottom-0 right-0 w-4 h-4 border-[3px] rounded-full border-white z-10'>
                                </div>
                            </div>
                            <div className='flex  flex-col text-sm font-semibold'>
                                <p>{serviceRedux?.title}</p >
                                <p>{serviceRedux?.profileId}</p >
                                
                                

                            </div>
                        </div>

                        <div className='bg-conduit text-background p-2 h-9 flex items-center rounded-full text-xs'>
                            Get in Touch
                        </div>

                    </div>
                
                </div>

                
                
            </div>
            )}
    </div>
    
  )
}

export default ServiceSlider