import React from 'react'
import {serviceInterface} from '@/lib/types';

interface serviceInterfaceProp{
    serviceRedux:serviceInterface|null
}


export default function ReviewService({serviceRedux}:serviceInterfaceProp) {
  return (
    
    <div className='flex flex-col items-center justify-center gap-4 mb-9 w-[90%] max-w-2xl text-center'>
        <p className='font-semibold w-full text-center '>Reviews</p>


        <form action="" className='w-full flex justify-between gap-2 items-center'>
            <input type="text" placeholder='Leave a review'className='text-sm border-conduit border-[1px] p-2 px-6 w-full rounded-full' />
            <button className='bg-conduit hover:bg-slate-800 cursor-pointer text-background px-6 p-2 h-9 rounded-md sm:rounded-full  text-xs '>Send</button>
        </form>


        <div className='flex gap-2 text-xs my-6 w-full text-center'>
            {serviceRedux && serviceRedux.reviews.length>0?
            <div className='flex items-start p-1.5 px-4 gap-4'>
                <div className='w-8 h-8 rounded-full bg-conduit'>

                </div>
                <div className='flex flex-col items-start gap-3'>
                    {serviceRedux?.reviews.map((item, index) => (
                    <span key={index} className=''>{item.review}</span>
                    ))}
                    <div>
                        Rating
                    </div>
                </div>
            </div>:
            <p className='text-gray-400 text-center w-full text-xs sm:text-sm my-3'>
                No reviews available yet
            </p>
            }
        </div>



    </div>
  )
}
