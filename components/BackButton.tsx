'use client'
import React from 'react'
import { MdArrowBack } from 'react-icons/md'
import { useRouter } from 'next/navigation'

interface propType{
  relative?:boolean
}

export default function BackButton({relative}:propType) {
    const router = useRouter()
  return (
  <button onClick={()=>{router.back()}} className={` ${!relative?"absolute top-3 left-":""}3 text-2xl bg-conduit hover:bg-softblue hover:text-conduit p-2 text-white rounded-full`}>
        <MdArrowBack className=''/>
  </button>
  )
}

