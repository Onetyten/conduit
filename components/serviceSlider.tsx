'use client'

import React from 'react'
import { RootState } from '@/store'
import { useDispatch, useSelector } from 'react-redux'
import { serviceFalse } from '@/state/showServiceSlice/showServiceSlice'
import { likeHeart,unlikeHeart } from '@/state/likedHeart/likedHeart';
import { setService } from '@/state/viewedService/viewedService'
import { updateService } from '@/state/updatedService/updatedService'
import ServiceModalComponent from './serviceComponents/ServiceModalComponent'
import ServiceProfileSection from './serviceComponents/ServiceProfileSection'
import LikeComponent from './serviceComponents/likeComponent'
import ServiceProfileDetails from './serviceComponents/serviceProfileDetails'
import ReviewService from './serviceComponents/reviewService'





const ServiceSlider = () => {
    const dispatch  = useDispatch()
    const showReduxModal = useSelector((state:RootState)=> state.showService.showService)
    const serviceRedux = useSelector((state:RootState)=> state.service.service)
    const serviceProfileRedux = useSelector((state:RootState)=> state.serviceProfile.serviceProfile)
    const profileDataRedux = useSelector((state:RootState)=> state.user.user)
    const likedHeartRedux  = useSelector((state:RootState)=>state.heartState.heartState)



async function LikePost() {
    if (!serviceRedux) {
        console.error("Missing service")
        return
    }

    if (!profileDataRedux) {
        console.log("User is not logged in")
        alert("Log in to like services")
        return
    }

    const likeResponse = await fetch(`/api/updateLikes`,{
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
            <div className='h-screen w-full flex-col sm:flex-row  right-0 bottom-0 fixed flex z-20'>
                <div className='md:w-[35%] lg:w-[50%] sm:w-[20%] sm:h-full w-full h-0 sm:bg-slate-500/50 bg-transparent  sm:backdrop-blur-xs' onClick={()=>{dispatch(serviceFalse())}}>

                </div>
                <div className='md:w-[65%] lg:w-[50%]  sm:w-[80%] w-full h-full bg-white flex flex-col gap-2 overflow-scroll hide-scrollbar '>
                    <ServiceModalComponent />
                    <ServiceProfileSection serviceProfileRedux ={serviceProfileRedux} serviceRedux={serviceRedux}/>
                    <LikeComponent LikePost={LikePost}/>
                    <ServiceProfileDetails  serviceProfileRedux ={serviceProfileRedux} serviceRedux={serviceRedux}/>
                    <ReviewService  serviceRedux={serviceRedux} />                
                </div>

                
                
            </div>
            )}
    </div>
    
  )
}

export default ServiceSlider