import { useCallback, useState } from "react";



export default function useFetchReviews(id:string,page:number){
    const limit = 10
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [totalPage,setTotalPage] = useState(0)
    const [totalReviews,setTotalReviews] = useState(0)

    const getReviews = useCallback(async()=>{
        try{
            setLoading(true)
            const params = new URLSearchParams({ id,page:String(page),limit:String(limit) })
            const response = await fetch(`/api/review/fetchbyservice/?${params}`)
            if (!response.ok){
                throw new Error(`invalid response`)
            }
            const data = await response.json()
            setTotalPage(data.pagination.totalpage || 0)
            setTotalReviews(data.pagination.total || 0)
            return data.data
        }
        catch (error) {
            console.error(error)
            setError(error instanceof Error?error.message:"something went wrong ")
            return []
        }
        finally{
            setLoading(false)
        }
    },[id, page])

    return{getReviews,loading,error,totalPage,totalReviews,setTotalReviews}
}