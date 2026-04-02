'use client'
import React, { useState } from 'react'
import RatingBase from 'react-rating'
import { FaStar } from "react-icons/fa"
import { FaPaperPlane, FaRegStar } from "react-icons/fa6"
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { ReviewType } from '@/lib/types'
import axios from 'axios'
import { AnimatePresence,motion } from 'framer-motion'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Rating = RatingBase as unknown as React.FC<any>;


interface propType{
    setReviewList: React.Dispatch<React.SetStateAction<ReviewType[]>>
    setTotalReviews:React.Dispatch<React.SetStateAction<number>>
}



export default function ReviewInput(props:propType) {
    const {setReviewList,setTotalReviews} = props
    const [rating, setRating] = useState(0) 
    const [reviewText, setReviewText] = useState('')
    const profile = useSelector((state:RootState)=>state.user.user)
    const service = useSelector((state:RootState)=>state.service.service)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!profile?._id) return toast.warn("log in to provide a review.");
        if (!service?._id) return
        if (!reviewText.trim() || rating === 0) {
            toast.warn("Please provide both a rating and a review.");
            return;
        }

        try {
            const response = await axios.post('/api/review/post',{userId: profile._id, serviceId:service._id, review: reviewText, rating});
            const data = await response.data;
            const userReviewProfile = {
                firstName:profile.firstName,
                lastName:profile.lastName,
                profilePicture:profile.profilePicture
            
            }
            const newReview = {...data.data, userProfile:userReviewProfile}
            setReviewList(prev =>{
                const existingIndex = prev.findIndex((r:ReviewType)=>r.userId === profile._id && r.serviceId === service._id)
                if (existingIndex!=-1){
                    const updated = [...prev]
                    updated.splice(existingIndex,1)
                    return [newReview, ...updated]
                }
                else
                {
                    setTotalReviews(total=>total+1)
                    return [newReview, ...prev]
                }
            })
            setRating(0);
            setReviewText(''); 
        } 
        catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='w-full relative flex flex-col gap-3 items-center'>
            
            
            <div className='flex gap-2 relative items-center overflow-hidden border border-muted h-20 justify-between rounded-lg  w-full'>

                <textarea placeholder='Leave a review' className='text-sm resize-none pl-3 overflow-y-auto focus:outline-0 border-conduit p-2 w-full h-20' value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                />

                <div className='shrink-0 absolute bottom-1 left-3'>
                    <Rating 
                        initialRating={rating} 
                        onChange={(value: number) => setRating(value)} 
                        emptySymbol={<FaRegStar className="text-gray-300" size={20} />}  
                        fullSymbol={<FaStar className="text-yellow-500" size={20} />} 
                    />
                </div>

                    <AnimatePresence>
                    {reviewText.trim() && rating > 0 && (
                        <motion.button  type="submit" initial={{ width: 0, opacity: 0 }} animate={{ width: 60, opacity: 1 }} exit={{ width: 0, opacity: 0 }} transition={{ type: "spring", stiffness: 500, damping: 30,duration: 0.2 }} className='w-15 flex justify-center items-center h-full right-0 bg-muted cursor-pointer text-background text-sm absolute top-0'
                        >
                            <FaPaperPlane className="text-white" size={20}/>
                        </motion.button>
                    )}
                </AnimatePresence>
                
            </div>
        </form>
    )
}
