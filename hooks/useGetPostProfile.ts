import { clearServiceProfile, setServiceProfile } from "@/state/serviceProfile/serviceProfile"
import { RootState } from "@/store"
import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function useGetPostProfile(){
    const dispatch = useDispatch()
    const serviceRedux = useSelector((state:RootState)=> state.service.service)

    const getProfile = useCallback(
    async()=>{  
        if (!serviceRedux || !serviceRedux.serviceProviderId) {
            console.warn("serviceRedux or serviceProviderId is missing, cannot make the API call.")
            return
            }
            dispatch(clearServiceProfile())
            try {
            const response  = await fetch(`/api/getserviceprofile`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({user_id:serviceRedux?.serviceProviderId})
                })

            if (!response.ok){
                throw new Error("invalid response")
            }

            const serviceUserData  = await response.json()
            dispatch(setServiceProfile(serviceUserData.user))
            }
            catch (error) {
            console.error(error)
            }
    },[serviceRedux,dispatch]
    )

    return {getProfile}
}