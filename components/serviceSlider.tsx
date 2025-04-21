'use client'

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serviceFalse } from '@/state/showServiceSlice/showServiceSlice'
import { IoCloseSharp } from "react-icons/io5";
import { GoArrowUpRight } from "react-icons/go";
import { CiHeart } from "react-icons/ci";
import Image from 'next/image';
import { Avatar,AvatarFallback,AvatarImage } from './ui/avatar';

const ServiceSlider = () => {
    const dispatch  = useDispatch()
    const showReduxModal = useSelector((state)=> state.showService.showService)
    const serviceRedux = useSelector((state)=> state.service.service)
    const serviceProfileRedux = useSelector((state)=> state.serviceProfile.serviceProfile)
    
  



  return (
    <div>
        {showReduxModal&&(
            <div className='h-screen w-full flex-col sm:flex-row  right-0 bottom-0 fixed flex'>
                <div className='md:w-[35%] lg:w-[50%] sm:w-[20%] sm:h-full w-full h-0 sm:bg-slate-500/50 bg-transparent  sm:backdrop-blur-xs' onClick={()=>{dispatch(serviceFalse())}}>

                </div>
                <div className='md:w-[65%] lg:w-[50%]  sm:w-[80%] w-full h-full bg-white flex flex-col gap-2 overflow-scroll hide-scrollbar '>
                    <div className='w-full flex justify-between items-center p-3'>
                        <IoCloseSharp className='text-2xl' onClick={()=>{dispatch(serviceFalse())}}/>
                        
                        <div className='flex gap-2 items-center text-sm text-conduit'>
                            <p>Open service on new page </p>
                            <GoArrowUpRight className='text-xl'/>
                        </div>

                    </div>
                    <div className='flex gap-1 justify-between p-3 items-center'>
                        <div className='flex items-center gap-2'>
                            <div className='relative w-12 h-12'>
                                
                                <Avatar className='w-full h-full'>
                                    <AvatarImage src={serviceProfileRedux?.profilePicture}/>
                                    <AvatarFallback>PIC</AvatarFallback>
                                </Avatar>
                            
                                <div className={`${serviceRedux.avalability?'bg-lime-500 ':'bg-red-500'}absolute bottom-0 right-0 w-4 h-4 border-[3px] rounded-full border-white z-10`}>
                                </div>
                            </div>
                            <div className='flex  flex-col text-sm gap-2 font-semibold'>
                                <p>{serviceRedux?.title}</p >
                                <div className='flex gap-3'>
                                    {serviceProfileRedux?
                                    <p className='font-light text-xs text-conduit'>{serviceProfileRedux?.firstName} {serviceProfileRedux?.lastName}</p >
                                    :
                                    <div className='w-40 h-4 bg-gray-100 rounded-md'></div >}

                                    {serviceProfileRedux?
                                    <p className='font-light text-xs text-conduit'>{serviceProfileRedux.location.city}</p >
                                    :
                                    <div className='w-40 h-4 bg-gray-100 rounded-md'></div >}
                                </div>
                                
                                
                                

                            </div>
                        </div>

                        <div className='bg-conduit text-background p-2 mx-3 h-9 text-nowrap flex items-center rounded-full text-xs'>
                            Get in Touch
                        </div>

                    </div>
                    <div className='flex items-center'>
                        <div className='h-0.5 flex-1 bg-gray-400'>
                            
                        </div>
                        <div className='border-gray-200 shadow-xl border-[1px] rounded-full p-2 mx-6'>
                            <CiHeart className='text-pink-500 text-4xl'/>
                        </div>
                        <div className='h-0.5 flex-1 bg-gray-400'>
                            
                        </div>
                    </div>

                    

                    <div className='flex items-center justify-center my-5'>
                                {serviceProfileRedux?
                                <div className='gap-3 flex flex-wrap justify-center text-xs'>
                                   {serviceProfileRedux?.skills.map((item, index) => (
                                        <span key={index} className='p-1.5 px-4 hover:bg-blue-100 bg-softblue rounded-md'>{item}</span>
                                    ))}
                                </div>
                                :

                                <div className='w-sm h-6 bg-gray-100 rounded-md'></div >}
                    </div>

                    <div className='flex items-center p-3 justify-center'>
                        <p className='text-2xl font-bold my-4'>
                           {serviceRedux?.title} 
                        </p>
                    </div>

                    <div className='flex items-center justify-center relative w-full '>
                        {serviceProfileRedux?
                            <Image src={serviceRedux?.galleryImages[0]} width={1000} height={200} alt='profilepic' className=' aspect-video object-cover' />
                            :
                            <div className='w-[1000px] h-[400px] bg-gray-100'></div >}     
                    </div>

                    <div className='flex flex-col items-center justify-center p-3 px-8 sm:px-16 text-justify'>
                        <p className='font-semibold'>Description</p>
                        <p className='text-sm my-4'>
                           {serviceRedux?.description} 
                        </p>
                    </div>

                    <div className='flex flex-col items-center justify-center p-3 px-16 text-center'>
                        <p className='font-semibold'>Deliverables</p>
                        <div className='flex gap-2 my-4 text-xs'>
                            {serviceRedux.deliverables.map((item, index) => (
                                <span key={index} className='p-1.5 px-4 hover:bg-blue-100 bg-softblue rounded-md'>{item}</span>
                            ))}
                        </div>
                    </div>

                    <div className='flex flex-col items-center justify-center p-3 px-16 text-center'>
                        <p className='font-semibold'>Available On</p>
                        <div className='flex justify-center flex-wrap gap-2 my-4 text-xs'>
                            {serviceRedux.avalableOn.map((item, index) => (
                                <span key={index} className='p-1.5 px-4 hover:bg-blue-100 bg-softblue rounded-md'>{item}</span>
                            ))}
                        </div>
                    </div>

                    <div className='w-full bg-gray-200 py-6 flex justify-center items-center flex-col'>
                        <div className='flex flex-col gap-3 w-full justify-center items-center'>
                            <div className='relative w-12 h-12'>
                                
                                <Avatar className='w-full h-full'>
                                    <AvatarImage src={serviceProfileRedux?.profilePicture}/>
                                    <AvatarFallback>PIC</AvatarFallback>
                                </Avatar>
                            
                                <div className={`${serviceRedux.avalability?'bg-lime-500 ':'bg-red-500'}absolute bottom-0 right-0 w-4 h-4 border-[3px] rounded-full border-white z-10`}>
                                </div>
                            </div>
                            {serviceProfileRedux?
                            <p className='text-xs text-foreground'>{serviceProfileRedux?.firstName} {serviceProfileRedux?.lastName}</p >
                            :
                            <div className='w-40 h-4 bg-gray-100 rounded-md'></div >}
                            <div className='flex gap-2 w-full justify-center text-xs'>
                                {serviceRedux.tags.map((item,index)=>{
                                    return(
                                        <span key={index}>
                                             {item} {index!=serviceRedux.tags.length-1?"|":""}
                                        </span>
                                    )

                                })}
                            </div>


                            <div className='flex gap-2 w-full my-3 font-semibold justify-center text-xs'>
                                Hourly rate : {serviceRedux.price} USD
                            </div>

                            <div className='flex gap-2 w-full mb-3 font-semibold justify-center text-xs'>
                                Delivery method : {serviceRedux.deliveryMethod[0]}
                            </div>
                            <div className='bg-conduit text-background p-2 h-9 flex items-center rounded-full text-xs'>
                                Get in Touch
                            </div>

                        </div>

                        <div className='text-xs my-6 flex w-full justify-center gap-6 '>
                          <span>
                            {serviceRedux.amountEarned} USD   earned
                          </span>

                          <span>
                            {serviceRedux.views} views
                          </span>

                          <span>
                            {serviceRedux.likes} likes
                          </span>
                            
                        </div>
                        
                    </div>


                    <div className='flex flex-col items-center justify-center p-3 px-16 text-center'>
                        <p className='font-semibold'>Reviews</p>
                        <div className='flex gap-2 my-4 text-xs'>
                            {serviceRedux.reviews.length>0?
                            <div>
                                {serviceRedux.reviews.map((item, index) => (
                                    <span key={index} className='p-1.5 px-4 hover:bg-blue-100 bg-softblue rounded-md'>{item}</span>
                                ))}
                            </div>:
                            <p className='text-gray-400 text-sm my-3'>
                                No reviews available yet
                            </p>
                            }
                        </div>


                        <form action="" className='w-full'>
                            <input type="text" placeholder='leave a review'className='text-sm border-conduit border-[1px] p-3 px-6 mb-9 w-full rounded-full' />
                        </form>
                    </div>




                   
                
                </div>

                
                
            </div>
            )}
    </div>
    
  )
}

export default ServiceSlider