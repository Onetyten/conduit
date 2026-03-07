/* eslint-disable react-hooks/exhaustive-deps */
import { profileInterface } from "@/lib/types"
import { SentReviewData } from "@/lib/types/profileReview"
import axios from "axios"
import { useCallback, useRef, useState } from "react"


export default function useFetchProfileReviews(profile:profileInterface,reviewView: "sent" | "received"){
    const [reviewsSent,setReviewsSent] = useState<SentReviewData[]>([])
    const [sentPage,setSentPage] = useState(1)
    const [hasMoreSentReviews,setHasMoreSent] = useState(true)
    const [loading,setLoading] = useState(true)

    const limit = 10
    const observer = useRef<IntersectionObserver|null>(null)

    const triggerRef = useCallback((node:HTMLDivElement|null)=>{
        if (!node){
            if (observer.current){
                observer.current.disconnect()
                observer.current = null
            }
            return
        }

        if (observer.current) {
            observer.current.disconnect()
        }

        observer.current = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (reviewView=="sent"){
                        if (!hasMoreSentReviews) return
                        fetchSentReviews()
                        console.log("fetching sent reviews")
                        return
                    }
                    else if (reviewView=="received"){
                        console.log("Fetch service reviews ")
                        return
                    }
                    setLoading(false)
                }
            })
        }, { root: null, rootMargin: '0px', threshold: 0.1 })
        
        observer.current.observe(node)
        
    },[hasMoreSentReviews, reviewView])


    async function fetchSentReviews() {
        try {
            setLoading(true)
            const response = await axios.get(`/api/review/profile?page=${sentPage}&limit=${limit}&id=${profile._id}`)
            const newReviews = response.data.data
            const page = response.data.currentPage
            console.log(response.data)
            if (sentPage===1){
                setReviewsSent(newReviews)
            }
            else{
                setReviewsSent(prev=>[...prev,...newReviews])
            }
            setHasMoreSent(response.data.hasMore)
            if (response.data.hasMore===true){
                setSentPage(page+1)
            }
        }
        catch (error) {
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    }



  return {reviewsSent,triggerRef,loading}
}