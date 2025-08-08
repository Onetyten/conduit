'use client'

import { ReviewType } from '@/lib/types'
import React, { useEffect, useRef } from 'react'
import RatingBase from 'react-rating';
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { useInView } from 'framer-motion';
import useGetProfile from '@/hooks/useGetProfile';
import Image from 'next/image';
import Link from 'next/link';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Rating = RatingBase as unknown as React.FC<any>;

interface propTypes {
    item:ReviewType
}



export default function ReviewItem(props:propTypes) {
    const {item} = props 
    const profileref = useRef(null)
    const {profileData,fetchProfile} = useGetProfile(item.userId.toString())
    const isInView = useInView(profileref,{once:true})


    useEffect(() => {
        if (isInView) {
            fetchProfile();
        }
    }, [fetchProfile, isInView]);

    return (
    <div className='flex items-start p-1.5 px-4 gap-2'>     
        <div className=' rounded-full w-8 h-8 relative bg-conduit/50 overflow-hidden' ref = {profileref}>
            {profileData?._id && profileData.profilePicture && (
                <Link href={`/profile/${profileData?._id}`}>
                    <Image src={profileData?.profilePicture ?? "/icons/profile.png"} fill alt={profileData?.firstName || "AO"} className='capitalize object-cover'/>  
                </Link>
            )}
            
                
        </div>

        <div className='flex flex-col items-start gap-2'>
            <span className='text-left'>{item.review}</span>
            <div>
                <Rating
                initialRating={item.rating}
                readonly emptySymbol={<FaRegStar  className="text-gray-300" size={15}/>} 
                fullSymbol={<FaStar className="text-yellow-500 fill-yellow-500" size={15} />} 
                />
            </div>
        </div>
    </div>
  )
}
