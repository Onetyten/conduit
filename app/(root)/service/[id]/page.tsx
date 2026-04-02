"use client"
import ServiceProfileSection from '@/components/service/ServiceProfileSection'
import React, { useEffect, useState } from 'react'
import {RootState} from '@/store'
import {useDispatch, useSelector} from 'react-redux'
import ServiceProfileDetails from '@/components/service/serviceProfileDetails'
import LikeComponent from '@/components/service/likeComponent'
import BackButton from '@/components/BackButton'
import { serviceFalse } from '@/state/showServiceSlice'
import ReviewService from '@/components/service/review/reviewService'
import { useParams } from 'next/navigation'
import { serviceInterface } from '@/lib/types'
import { toast } from 'react-toastify'
import api from '@/lib/api'

export default function Page() {
    const params = useParams()
    const id = params.id
    const [service,setService] = useState<serviceInterface | null>(null) 
    const dispatch  = useDispatch()
    const user = useSelector((state:RootState)=>state.user.user)
    const [isLiking,setIsLiking] = useState(false)

    async function fetchService(){
      const response = await api.get(`/api/service/getServiceById?id=${id}`)
      if (response.statusText!== "OK") return
      setService(response.data.service)
    }

    useEffect(()=>{
      dispatch(serviceFalse())
      fetchService()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    const LikePost = async () => {
        if (!service) return

        if (!user) {
            toast.warn("Log in to like services")
            return
        }

        if (isLiking) return
        const originalService = { ...service }

        const newIsLiked = !service.isLiked
        const newLikeCount = service.isLiked ? service.likeCount - 1 : service.likeCount + 1

        try {
            setService({...service, isLiked: newIsLiked, likeCount: newLikeCount
            })
            const likeResponse = await api.patch(`/api/service/updateLikes`, { id: service._id  })
            console.log(likeResponse.data)
        
            if (likeResponse.data.likeCount !== newLikeCount || likeResponse.data.isLiked !== newIsLiked) {
                setService({...service,likeCount: likeResponse.data.likeCount, isLiked:likeResponse.data.postLiked})
            }

        }
        catch {
            setService(originalService)
        }
        finally {
            setIsLiking(false)
        }
    }

    
  return (
    <div className='mt-6 flex items-center gap-6 flex-col'>
        <div className='w-full mb-12'>
            <BackButton/>
        </div>
        <ServiceProfileSection serviceRedux={service} />
        <LikeComponent LikePost={LikePost} postLiked = {service?.isLiked??false}/>
        <ServiceProfileDetails serviceRedux={service}/>
        {service?._id&&(
          <ReviewService serviceId={service._id} /> 
        )} 
    </div>
    
  )
}