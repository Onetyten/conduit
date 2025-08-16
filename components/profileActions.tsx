'use client'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { useRouter } from 'next/navigation'
import { clearUser } from '@/state/userInfo/userSlice'





interface propType{
    currentId:string
}



export default function ProfileActions(props:propType) {
    const {currentId} = props  
    const router =useRouter()
    const dispatch = useDispatch()
    const profileData = useSelector((state:RootState)=> state.user.user)
    const profileIsUser = profileData?._id == currentId
    const signOut = ()=>{
        router.push('/')
        dispatch(clearUser())
    }

  return (
    <div>
        {!profileIsUser?(
                <div className='flex gap-2 '>
                <div className='text-xs select-none bg-black text-center cursor-pointer p-3 px-5 my-5 hover:bg-conduit text-white rounded-md'>
                    Contact
                </div>
                <div className='text-xs select-none bg-black text-center cursor-pointer p-3 px-5 my-5 hover:bg-conduit text-white rounded-md'>
                    View Services
                </div>
                </div>
            )
            :
            (<div className='flex gap-2 '>
                <div className='text-sm select-none bg-black text-center p-3 px-5 my-5 cursor-pointer hover:bg-conduit text-white rounded-lg' onClick={signOut}>
                    Sign out
                </div>  
                <div className='text-sm select-none bg-red-500 text-center p-3 px-5 my-5 cursor-pointer hover:bg-red-600 text-white rounded-lg' onClick={signOut}>
                    Delete Account
                </div> 
            </div>
            
        )}
    </div>
  )
}
