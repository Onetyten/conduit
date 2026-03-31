import api from '@/lib/api'
import { serviceInterface } from '@/lib/types'
import { serviceTrue } from '@/state/showServiceSlice'
import { setService, updateService } from '@/state/viewedService'
import { RootState } from '@/store'
import { useEffect } from 'react'
import {isMobile} from 'react-device-detect'
import { useDispatch, useSelector } from 'react-redux'


export default function useShowService(post:serviceInterface, refreshPost:(updatedPost: serviceInterface) => void){
    const dispatch = useDispatch()
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
        dispatch(updateService({viewCount:(serviceRedux?.viewCount??0)+1}))

        if (serviceRedux?.serviceProvider){
            if (post._id && typeof post._id === 'string' && post._id.length>0){
                const response = await api.patch(`/api/service/update_views`,{id:post._id})
                if (response.status===200)
                {
                    const viewData = await response.data
                    console.log("Service viewed", viewData)
                    dispatch(updateService({viewCount:viewData.viewCount??serviceRedux?.viewCount}))
                    // dispatch(setService(viewMessage.post))
                    // refreshPost(viewMessage.post);
                }
            }
        }
    }

    return {isMobile,getService}
}