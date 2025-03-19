import React from 'react'
import NavbarAuth from '@/components/navbarauth'

export default function layout({children}:{children:React.ReactNode})
{
      
  return (
      <main className='font-inter px-7 py-3'>
          <NavbarAuth/>
          {children}
      </main>
  )
}
