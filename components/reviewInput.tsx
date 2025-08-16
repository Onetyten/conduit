'use client'
import React, { useState } from 'react'
import RatingBase from 'react-rating'
import { FaStar } from "react-icons/fa"
import { FaRegStar } from "react-icons/fa6"
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { ReviewType } from '@/lib/types'
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
        if (!profile?._id) return toast.warn("User must be logged in to provide a review.");
        if (!service?._id) return
        if (!reviewText.trim() || rating === 0) {
            toast.warn("Please provide both a rating and a review.");
            return;
        }
        try {
            const response = await fetch('/api/review/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userId: profile._id, serviceId:service._id, review: reviewText, rating}),
            });
            const data = await response.json();
            if (!response.ok) {
                toast.error(data.message || "Failed to submit review");
                return;
            }
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



            toast.success(data.message || "Review submitted successfully");
            setRating(0);
            setReviewText(''); 
        } 
        catch (error) {
            toast.error("Error submitting review");
            console.error(error);
        }

    };

    return (
        <form onSubmit={handleSubmit} className='w-full flex flex-col gap-3 items-center'>
            
            <Rating initialRating={rating} onChange={(value: number) => setRating(value)}
                emptySymbol={<FaRegStar className="text-gray-300" size={20} />} 
                fullSymbol={<FaStar className="text-yellow-500" size={20} />} 
            />
            <div className='flex gap-2 w-full'>
                <input type="text" placeholder='Leave a review' className='text-sm border-conduit border-[1px] p-2 px-6 w-full rounded-full' value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                />
                <button type="submit" className='bg-black hover:bg-conduit cursor-pointer text-background px-6 p-2 h-9 rounded-md sm:rounded-full text-xs'>
                    Send
                </button>  
            </div>
        </form>
    )
}
