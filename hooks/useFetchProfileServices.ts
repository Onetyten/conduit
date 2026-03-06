/* eslint-disable react-hooks/exhaustive-deps */
import { profileInterface, serviceInterface } from "@/lib/types"
import axios from "axios"
import { useEffect, useState } from "react"


export default function useFetchProfileServices(profile:profileInterface){

    const [serviceList,setServiceList] = useState<serviceInterface[]>([])
    const [servicepage,setServicePage] = useState(1)
    const serviceLimit = 10
        
  async function fetchServices() {
      try {
        const response = await axios.get(`/api/service/getServicesByProfileId?page=${servicepage}&limit=${serviceLimit}&id=${profile._id}`)
        setServiceList(prev=>[...prev,...response.data.data])
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