'use client'
import { serviceInterface } from '@/lib/types'
import React from 'react'
import PostItem from '../postItem'

interface propType{
    serviceList:serviceInterface[]
    setServiceList:React.Dispatch<React.SetStateAction<serviceInterface[]>>
}

export default function Services({serviceList,setServiceList}:propType) {
    console.log(serviceList[0])
    
  return (
    <div className='w-full font-semibold text-muted h-full flex justify-center items-center min-h-[50dvh]'>
        {serviceList.length>0?(
            <div className='text-xs py-6 gap-6 justify-start grid grid-cols-1 md:grid-cols-2 w-full'>
                {serviceList.map((item ,index)=>{
                    return(
                        <PostItem key={index} index={index} post={item} refreshPost = {(updatedService)=>{
                            setServiceList((prevServices) =>
                            prevServices.map((service) => (service._id === updatedService._id ? updatedService : service))
                            );
                        }} />
                    )
                })}
            </div>
            ):(
            <div className='text-3xl font-semibold text-muted'>
                No Services Available
            </div>
            )}

    </div>
  )
}
