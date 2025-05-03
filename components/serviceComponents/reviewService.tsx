import React from 'react'
import {serviceInterface} from '@/lib/types';

interface serviceInterfaceProp{
    serviceRedux:serviceInterface|null
}


export default function ReviewService({serviceRedux}:serviceInterfaceProp) {
  return (
    
    <div className='flex flex-col items-center justify-center p-3 px-16 text-center'>
        <p className='font-semibold'>Reviews</p>
        <div className='flex gap-2 my-4 text-xs'>
            {serviceRedux && serviceRedux.reviews.length>0?
            <div>
                {serviceRedux?.reviews.map((item, index) => (
                    <span key={index} className='p-1.5 px-4 hover:bg-blue-100 bg-softblue rounded-md'>{item}</span>
                ))}
            </div>:
            <p className='text-gray-400 text-sm my-3'>
                No reviews available yet
            </p>
            }
        </div>


        <form action="" className='w-full flex justify-between gap-2 mb-9 items-center'>
            <input type="text" placeholder='Leave a review'className='text-sm border-conduit border-[1px] p-2 px-6 w-full rounded-full' />
            <button className='bg-conduit text-background px-6 p-2 h-9 rounded-full text-sm'>Send</button>
        </form>
    </div>
  )
}
