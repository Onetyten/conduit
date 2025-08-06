/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, {useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Avatar,AvatarFallback,AvatarImage } from '@/components/ui/avatar'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { clearUser } from '@/state/userInfo/userSlice'
import { useDispatch } from 'react-redux'
// import Link from 'next/link'
import BackButton from '@/components/BackButton'
import { RootState } from '@/store'
import {profileInterface}  from '@/lib/types'
type profileDataType = profileInterface | null;

const page = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    // get both the current user and service profiles to be rendered
    const userProfile = useSelector((state:RootState)=>state.user.user)
    const serviceProfile = useSelector((state:RootState)=>state.serviceProfile.serviceProfile)


    // get which profile to render
    const profileIsMe = useSelector((state:RootState)=>state.profileIsMe.profileIsMe)
    const [profileData,setProfileData]  = useState<profileDataType>(null)


    
    useEffect(()=>{
      if (profileIsMe){
        setProfileData(userProfile)
      }
      else
      {
        setProfileData(serviceProfile)
      }
    },[profileIsMe, serviceProfile, userProfile])
    
    const creationDate = profileData?.createdAt ? new Date(profileData.createdAt) : null;
    const formattedCreationDate = creationDate && !isNaN(creationDate.getTime()) ? format(creationDate, "MMM d, yyyy") : "Unknown Date";
    

    const signOut = ()=>{
      router.push('/')
      dispatch(clearUser())
      
    }


    if (profileData == null && profileIsMe)
    return(
        <div className='w-full min-h-screen flex justify-center items-center'>
          <p>
            User Logged out
          </p>
        </div>
  )

  return (
    <div className='w-full min-h-screen flex flex-col sm:flex-row  relative'>
      <BackButton/>
      <div className='bg-softblue sm:pt-0 pt-16 flex-1 p-5 flex justify-center items-center'>
         <Avatar className='sm:w-56 sm:h-56 w-32 h-32 object-cover'>
            <AvatarImage src ={profileData?.profilePicture}/>
            <AvatarFallback>{`${profileData?.lastName.slice(0,1)}${profileData?.firstName.slice(0,1)}`}</AvatarFallback>
          </Avatar>
      </div>
      <div className='flex-1 flex flex-col p-5 justify-center items-center gap-5'>
        <div className='flex flex-col p-10 gap-5 text-xs '>
          <p className='text-3xl font-semibold'>{`${profileData?.lastName} ${profileData?.firstName}`}</p>
          <div className='sm:text-sm text-xs flex gap-3'>
            <p className='p-1.5 px-4 hover:bg-softblue/50 bg-softblue rounded-md'>
              {profileData?.isTalent?'Talent':'Client'}
            </p>
            
          </div>
          {profileData?.skills && profileData?.skills.length > 0 && (
            <div className='sm:text-sm text-xs gap-2 flex flex-col'>
              <p className='font-semibold'>Skills </p>
              <div className='flex flex-wrap gap-3'> 
                {profileData?.skills.map((item, index:number) => (
                  <span key={index} className='p-1.5 px-4 hover:bg-softblue/50 capitalize bg-softblue rounded-md'>{item}</span>
                ))}
              </div>
             
            </div>
          )}



          <p className='text-sm py-3'>{`${profileData?.bio?profileData?.bio:'No bio'}`}</p>


          <p className=''>{`${profileData?.email}`}</p>
          <p>{`${profileData?.location?.district?profileData?.location?.district:''} ${profileData?.location.state?profileData.location.state:''}, ${profileData?.location.country?profileData.location.country:''}`}</p>
          
          <p className=''>{`${profileData?.isTalent?'Talent':'Client'} since ${formattedCreationDate}`}</p>

          {!profileIsMe?(
            <div className='flex gap-2 '>
              <div className='text-xs bg-black text-center p-3 px-5 my-5 hover:bg-conduit text-white rounded-md'>
                Contact
              </div>
               <div className='text-xs bg-black text-center p-3 px-5 my-5 hover:bg-conduit text-white rounded-md'>
                View Services
              </div>
            </div>
          )
          :
          (<div>
              <div className='text-sm bg-red-500 text-center p-3 my-5 hover:bg-red-600 text-white rounded-lg' onClick={signOut}>
                Sign out
              </div> 
              <div className='text-sm bg-red-500 text-center p-3 my-5 hover:bg-red-600 text-white rounded-lg' onClick={signOut}>
                Delete Account
              </div> 
          </div>
           
          
        
        
        
        )}

          
        </div>
      </div>


    </div>
  )
}

export default page