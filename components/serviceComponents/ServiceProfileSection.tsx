import React from 'react'
import { Avatar,AvatarFallback,AvatarImage } from '@/components/ui/avatar';
import { profileInterface,serviceInterface} from '@/lib/types';
import Link from 'next/link';

interface serviceInterfaceProp{
    serviceProfileRedux:profileInterface|null
    serviceRedux:serviceInterface|null
}

export default function ServiceProfileSection({serviceProfileRedux,serviceRedux}:serviceInterfaceProp) {
  return (
    <div className='flex gap-1 justify-between p-3 items-center'>
        <div className='flex items-center gap-2'>
            <div className='relative w-12 h-12'>
                <Link href={`/profile`}>
                    <Avatar className='w-full h-full'>
                        <AvatarImage src={serviceProfileRedux?.profilePicture}/>
                        <AvatarFallback>PIC</AvatarFallback>
                    </Avatar>
                </Link>
               
            
                <div className={`${serviceRedux?.avalability?'bg-lime-500 ':'bg-red-500'}absolute bottom-0 right-0 w-4 h-4 border-[3px] rounded-full border-white z-10`}>
                </div>
            </div>
            <div className='flex  flex-col text-xs sm:text-sm gap-2 font-semibold'>
                <p>{serviceRedux?.title}</p >
                <div className='flex gap-3'>
                    {serviceProfileRedux?
                    <p className='font-light text-xs text-conduit'>{serviceProfileRedux?.firstName} {serviceProfileRedux?.lastName}</p >
                    :
                    <div className='w-40 h-4 bg-gray-100 rounded-md'></div >}

                    {serviceProfileRedux?
                    <p className='font-light text-xs text-conduit'>{serviceProfileRedux?.location?.city || serviceProfileRedux?.location?.country}</p >
                    :
                    <div className='w-40 h-4 bg-gray-100 rounded-md'></div >}
                </div>
                
                
                

            </div>
        </div>

        <div className='bg-conduit text-background p-2 mx-3 h-9 text-nowrap flex items-center rounded-md sm:rounded-full text-xs'>
            Get in Touch
        </div>
    
    </div>
  )
}
