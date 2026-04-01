'use client'

import React from 'react'
import { RootState } from '@/store'
import { useDispatch, useSelector } from 'react-redux'
import { serviceFalse } from '@/state/showServiceSlice'
import ServiceModalComponent from './ServiceModalComponent'
import ServiceProfileSection from './ServiceProfileSection'
import LikeComponent from './likeComponent'
import ServiceProfileDetails from './serviceProfileDetails'
import ReviewService from './review/reviewService'
import { toast } from 'react-toastify'
import { updateService } from '@/state/viewedService'
import api from '@/lib/api'
import { updatePostList } from '@/state/postListSlice'




const ServiceSlider = () => {
  const dispatch  = useDispatch()
  const showReduxModal = useSelector((state:RootState)=> state.showService.showService)
  const service = useSelector((state:RootState)=> state.service.service)
  const userProfile = useSelector((state:RootState)=> state.user.user)
  

  async function LikePost() {
    if (!service) {
        console.error("Missing service")
        return
    }
  
    if (!userProfile) {
        toast.warn("Log in to like services")
        return
    }

    try {
        const newIsLiked = !service.isLiked;
        const newLikeCount = service.isLiked ? service.likeCount - 1 : service.likeCount + 1;

        dispatch(updateService({isLiked:newIsLiked,likeCount:newLikeCount}))

        dispatch(updatePostList({id:service._id,update:{isLiked:newIsLiked,likeCount:newLikeCount}}))

        const likeResponse = await api.patch(`/api/service/updateLikes`,{id:service._id})

        if (likeResponse.data.likeCount !== newLikeCount) {
          dispatch(updateService({likeCount: likeResponse.data.likeCount, isLiked: likeResponse.data.isLiked
          }));
        }
    }

    catch {
      dispatch(updateService({ isLiked: service.isLiked, likeCount: service.likeCount }));
    
      dispatch(updatePostList({ id: service._id, update: { isLiked: service.isLiked,likeCount: service.likeCount}

      }));
    }}


  return (
    <div>
        {showReduxModal&&(
            <div className='h-screen w-full flex-col sm:flex-row  right-0 bottom-0 fixed flex z-20'>
                <div className='md:w-[35%] lg:w-[50%] sm:w-[20%] sm:h-full w-full h-0 sm:bg-slate-500/50 bg-transparent  sm:backdrop-blur-xs' onClick={()=>{dispatch(serviceFalse())}}>

                </div>
                <div className='md:w-[65%] lg:w-[50%] sm:w-[80%] w-full h-full bg-white flex flex-col items-center gap-6 overflow-scroll hide-scrollbar '>
                    <ServiceModalComponent service={service} />
                    <ServiceProfileSection serviceRedux={service}/>
                    <LikeComponent LikePost={LikePost} postLiked = {service?.isLiked??false} />
                    <ServiceProfileDetails serviceRedux={service}/>
                    {service?._id&&(
                      <ReviewService serviceId={service._id} /> 
                    )}         
                </div>
            </div>
            )}
    </div>
    
  )
}

export default ServiceSlider