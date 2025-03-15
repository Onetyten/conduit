import React from 'react'
import Navbar from '../components/navbar'

export default function layout({children}:{children:React.ReactNode})
{
      
  return (
      <main className='font-inter px-7 py-3'>
          <Navbar/>
          {children}
      </main>
  )
}
