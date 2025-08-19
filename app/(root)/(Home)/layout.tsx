'use client'
import React from 'react'
import NavbarAuth from '@/components/navbar'

export default function layout({children}:{children:React.ReactNode})
{  
  return (
      <main className='sm:px-7 px-3 py-3 pt-5 flex w-full justify-center flex-col items-center'>
          <NavbarAuth/>
          {children}
      </main>
  )
}
