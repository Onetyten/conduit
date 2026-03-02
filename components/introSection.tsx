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

    const [userHiring,setUserHiring] = useState(true)

    const userReduxData = useSelector((state:RootState)=>state.user.user)
  return (
    <div className='flex w-full sm:w-3xl max-x-full flex-col gap-2 justify-center items-center py-10 px-2'>
        
        <div className='bg-gray-200 text-xs flex items-center  gap-2 font-bold uppercase p-1.5 rounded-md '>
            <span onClick={()=>setUserHiring(true)} className={`p-3.5 rounded-md ${userHiring?"bg-white":""} cursor-pointer`}>Hire</span>
            <span onClick={()=>setUserHiring(false)} className={` p-3.5 ${userHiring?"":"bg-white"} rounded-md cursor-pointer`}>Get Hired</span>
        </div>

     
        <div className='w-full flex sm:flex-row flex-col justify-center gap-3 items-center '>
            <div className=' py-10 gap-6 flex flex-col w-full'>
                <h1 className='text-5xl font-semibold'>Skills on Demand</h1>
                <p className='text-lg font-medium text-gray-500'>Conduit is revolutionizing service hiring by creating a seamless marketplace for connecting clients with skilled professionals.  </p>
            </div>

            <HeaderSlide/>
        </div>

        <div className='h-14 w-full flex justify-center items-center'>
            {userHiring?<SearchForm/>:(

                <div onClick={()=>{
                    if (!userReduxData) dispatch(signUpTrue())
                }}  
                className='bg-conduit cursor-pointer shadow-conduit/40 transition-all duration-200 hover:shadow-conduit/30 px-8 rounded-full shadow-lg hover:shadow-xl  font-semibold text-white flex w-fit justify-center items-center h-full'>
                    { userReduxData?"My services":"Join the system"} 
                </div>
            )}
        </div>

    </div>
  )
}

export default IntroSection