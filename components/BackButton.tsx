'use client'
import React from 'react'
import { MdArrowBack } from 'react-icons/md'
import { useRouter } from 'next/navigation'

export default function BackButton() {
    const router = useRouter()
  return (
  <button onClick={()=>{router.back()}} className='absolute top-3 left-3 text-2xl bg-conduit hover:bg-softblue hover:text-conduit p-2 text-white rounded-full'>
        <MdArrowBack className=''/>
  </button>
  )
}

