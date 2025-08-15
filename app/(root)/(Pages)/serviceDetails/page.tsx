"use client"
import ServiceProfileSection from '@/components/serviceComponents/ServiceProfileSection'
import React from 'react'
import {RootState} from '@/store'
import {useSelector} from 'react-redux'
import ServiceProfileDetails from '@/components/serviceComponents/serviceProfileDetails'
import ReviewService from '@/components/serviceComponents/reviewService'
import LikeComponent from '@/components/serviceComponents/likeComponent'
import BackButton from '@/components/BackButton'
import useLikePost from '@/hooks/useLikedPost'

export default function Page() {
    
    const service = useSelector((state:RootState)=> state.service.service)
    const serviceProfileRedux = useSelector((state:RootState)=> state.serviceProfile.serviceProfile)
    const {LikePost,postLiked} = useLikePost()

    
  return (
    <div className='mt-6 flex items-center gap-6 flex-col'>
        <div className='w-full mb-20'>
            <BackButton/>
        </div>
        <ServiceProfileSection serviceProfileRedux={serviceProfileRedux} serviceRedux={service} />
        <LikeComponent LikePost={LikePost} postLiked = {postLiked}/>
        <ServiceProfileDetails  serviceProfileRedux ={serviceProfileRedux} serviceRedux={service}/>
        {/* <ReviewService  serviceRedux={service} /> */}
    </div>
    
  )
}
