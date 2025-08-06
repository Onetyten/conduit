import React from 'react'
import Image from 'next/image';
import { Avatar,AvatarFallback,AvatarImage } from '@/components/ui/avatar';
import { profileInterface,serviceInterface} from '@/lib/types';
import Link from 'next/link';

interface serviceInterfaceProp{
    serviceProfileRedux:profileInterface|null
    serviceRedux:serviceInterface|null
}



export default function ServiceProfileDetails({ serviceRedux,serviceProfileRedux }: serviceInterfaceProp) {
  return (
    <div className='flex justify-center w-full flex-col items-center gap-6'>
        <div className='flex items-center justify-center mt-5 w-[90%] max-w-2xl          '>
          {serviceProfileRedux?
          <div className='gap-3 flex flex-wrap justify-center text-xs'>
          {serviceProfileRedux?.skills.map((item, index) => (
                  <span key={index} className='p-1.5 px-4 hover:bg-blue-100 cursor-pointer bg-softblue rounded-md'>{item}</span>
              ))}
          </div>
          :
          <div className='w-sm h-6 bg-gray-100 rounded-md'></div >}
      </div>
      <div className='flex items-center justify-center w-[90%] max-w-2xl          '>
          <p className='text-xl text-center sm:text-2xl font-bold'>
          {serviceRedux?.title} 
          </p>
      </div>
      <div className='flex items-center justify-center relative w-[90%] max-w-2xl           h-96 '>
          {serviceProfileRedux && serviceRedux?.galleryImages[0]?
              <Image src={serviceRedux?.galleryImages[0]} fill alt='profilepic' className=' aspect-video object-cover' />
              :
              <div className='w-[1000px] h-[400px] bg-gray-100'></div >}     
      </div>

      <div className='flex flex-col items-center justify-center w-[90%] max-w-2xl           text-justify'>
          {/* <p className='font-semibold'>Description</p> */}
          <p className=' text-xs sm:text-sm '>
              {serviceRedux?.description} 
          </p>
      </div>

      <div className='flex flex-col gap-6 items-center justify-center w-[90%] max-w-2xl           text-center'>
          <p className='font-semibold'>Deliverables</p>
          <div className='flex gap-2 text-xs'>
              {serviceRedux?.deliverables.map((item, index) => (
                  <span key={index} className='p-1.5 px-4 hover:bg-blue-100 bg-softblue rounded-md'>{item}</span>
              ))}
          </div>
      </div>

      <div className='flex flex-col items-center justify-center gap-6 w-[90%] max-w-2xl           text-center'>
          <p className='font-semibold'>Available On</p>
          <div className='flex justify-center flex-wrap gap-2 text-xs'>
              {serviceRedux?.availableOn.map((item, index) => (
                  <span key={index} className='p-1.5 px-4 hover:bg-blue-100 bg-softblue rounded-md'>{item}</span>
              ))}
          </div>
      </div>
      <div className='w-full bg-gray-200  py-6 gap-6 flex justify-center items-center flex-col'>
        <div className='flex flex-col gap-6 w-[90%] max-w-2xl           justify-center items-center'>
            <div className='relative w-12 h-12'>
                <Link href={`/profile`}>
                    <Avatar className='w-full h-full'>
                        <AvatarImage src={serviceProfileRedux?.profilePicture}/>
                        <AvatarFallback>PIC</AvatarFallback>
                    </Avatar>
                </Link>
                
            
                <div className={`${serviceRedux?.availability?'bg-lime-500 ':'bg-red-500'}absolute bottom-0 right-0 w-4 h-4 border-[3px] rounded-full border-white z-10`}>
                </div>
            </div>
            {serviceProfileRedux?
            <p className='text-xs text-foreground'>{serviceProfileRedux?.firstName} {serviceProfileRedux?.lastName}</p >
            :
            <div className='w-40 h-4 bg-gray-100 rounded-md'></div >}
            <div className='flex gap-2 w-full justify-center text-xs'>
                {serviceRedux?.tags.map((item,index)=>{
                    return(
                        <span key={index}>
                              {item} {index!=serviceRedux.tags.length-1?"|":""}
                        </span>
                    )

                })}
            </div>


            <div className='flex gap-2 w-full font-semibold justify-center text-xs'>
                Hourly rate : {serviceRedux?.price} USD
            </div>

            <div className='flex gap-2 w-full font-semibold justify-center text-xs'>
                Delivery method : {serviceRedux?.deliveryMethod[0]}
            </div>
            <div className='bg-conduit text-background p-2 px-4 h-9 flex items-center rounded-md hover:bg-slate-800 cursor-pointer  sm:rounded-full text-xs'>
                Book Service
            </div>
            <div className='text-xs flex w-full justify-center gap-6 '>
                <span>
                    {serviceRedux?.amountEarned} USD   earned
                </span>

                <span>
                    {serviceRedux?.viewedId.length} views
                </span>

                <span>
                    {serviceRedux?.viewedId.length} likes
                </span>
            
            </div>

        </div>


          
      </div>
    </div>
  )
}
