"use client"
import React, { useState } from 'react'
import HeaderSlide from './headerSlide'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import Link from 'next/link'
import { signUpTrue } from '@/state/showSignUp/showSignUp'
import SearchForm from './searchForm'

const IntroSection = () => {
    const dispatch = useDispatch()

    const [hiring,setHiring] = useState(true)

    const userReduxData = useSelector((state:RootState)=>state.user.user)
  return (
    <div className='flex flex-col justify-center items-center py-10 px-2'>
        
        <div className='bg-gray-200 text-sm font-bold uppercase p-2 rounded-md '>
            <span className='p-4 cursor-pointer'>Hire</span>
            <span className='p-4 cursor-pointer'>Get Hired</span>
        </div>

     
        <div className='w-full flex sm:flex-row flex-col justify-center gap-3 items-center '>
            <div className=' py-10 gap-6 flex flex-col w-full sm:w-md'>
                <h1 className='text-3xl font-medium'>Skills on Demand</h1>
                <p className='text-sm text-gray-500'>Conduit is revolutionizing service hiring by creating a seamless marketplace for connecting clients with skilled professionals.  </p>

                <div className='sm:text-sm text-xs flex gap-3'>

                    <div className='hover:text-background  hover:bg-foreground cursor-pointer text-foreground border-[1px] border-foreground transition-all  w-fit px-5 py-2 rounded-full'>
                        {userReduxData?(
                            <div>
                            {userReduxData?.isTalent?
                                (
                                <Link href="/" className='cursor-pointer' >
                                    Get Hired
                                </Link>
                                ):(
                                <button onClick={()=>{dispatch(signUpTrue())}} className='cursor-pointer' >
                                    Get Hired
                                </button>
                                )}  
                            </div>
                        
                        ):(
                        <button onClick={()=>{dispatch(signUpTrue())}} className='cursor-pointer' >
                            Get Hired
                        </button>
                        )}
                    </div>
                </div>
            </div>

            <div className='w-full sm:w-md'>
                <HeaderSlide/>

            </div>
        </div>
        <SearchForm/>
    </div>
  )
}

export default IntroSection