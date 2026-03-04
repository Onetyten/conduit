'use client'
import Sidebar from '@/components/Profile/Sidebar';
import React from 'react'

interface propType{
    children:React.ReactNode
}

export default function Layout({children}:propType) {

  return (
    <div className='w-full flex min-h-screen'>
        <Sidebar/>
        <div className='w-full shadow-xl min-h-screen'>
          {children}
        </div>  
    </div>
  )
}
