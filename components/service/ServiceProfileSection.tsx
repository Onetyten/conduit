import React from 'react'
import { Avatar,AvatarImage } from '@/components/ui/avatar';
import { serviceInterface} from '@/lib/types';
import Link from 'next/link';
import { DEFAULT_PROFILE_IMAGE } from '@/lib/constants';

interface serviceInterfaceProp{
    serviceRedux:serviceInterface|null
}

export default function ServiceProfileSection({serviceRedux}:serviceInterfaceProp) {
  return (
    <div className='flex gap-1 justify-between w-[90%] max-w-2xl items-center'>
        <div className='flex items-center gap-2'>
            <div className='relative w-12 h-12'>
                <Link href={`/profile/${serviceRedux?.serviceProvider?._id}`} >
                    <Avatar className='w-full h-full'>
                        <AvatarImage src={serviceRedux?.serviceProvider?.profilePicture || DEFAULT_PROFILE_IMAGE}/>
                    </Avatar>
                </Link>
               
            
                <div className={`${serviceRedux?.availability?'bg-lime-500 ':'bg-red-500'}absolute bottom-0 right-0 w-4 h-4 border-[3px] rounded-full border-white z-10`}>
                </div>
            </div>
            <div className='flex  flex-col text-xs sm:text-base gap-2 font-semibold'>
                <p>{serviceRedux?.title}</p >
                <div className='flex gap-3'>
                    {serviceRedux?.serviceProvider?
                    <p className='font-light text-xs sm:text-sm text-conduit'>{serviceRedux.serviceProvider.firstName} {serviceRedux?.serviceProvider?.lastName}</p >
                    :
                    <div className='w-40 h-4 bg-gray-100 rounded-md'></div >}

                    {serviceRedux?.serviceProvider?
                    <p className='font-light text-xs sm:text-sm text-conduit'>{serviceRedux?.serviceProvider?.location?.district || serviceRedux?.serviceProvider?.location?.country}</p >
                    :
                    <div className='w-40 h-4 bg-gray-100 rounded-md'></div >}
                </div>
                
                
                

            </div>
        </div>

        <div className='bg-conduit text-background hover:bg-slate-800 cursor-pointer  p-2 mx-3 h-9 text-nowrap flex items-center rounded-md text-xs sm:text-sm'>
            Get in Touch
        </div>
    
    </div>
  )
}
