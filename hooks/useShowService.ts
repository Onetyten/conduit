import api from '@/lib/api'
import { serviceInterface } from '@/lib/types'
import { updatePostList } from '@/state/postListSlice'
import { serviceTrue } from '@/state/showServiceSlice'
import { setService, updateService } from '@/state/viewedService'
import { RootState } from '@/store'
import {isMobile} from 'react-device-detect'
import { useDispatch, useSelector } from 'react-redux'

export default function useShowService(post:serviceInterface){
    const dispatch = useDispatch()
    const serviceRedux = useSelector((state:RootState)=> state.service.service)
    const user = useSelector((state:RootState)=>state.user.user)
    const token = useSelector((state:RootState)=>state.user.token)

    const showModal =()=>{
        dispatch(serviceTrue())
    }

    const getService = async ()=>{
        if (!isMobile) {
            showModal();
        } 
        dispatch(setService(post))

        if (!post.isViewed){
            dispatch(updateService({viewCount:(serviceRedux?.viewCount??0)+1}))
 
            if (serviceRedux?.serviceProvider && user?._id && token){
                if (post._id && typeof post._id === 'string' && post._id.length>0){
                    const response = await api.patch(`/api/service/update_views`,{id:post._id})
                    if (response.status===200)
                    {
                        const viewData = await response.data
                        if (!viewData.viewCount || !viewData.serviceId) return
                        dispatch(updateService({viewCount:viewData.viewCount,isViewed:true}))
                        dispatch(updatePostList({id:viewData.serviceId,update:{viewCount:viewData.viewCount,isViewed:true}}))
                    }
                }
            }
        }
        
    }

    return {isMobile,getService}
}