'use client'
import React from 'react'
import { MdArrowBack } from 'react-icons/md'
import { useRouter } from 'next/navigation'

export default function BackButton() {
    const router = useRouter()
  return (
    <button onClick={()=>{router.back()}} className='absolute top-3 left-3 text-2xl bg-blue-100 hover:bg-blue-200 p-2 text-conduit rounded-full'>
        <MdArrowBack className=''/>
  </button>
  )
}

