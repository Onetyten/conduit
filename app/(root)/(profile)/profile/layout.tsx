'use client'
import Sidebar from '@/components/Profile/Sidebar';
import { RootState } from '@/store';
import React from 'react'
import { useSelector } from 'react-redux';

interface propType{
    children:React.ReactNode
}

export default function Layout({children}:propType) {
  const userData = useSelector((state:RootState)=>state.user.user)

  return (
    <div className='w-full flex h-screen relative overflow-hidden'>
        {userData?._id && <Sidebar/> }
        
        <div className='w-full overflow-y-scroll shadow-xl min-h-screen'>
          {children}
        </div>  
    </div>
  )
}
