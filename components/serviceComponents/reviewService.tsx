'use client'
import React, { useEffect, useRef, useState } from 'react'
import ReviewItem from '../reviewItem';
import ReviewInput from '../reviewInput';
import useFetchReviews from '@/hooks/useFetchReviews';
import { useInView } from 'framer-motion';
import { ReviewType } from '@/lib/types';

interface propType{
    serviceId:string
}

export default function ReviewService(props:propType) {
    const {serviceId} = props
    const [reviewList,setReviewList] = useState<ReviewType[]>([])
    const [page,setPage] = useState(1)
    const {getReviews,totalPage,totalReviews,setTotalReviews} = useFetchReviews(serviceId,page)
    const reviewTrigger = useRef(null)
    const triggerIsInView = useInView(reviewTrigger)
    const [hasMore,setHasMore] = useState(true)


    useEffect(()=>{
        (async()=>{
            if (triggerIsInView && hasMore ){
                const data = await getReviews()
                if(data.length>0){
                    setReviewList(prev => [...prev, ...data]);
                    if (page + 1 > totalPage) {
                        setHasMore(false);
                    }
                    else{
                      setPage(prev => prev+1)  
                    } 
                }
                else{
                    setHasMore(false)
                }
            }

        })()
    },[serviceId, triggerIsInView, totalPage, hasMore, getReviews, page])

  return (
    <div className='flex flex-col items-cent
    er relative justify-center gap-6 mb-9 w-[90%] max-w-2xl text-center'>
        
        <p className='font-semibold w-full text-center '>
            Reviews ({totalReviews})
        </p>
        
        <ReviewInput setReviewList={setReviewList} setTotalReviews={setTotalReviews} />

        <div className='flex gap-2 text-xs w-full text-center'>
            {reviewList && reviewList.length>0?
                <div>
                    {reviewList.map((item, index)=>{
                    return(
                        <div key={index} className='flex flex-col gap-4'>
                            <ReviewItem item={item} />
                        </div>
                        )
                    })}
                </div>
            :
            <div className='w-full'>
                {hasMore?
                <p className='text-gray-400 text-center w-full text-xs sm:text-sm'>
                    Loading reviews
                </p>:        
                <p className='text-gray-400 text-center w-full text-xs sm:text-sm'>
                    No reviews available for this service
                </p>}
            </div>

            }
        </div>

        <div ref={reviewTrigger} className='flex w-full h-2 mb-3'>

        </div>



    </div>
  )
}
