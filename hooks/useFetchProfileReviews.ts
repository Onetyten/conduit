/* eslint-disable react-hooks/exhaustive-deps */
import { profileInterface, serviceInterface } from "@/lib/types"
import { SentReviewData } from "@/lib/types/profileReview"
import axios from "axios"
import { useEffect, useState } from "react"


export default function useFetchProfileReviews(profile:profileInterface,loading: boolean,setLoading: React.Dispatch<React.SetStateAction<boolean>>,reviewView: "sent" | "received"){

    const [reviewsSent,setReviewsSent] = useState<SentReviewData[]>([])
    const [page,setPage] = useState(1)
    const limit = 10    
    

  async function fetchReviews() {
      try {
        const response = await axios.get(`/api/review/profile?page=${page}&limit=${limit}&id=${profile._id}`)
        console.log(response)
        setReviewsSent(prev=>[...prev,...response.data.data])
      }
      catch (error) {
          console.log(error)
      }
  }
  
  useEffect(()=>{
      fetchReviews()
  },[])


  return {reviewsSent}
}