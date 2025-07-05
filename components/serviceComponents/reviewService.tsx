import React from 'react'
import {serviceInterface} from '@/lib/types';

interface serviceInterfaceProp{
    serviceRedux:serviceInterface|null
}


export default function ReviewService({serviceRedux}:serviceInterfaceProp) {
  return (
    
    <div className='flex flex-col items-center justify-center gap-4 p-3 px-4 sm:px-16  mb-9 text-center'>
        <p className='font-semibold'>Reviews</p>


        <form action="" className='w-full flex justify-between gap-2 items-center'>
            <input type="text" placeholder='Leave a review'className='text-sm border-conduit border-[1px] p-2 px-6 w-full rounded-full' />
            <button className='bg-conduit hover:bg-slate-900 text-background px-6 p-2 h-9 rounded-md sm:rounded-full  text-xs sm:text-sm '>Send</button>
        </form>


        <div className='flex gap-2 text-xs'>
            {serviceRedux && serviceRedux.reviews.length>0?
            <div>
                {serviceRedux?.reviews.map((item, index) => (
                    <span key={index} className='p-1.5 px-4 hover:bg-blue-100 bg-softblue rounded-md'>{item}</span>
                ))}
            </div>:
            <p className='text-gray-400 text-xs sm:text-sm my-3'>
                No reviews available yet
            </p>
            }
        </div>



    </div>
  )
}
