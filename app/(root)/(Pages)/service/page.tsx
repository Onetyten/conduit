"use client"
import ServiceProfileSection from '@/components/serviceComponents/ServiceProfileSection'
import React, { useEffect } from 'react'
import {RootState} from '@/store'
import {useDispatch, useSelector} from 'react-redux'
import ServiceProfileDetails from '@/components/serviceComponents/serviceProfileDetails'
import ReviewService from '@/components/serviceComponents/reviewService'
import LikeComponent from '@/components/serviceComponents/likeComponent'
import BackButton from '@/components/BackButton'
import useLikePost from '@/hooks/useLikedPost'
import { serviceFalse } from '@/state/showServiceSlice/showServiceSlice'

export default function Page() {
    const service = useSelector((state:RootState)=> state.service.service)
    const serviceProfileRedux = useSelector((state:RootState)=> state.serviceProfile.serviceProfile)
    const {LikePost,postLiked} = useLikePost()
    const dispatch  = useDispatch()
    useEffect(()=>{
      dispatch(serviceFalse())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    
  return (
    <div className='mt-6 flex items-center gap-6 flex-col'>
        <div className='w-full mb-12'>
            <BackButton/>
        </div>
        <ServiceProfileSection serviceProfileRedux={serviceProfileRedux} serviceRedux={service} />
        <LikeComponent LikePost={LikePost} postLiked = {postLiked}/>
        <ServiceProfileDetails  serviceProfileRedux ={serviceProfileRedux} serviceRedux={service}/>
        {service?._id&&(
          <ReviewService serviceId={service._id} /> 
        )} 
    </div>
    
  )
}
