/* eslint-disable react-hooks/exhaustive-deps */
import api from "@/lib/api"
import { profileInterface, serviceInterface } from "@/lib/types"
import { useEffect, useState } from "react"


export default function useFetchProfileServices(profile:profileInterface){

    const [serviceList,setServiceList] = useState<serviceInterface[]>([])
    const [page,setPage] = useState(1)
    const limit = 10

  async function fetchServices() {
      try {
        const response = await api.get(`/api/service/getServicesByProfileId?page=${page}&limit=${limit}&id=${profile._id}`)
        if (page===1){
            setServiceList(response.data.data)
        }
        else{
            setServiceList(prev=>[...prev,...response.data.data])
        }
      }
      catch (error) {
          console.log(error)
      }
  }
  
  useEffect(()=>{
      fetchServices()
  },[])


  return {serviceList,setServiceList}
}