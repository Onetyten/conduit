"use client"
import ServiceProfileSection from '@/components/serviceComponents/ServiceProfileSection'
import React from 'react'
import { RootState } from '@/store'
import { useDispatch, useSelector } from 'react-redux'
import ServiceProfileDetails from '@/components/serviceComponents/serviceProfileDetails'
import ReviewService from '@/components/serviceComponents/reviewService'
import { likeHeart,unlikeHeart } from '@/state/likedHeart/likedHeart';
import { setService } from '@/state/viewedService/viewedService'
import { updateService } from '@/state/updatedService/updatedService'
import LikeComponent from '@/components/serviceComponents/likeComponent'
import BackButton from '@/components/BackButton'

export default function Page() {
    const dispatch  = useDispatch()
    const serviceRedux = useSelector((state:RootState)=> state.service.service)
    const serviceProfileRedux = useSelector((state:RootState)=> state.serviceProfile.serviceProfile)
    const profileDataRedux = useSelector((state:RootState)=> state.user.user)
    const likedHeartRedux  = useSelector((state:RootState)=>state.heartState.heartState)


    async function LikePost() {
        if (!serviceRedux || !profileDataRedux) {
            console.error("Missing service or profile data")
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
    <div className='mt-6 flex items-center gap-6 flex-col'>
        <div className='w-full mb-20'>
            <BackButton/>
        </div>

        <ServiceProfileSection serviceProfileRedux={serviceProfileRedux} serviceRedux={serviceRedux} />

        <LikeComponent LikePost={LikePost}/>
        <ServiceProfileDetails  serviceProfileRedux ={serviceProfileRedux} serviceRedux={serviceRedux}/>
        <ReviewService  serviceRedux={serviceRedux} />
    </div>
    
  )
}
