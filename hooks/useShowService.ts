import { serviceInterface } from '@/lib/types'
import { serviceTrue } from '@/state/showServiceSlice/showServiceSlice'
import { updateService } from '@/state/updatedService/updatedService'
import { setService } from '@/state/viewedService/viewedService'
import { RootState } from '@/store'
import { useEffect } from 'react'
import {isMobile} from 'react-device-detect'
import { useDispatch, useSelector } from 'react-redux'



export default function useShowService(post:serviceInterface, refreshPost:(updatedPost: serviceInterface) => void){
    const dispatch = useDispatch()
    const profileDataRedux = useSelector((state:RootState)=> state.user.user)
    const serviceRedux = useSelector((state:RootState)=> state.service.service)
    

    useEffect(()=>{
        if (serviceRedux){
            refreshPost(serviceRedux); 
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[ serviceRedux])

    const showModal =()=>{
        dispatch(serviceTrue())
    }

    const getService = async ()=>{
        if (!isMobile) {
            showModal();
        } 
    
        if (!profileDataRedux) console.log("User profile is not logged in")
        dispatch(setService(post))
        // fetch from the update views api and update the views on the backend
        if (profileDataRedux){
            if (post._id && typeof post._id === 'string' && post._id.length>0){
                const response = await fetch(`/api/service/update_views`,{
                    method:"PATCH",
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({id:post._id,user_id:profileDataRedux._id})
                })
                // log out the error if the response is not okay meaning the views did not get updated on the backend for some reason
                if (!response.ok){
                    const errorBody  = await response.json() 
                    console.log(errorBody)
                }
                
                // set the service redux to the updated post data sent from the backend
                else
                {   
                    const viewMessage = await response.json()
                    dispatch(setService(viewMessage.post))
                    dispatch(updateService(viewMessage.post))
                    refreshPost(viewMessage.post);
                }
            }
        }
    }


    return {isMobile,getService}
}