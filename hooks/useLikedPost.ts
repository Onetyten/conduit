import {useEffect,useState} from 'react'
import { RootState } from '@/store'
import { useDispatch, useSelector } from 'react-redux'
import { setService } from '@/state/viewedService/viewedService'
import { updateService } from '@/state/updatedService/updatedService'
import { toast } from 'react-toastify'
import { serviceInterface } from '@/lib/types'
import apiClient from '@/lib/api'






 function useLikePost(service:serviceInterface|null){
    const dispatch  = useDispatch()
    const userProfile = useSelector((state:RootState)=> state.user.user)
    const [postLiked, setPostLiked] = useState(false)

    useEffect(() => {
    if (userProfile && service?.likedId.includes(userProfile._id)) {
        setPostLiked(true)
    } else {
        setPostLiked(false)
    }
    }, [service, userProfile])


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
            setPostLiked(!postLiked)
            const likeResponse = await apiClient(`/api/service/updateLikes`,{
            method:'PATCH',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({id:service._id,user_id:userProfile._id})
            })
            if (!likeResponse.ok){
                setPostLiked(!postLiked)
                throw new Error("invalid response")
            }
            const likeMessage = await likeResponse.json()
            dispatch(setService(likeMessage.post))
            dispatch(updateService(likeMessage.post))

        } 
        catch (error) {
            console.error(error)
            toast.error("Could not like post")
        }
    }
    return {LikePost,postLiked}
}
export default useLikePost