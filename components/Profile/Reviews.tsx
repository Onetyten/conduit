'use client'
import React from 'react'
import RatingBase from 'react-rating'
import { receivedReviewData, SentReviewData } from '@/lib/types/profileReview'
import Image from 'next/image'
import { FaRegStar, FaStar } from "react-icons/fa6";
import NoReview from './NoReview'
import { DEFAULT_PROFILE_IMAGE } from '@/lib/constants'
import { profileInterface } from '@/lib/types'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Rating = RatingBase as unknown as React.FC<any>;

interface propType{
    reviewsSent:SentReviewData[]
    reviewsReceived:receivedReviewData[]
    reviewView:"sent" | "received"
    setReviewView:React.Dispatch<React.SetStateAction<"sent" | "received">>
    triggerRef: (node: HTMLDivElement | null) => void
    loading:boolean
    profile: profileInterface
}

export default function Reviews({reviewsSent,reviewView,setReviewView,triggerRef,reviewsReceived,loading,profile}:propType) {    
    const user = useSelector((state:RootState)=>state.user.user)
    const isOwnProfile = profile._id===user?._id
    const router = useRouter()
    
  return (
    <div className='w-full font-semibold overflow-y-scroll text-conduit h-full flex justify-start mt-4 flex-col py-6 items-center gap-6'>

        {isOwnProfile && (
            <div className='w-full flex justify-center items-center'>
                <div className='bg-softblue text-xs flex items-center  gap-2 font-bold uppercase p-1.5 rounded-md '>
                    <span onClick={()=>setReviewView("received")} className={` p-3.5 select-none ${reviewView==="received"?"bg-white":""} rounded-md cursor-pointer`}>Received</span>
                    <span onClick={()=>setReviewView("sent")} className={`p-3.5 select-none rounded-md ${reviewView==="sent"?"bg-white":""} cursor-pointer`}>Sent</span>
                </div>
            </div>
        )}
        
        <div className='text-xs flex-col sm:w-xl max-w-full relative bg-softblue gap-6 justify-start flex rounded-md p-3 sm:p-6 '>
        {reviewView==="sent" && isOwnProfile ?(
            reviewsSent.length>0?(
                    reviewsSent.map((item ,index)=>{
                        return(
                            <div onMouseEnter={()=>router.prefetch(`/service/${item.service._id}`)} key={index} className='w-full rounded-md text-base flex-1 gap-3 p-3 sm:p-6 flex bg-white shadow-md items-start'>

                                <Link href={`/service/${item.service._id}`} className='cursor-pointer relative size-10 aspect-square sm:size-18' >
                                    <Image src={item.service?.galleryImages?.[0] || DEFAULT_PROFILE_IMAGE} alt='' fill className='aspect-square cursor-pointer rounded-full'/>
                                </Link>

                                <div className='flex flex-col gap-1'>

                                    <Link href={`/service/${item.service._id}`} className='text-base sm:text-lg hover:underline cursor-pointer' >
                                        {item.service.title} by <span className='text-muted'> {item.service.serviceProvider?.firstName} {item.service.serviceProvider?.lastName} </span>
                                    </Link>
                                    <p className='mb-2 font-medium'>
                                        {item.review}
                                    </p>
                                    <div className='flex flex-col sm:flex-row gap-1 justify-between w-full text-sm'>
                                        <Rating readonly initialRating={item.rating} emptySymbol={<FaRegStar className="text-gray-300" size={20} />} fullSymbol={<FaStar className="text-yellow-500" size={20} />}/>

                                        <p className='text-muted'>
                                            Reviewed by {item.userId === user?._id?"you":`${profile.firstName} ${profile.lastName}`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                ):(
                <NoReview loading={loading}/>
            )
        ):(
            reviewsReceived.length>0?(
                reviewsReceived.map((item ,index)=>{
                        return(
                            <div key={index} className='w-full rounded-md p-3 sm:p-6 text-base flex-1 gap-3 flex bg-white shadow-md items-start'>
                                <Link href={`/profile/${item.reviewer._id}`} className='cursor-pointer relative size-10 aspect-square sm:size-18'>
                                    <Image src={item.reviewer.profilePicture || DEFAULT_PROFILE_IMAGE} alt='' fill className='aspect-square cursor-pointer rounded-full'/>
                                </Link>

                                <div className='flex flex-col gap-1'>
                                    <Link href={`/service/${item.service._id}`} className='text-base sm:text-lg hover:underline cursor-pointer' >
                                        <p className='text-lg hover:underline cursor-pointer' >
                                            {item.service.title} by <span className='text-muted'> {profile.firstName} {profile.lastName} </span>
                                        </p>
                                    </Link>
                                    
                                    <p className='mb-2 font-medium'>
                                        {item.review}
                                    </p>
                                    <div className='flex  flex-col sm:flex-row gap-1 justify-between text-sm'>
                                        <Rating readonly initialRating={item.rating} emptySymbol={<FaRegStar className="text-gray-300" size={20} />} fullSymbol={<FaStar className="text-yellow-500" size={20} />}/>

                                        <p className='text-muted'>
                                            Reviewed by {item.reviewer?.firstName} {item.reviewer?.lastName}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                ):(
                <NoReview loading={loading}/>

            )
        )}

            <div ref = {triggerRef} className='w-3 absolute bottom-0 left-1/2 h-3'></div>

        </div>

    </div>
  )
}
