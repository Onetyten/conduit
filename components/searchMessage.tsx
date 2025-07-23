"use client"
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

export default function SearchMessage() {
    const tagRedux = useSelector((state:RootState)=>state.tagFilter.tagFilter)

  return (
    <div>
        <p className=" text-xs sm:text-sm text-gray-400">
            Search result for {tagRedux.toLowerCase()}
         </p>
    </div>
  )
}
