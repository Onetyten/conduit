'use client'
import { ChevronRight } from 'lucide-react'
import React from 'react'

interface propType{
    direction:number
    Click:()=>void
}



export default function NavigationButton(prop:propType) {
    const {Click,direction} = prop
  return (
    <button onClick={Click} className={`flex-1 h-11 ${direction==1 ? "bg-conduit hover:bg-black text-white":"text-black border border-muted hover:bg-softblue/30" } w-full rounded-lg font-semibold cursor-pointer  transition-colors text-sm flex items-center justify-center gap-2`}>
       {direction==1 ? <span className='flex gap-2 justify-center items-center px-2'> Next <ChevronRight size={16} /> </span> : <span className='flex gap-2 justify-center items-center px-2'> Back </span>}
    </button>
  )
}
