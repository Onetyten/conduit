import { profileInterface } from "@/lib/types";
import {useCallback,useState} from "react"




export default function useGetProfile(id:string){

    const [profileData, setProfileData] = useState<profileInterface|null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchProfile = useCallback(async()=>{
        try 
        {
            setLoading(true)
            const response  = await fetch(`/api/getserviceprofile`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({user_id:id})
            })

            if (!response.ok){
                throw new Error("invalid response")
            }
            const data = await response.json()
            setProfileData(data.user)
        } 
        catch (error) {
            console.error(error)
            if (error instanceof Error){
                setError(error.message || "something ")
            }
            else{
                setError("something ")
            }  
        }
        finally{
            setLoading(false)
        }
    },[id])


    return {profileData,fetchProfile,loading,error}

}