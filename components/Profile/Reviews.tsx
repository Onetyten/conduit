'use client'
import React, { RefObject, useEffect, useRef} from 'react'
import RatingBase from 'react-rating'
import { SentReviewData } from '@/lib/types/profileReview'
import Image from 'next/image'
import { FaRegStar, FaStar } from "react-icons/fa6";
import NoReview from './NoReview'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Rating = RatingBase as unknown as React.FC<any>;

interface propType{
    reviewsSent:SentReviewData[]
    reviewView:"sent" | "received"
    setReviewView:React.Dispatch<React.SetStateAction<"sent" | "received">>
    triggerRef: (node: HTMLDivElement | null) => void
    loading:boolean
}


export default function Reviews({reviewsSent,reviewView,setReviewView,triggerRef,loading}:propType) {    
    
  return (
    <div className='w-full font-semibold overflow-scroll text-conduit h-full flex justify-start flex-col py-6 items-center gap-6'>

        <div className='w-full flex justify-center items-center'>
            <div className='bg-softblue text-xs flex items-center  gap-2 font-bold uppercase p-1.5 rounded-md '>
                <span onClick={()=>setReviewView("received")} className={` p-3.5 select-none ${reviewView==="received"?"bg-white":""} rounded-md cursor-pointer`}>Received</span>
                <span onClick={()=>setReviewView("sent")} className={`p-3.5 select-none rounded-md ${reviewView==="sent"?"bg-white":""} cursor-pointer`}>Sent</span>
            </div>
        </div>
        
        <div className='text-xs flex-col w-xl relative bg-softblue py-6 gap-6 justify-start flex rounded-md p-6 '>
        {reviewView==="sent"?(
            reviewsSent.length>0?(
                    reviewsSent.map((item ,index)=>{
                        return(
                            <div key={index} className='w-full rounded-md p-6 text-base flex-1 gap-3 flex bg-white shadow-md items-start'>
                                <Image src={item.service.galleryImages[0]} alt='' width={48} height={48} className='aspect-square cursor-pointer rounded-full'/>

                                <div className='flex flex-col gap-1'>
                                    <p className='text-lg hover:underline cursor-pointer' >
                                        {item.service.title} by <span className='text-muted'> {item.service.serviceProvider.firstName} {item.service.serviceProvider.lastName} </span>
                                    </p>
                                    <p className='mb-2'>
                                        {item.review}
                                    </p>
                                    <div className='flex justify-between text-sm'>
                                        <Rating readonly initialRating={item.rating} emptySymbol={<FaRegStar className="text-gray-300" size={20} />} fullSymbol={<FaStar className="text-yellow-500" size={20} />}/>

                                        <p className='text-muted'>
                                            By you
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                
                ):(
                <NoReview loading={loading}/>
            )
        ):reviewView==="received"?(
            reviewsSent.length>0?(
                <div className='text-lg py-6 flex justify-center gap-6 w-full'>
                    Received Reviews
                </div>
                ):(
                <NoReview loading={loading}/>

            )
        ):(
            <NoReview loading={loading}/>
        )}

            <div ref = {triggerRef} className='w-3 absolute bottom-0 left-1/2 h-3'></div>

        </div>

    </div>
  )
}
