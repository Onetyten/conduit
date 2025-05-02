'use client'

import React from 'react'
import { RootState } from '@/store'
import { useDispatch, useSelector } from 'react-redux'
import { serviceFalse } from '@/state/showServiceSlice/showServiceSlice'
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import Image from 'next/image';
import { Avatar,AvatarFallback,AvatarImage } from './ui/avatar';
import { likeHeart,unlikeHeart } from '@/state/likedHeart/likedHeart';
import { setService } from '@/state/viewedService/viewedService'
import { updateService } from '@/state/updatedService/updatedService'
import ServiceModalComponent from './serviceComponents/ServiceModalComponent'





const ServiceSlider = () => {
    const dispatch  = useDispatch()
    const showReduxModal = useSelector((state:RootState)=> state.showService.showService)
    const serviceRedux = useSelector((state:RootState)=> state.service.service)
    const serviceProfileRedux = useSelector((state:RootState)=> state.serviceProfile.serviceProfile)
    const profileDataRedux = useSelector((state:RootState)=> state.user.user)
    const likedHeartRedux  = useSelector((state:RootState)=>state.heartState.heartState)



async function LikePost() {
    if (!serviceRedux || !profileDataRedux) {
        console.error("Missing service or profile data")
        return
      }

    const likeResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/updateLikes`,{
        method:'PATCH',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({id:serviceRedux._id,user_id:profileDataRedux._id})
    })

    if (!likeResponse.ok){
        throw new Error("invalid response")
    }
    else{
        const likeMessage = await likeResponse.json()
        console.log(likeMessage.post)

        dispatch(setService(likeMessage.post))
        dispatch(updateService(likeMessage.post))
        if (likedHeartRedux == true){
            dispatch(unlikeHeart())
        }
        else{
            dispatch(likeHeart())
        }
       
    }



    
    
}







  return (
    <div>
        {showReduxModal&&(
            <div className='h-screen w-full flex-col sm:flex-row  right-0 bottom-0 fixed flex'>
                <div className='md:w-[35%] lg:w-[50%] sm:w-[20%] sm:h-full w-full h-0 sm:bg-slate-500/50 bg-transparent  sm:backdrop-blur-xs' onClick={()=>{dispatch(serviceFalse())}}>

                </div>
                <div className='md:w-[65%] lg:w-[50%]  sm:w-[80%] w-full h-full bg-white flex flex-col gap-2 overflow-scroll hide-scrollbar '>
                    <ServiceModalComponent />
                    <div className='flex gap-1 justify-between p-3 items-center'>
                        <div className='flex items-center gap-2'>
                            <div className='relative w-12 h-12'>
                                
                                <Avatar className='w-full h-full'>
                                    <AvatarImage src={serviceProfileRedux?.profilePicture}/>
                                    <AvatarFallback>PIC</AvatarFallback>
                                </Avatar>
                            
                                <div className={`${serviceRedux?.avalability?'bg-lime-500 ':'bg-red-500'}absolute bottom-0 right-0 w-4 h-4 border-[3px] rounded-full border-white z-10`}>
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
                        <div className='border-gray-200 shadow-xl border-[1px] rounded-full p-2 mx-6 ' onClick={()=>{LikePost()}}>
                            {likedHeartRedux?( < IoMdHeart className='text-pink-500 text-4xl'/>):(<IoMdHeartEmpty  className='text-pink-500 text-4xl'/>)}
                           
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
                        {serviceProfileRedux && serviceRedux?.galleryImages[0]?
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
                            {serviceRedux?.deliverables.map((item, index) => (
                                <span key={index} className='p-1.5 px-4 hover:bg-blue-100 bg-softblue rounded-md'>{item}</span>
                            ))}
                        </div>
                    </div>

                    <div className='flex flex-col items-center justify-center p-3 px-16 text-center'>
                        <p className='font-semibold'>Available On</p>
                        <div className='flex justify-center flex-wrap gap-2 my-4 text-xs'>
                            {serviceRedux?.avalableOn.map((item, index) => (
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
                            
                                <div className={`${serviceRedux?.avalability?'bg-lime-500 ':'bg-red-500'}absolute bottom-0 right-0 w-4 h-4 border-[3px] rounded-full border-white z-10`}>
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


                            <div className='flex gap-2 w-full my-3 font-semibold justify-center text-xs'>
                                Hourly rate : {serviceRedux?.price} USD
                            </div>

                            <div className='flex gap-2 w-full mb-3 font-semibold justify-center text-xs'>
                                Delivery method : {serviceRedux?.deliveryMethod[0]}
                            </div>
                            <div className='bg-conduit text-background p-2 h-9 flex items-center rounded-full text-xs'>
                                Get in Touch
                            </div>

                        </div>

                        <div className='text-xs my-6 flex w-full justify-center gap-6 '>
                          <span>
                            {serviceRedux?.amountEarned} USD   earned
                          </span>

                          <span>
                            {serviceRedux?.views} views
                          </span>

                          <span>
                            {serviceRedux?.likes} likes
                          </span>
                            
                        </div>
                        
                    </div>


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