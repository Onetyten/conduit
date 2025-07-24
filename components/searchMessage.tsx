"use client"
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

export default function SearchMessage() {
    const keywordRedux = useSelector((state:RootState)=>state.keyword.keyword)

  return (
    <div>
        <p className=" text-xs sm:text-sm text-gray-400">
            Search result for {keywordRedux.toLowerCase()}
         </p>
    </div>
  )
}
