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

        dispatch(setService(post))

        if (profileDataRedux){
            if (post._id && typeof post._id === 'string' && post._id.length>0){
                const response = await fetch(`/api/service/update_views`,{
                    method:"PATCH",
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({id:post._id,user_id:profileDataRedux._id})
                })
                if (response.ok)
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