'use client'
import React from 'react'
import { SentReviewData } from '@/lib/types/profileReview'

interface propType{
    reviewsSent:SentReviewData[]
}

export default function Reviews({reviewsSent}:propType) {
    
  return (
    <div className='w-full font-semibold text-muted h-full flex justify-center items-center min-h-[50dvh]'>
        {reviewsSent.length>0?(
            <div className='text-xs py-6 gap-6 justify-start grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 w-full'>
                {reviewsSent.map((item ,index)=>{
                    return(
                       <p key={index}>
                            {item.review}
                       </p>
                    )
                })}
            </div>
            ):(
            <div className='text-3xl font-semibold text-muted'>
                No Reviews Available
            </div>
            )}

    </div>
  )
}
