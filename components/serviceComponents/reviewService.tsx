'use'
import React from 'react'
import {serviceInterface} from '@/lib/types';
import ReviewItem from '../reviewItem';
import ReviewInput from '../reviewInput';

interface serviceInterfaceProp{
    serviceRedux:serviceInterface|null
}


export default function ReviewService({serviceRedux}:serviceInterfaceProp) {
    
  return (
    <div className='flex flex-col items-cent
    er relative justify-center gap-4 mb-9 w-[90%] max-w-2xl text-center'>
        <p className='font-semibold w-full text-center '>
            Reviews {serviceRedux?.reviews?.length && serviceRedux.reviews.length > 0 ? `(${serviceRedux.reviews.length})` : ''}
        </p>
        
        <ReviewInput />

        <div className='flex gap-2 text-xs my-6 w-full text-center'>
            {serviceRedux && serviceRedux.reviews.length>0?
                <div>
                    {serviceRedux.reviews.map((item, index)=>{
                    return(
                        <div key={index} className='flex flex-col gap-4'>
                            <ReviewItem item={item}/>
                        </div>
                        )
                    })}
                </div>
            :
            <p className='text-gray-400 text-center w-full text-xs sm:text-sm my-3'>
                No reviews available yet
            </p>
            }
        </div>

        <div className='w-screen h-screen bg-conduit fixed'>

        </div>



    </div>
  )
}
