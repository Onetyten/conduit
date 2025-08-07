/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useEffect } from 'react'
import { RootState } from '@/store'
import { useDispatch, useSelector } from 'react-redux'
import { serviceFalse } from '@/state/showServiceSlice/showServiceSlice'
import ServiceModalComponent from './serviceComponents/ServiceModalComponent'
import ServiceProfileSection from './serviceComponents/ServiceProfileSection'
import LikeComponent from './serviceComponents/likeComponent'
import ServiceProfileDetails from './serviceComponents/serviceProfileDetails'
import ReviewService from './serviceComponents/reviewService'
import useLikePost from '@/hooks/useLikedPost'





const ServiceSlider = () => {
    const dispatch  = useDispatch()
    const showReduxModal = useSelector((state:RootState)=> state.showService.showService)
    const service = useSelector((state:RootState)=> state.service.service)
    const serviceProfileRedux = useSelector((state:RootState)=> state.serviceProfile.serviceProfile)
    const {LikePost,postLiked} = useLikePost()

    useEffect(()=>{
        console.log(service)
    },[])

  return (
    <div>
        {showReduxModal&&(
            <div className='h-screen w-full flex-col sm:flex-row  right-0 bottom-0 fixed flex z-20'>
                <div className='md:w-[35%] lg:w-[50%] sm:w-[20%] sm:h-full w-full h-0 sm:bg-slate-500/50 bg-transparent  sm:backdrop-blur-xs' onClick={()=>{dispatch(serviceFalse())}}>

                </div>
                <div className='md:w-[65%] lg:w-[50%] sm:w-[80%] w-full h-full bg-white flex flex-col items-center gap-6 overflow-scroll hide-scrollbar '>
                    <ServiceModalComponent />
                    <ServiceProfileSection serviceProfileRedux ={serviceProfileRedux} serviceRedux={service}/>
                    <LikeComponent LikePost={LikePost} postLiked = {postLiked} />
                    <ServiceProfileDetails  serviceProfileRedux ={serviceProfileRedux} serviceRedux={service}/>
                    <ReviewService  serviceRedux={service} />                
                </div>

                
                
            </div>
            )}
    </div>
    
  )
}

export default ServiceSlider