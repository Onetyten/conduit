
import api from "@/lib/api"
import { profileInterface, serviceInterface } from "@/lib/types"
import { updateUser } from "@/state/userSlice"
import { RootState } from "@/store"
import { useCallback, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"


export default function useFetchProfileServices(profile:profileInterface){
    const user = useSelector((state:RootState)=>state.user.user)
    const dispatch = useDispatch()
    const [serviceList,setServiceList] = useState<serviceInterface[]>([])
    const [page,setPage] = useState(1)
    const limit = 10
    const [hasMore,setHasMore] = useState(true)
    const [loading,setLoading] = useState(true)
    
    const observer = useRef<IntersectionObserver | null>(null)

    const triggerRef = useCallback((node:HTMLDivElement | null)=>{
        if (!node){
            if (observer.current){
                observer.current.disconnect()
                observer.current = null
            }
            return
        }

        if (observer.current){
            observer.current.disconnect()
        }
        
        observer.current = new IntersectionObserver((entries)=>{
            entries.forEach(entry=>{
                if (entry.isIntersecting){
                    
                    if (hasMore===false) return
                    fetchServices()
                }
            })
        },{ root: null, rootMargin: '0px', threshold: 0.1 })


        observer.current.observe(node)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[hasMore])

  async function fetchServices() {
      try {
        setLoading(true)
        const response = await api.get(`/api/service/getServicesByProfileId?page=${page}&limit=${limit}&id=${profile._id}`)
        if (page===1){
            setServiceList(response.data.data)
        }
        else{
            setServiceList(prev=>[...prev,...response.data.data])
        }

        const serviceCount = response.data.total
        if(response.data.data[0]?.serviceProvider?._id===user?._id)
        {
            dispatch(updateUser({serviceCount}))
        }
        setHasMore(response.data.hasMore)
        if (response.data.hasMore===true){
            setPage(page+1)
        }
      }

      finally{
        setLoading(false)
      }
  }


  return {serviceList,setServiceList,loading,triggerRef}
}