"use client"
import ServiceProfileSection from '@/components/service/ServiceProfileSection'
import React, { useEffect, useState } from 'react'
import {RootState} from '@/store'
import {useDispatch, useSelector} from 'react-redux'
import ServiceProfileDetails from '@/components/service/serviceProfileDetails'
import LikeComponent from '@/components/service/likeComponent'
import BackButton from '@/components/BackButton'
import useLikePost from '@/hooks/useLikedPost'
import { serviceFalse } from '@/state/showServiceSlice/showServiceSlice'
import ReviewService from '@/components/service/review/reviewService'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { serviceInterface } from '@/lib/types'

export default function Page() {
    const params = useParams()
    const id = params.id
    const [service,setService] = useState<serviceInterface | null>(null) 
    const {LikePost,postLiked} = useLikePost(service)
    const dispatch  = useDispatch()
    const user = useSelector((state:RootState)=>state.user.user)

    async function fetchService(){
      const response = await axios.get(`/api/service/getServiceById?id=${id}&userId=${user?._id}`)
      if (response.statusText!== "OK") return
      setService(response.data.service)
    }

    useEffect(()=>{
      dispatch(serviceFalse())
      fetchService()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    

    
  return (
    <div className='mt-6 flex items-center gap-6 flex-col'>
        <div className='w-full mb-12'>
            <BackButton/>
        </div>
        <ServiceProfileSection serviceRedux={service} />
        <LikeComponent LikePost={LikePost} postLiked = {postLiked}/>
        <ServiceProfileDetails serviceRedux={service}/>
        {service?._id&&(
          <ReviewService serviceId={service._id} /> 
        )} 
    </div>
    
  )
}