'use client'
import React from 'react'
import { MdArrowBack,MdArrowForward } from 'react-icons/md'

interface propType{
    direction:number
    Click:()=>void
}



export default function NavigationButton(prop:propType) {
    const {Click,direction} = prop
  return (
    <button onClick={Click} className='text-2xl bg-softblue hover:bg-gray-200 p-2 text-conduit rounded-full'>
         {direction==1 ? <MdArrowForward /> : <MdArrowBack />}
    </button>
  )
}
