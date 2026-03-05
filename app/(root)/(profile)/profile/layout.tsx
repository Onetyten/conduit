'use client'
import Sidebar from '@/components/Profile/Sidebar';
import React from 'react'

interface propType{
    children:React.ReactNode
}

export default function Layout({children}:propType) {

  return (
    <div className='w-full flex h-screen overflow-hidden'>
        <Sidebar/>
        <div className='w-full overflow-y-scroll shadow-xl min-h-screen'>
          {children}
        </div>  
    </div>
  )
}
