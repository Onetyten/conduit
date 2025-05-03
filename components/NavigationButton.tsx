'use client'
import React from 'react'
import { MdArrowBack,MdArrowForward } from 'react-icons/md'

export default function NavigationButton(props) {
    const {Click,direction} = props
  return (
    <button onClick={Click} className='text-2xl bg-blue-100 hover:bg-blue-200 p-2 text-conduit rounded-full'>
         {direction==1 ? <MdArrowForward /> : <MdArrowBack />}
    </button>
  )
}
