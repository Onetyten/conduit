/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useEffect, useState } from 'react'
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

type MappedDataType = profileInterface | null;



const page = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const userReduxData = useSelector((state:RootState)=>state.user.user)
    const serviceProfile = useSelector((state:RootState)=>state.serviceProfile.serviceProfile)
    const showServiceProfile = useSelector((state:RootState)=>state.showService.showService)

    const creationDate = userReduxData?.createdAt ? new Date(userReduxData.createdAt) : null;
    const formattedCreationDate = creationDate && !isNaN(creationDate.getTime()) ? format(creationDate, "MMM d, yyyy") : "Unknown Date";
    console.log(userReduxData)

    const signOut = ()=>{
      router.push('/')
      dispatch(clearUser())
      
    }
    const [mappedData,setMappedData]  = useState<MappedDataType>(null)
    useEffect(()=>{
      if (showServiceProfile==true){
        setMappedData(serviceProfile)
      }
      else{
        setMappedData(userReduxData)
      }
    },[showServiceProfile,serviceProfile,userReduxData])




    if (mappedData == null)
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
            <AvatarImage src ={mappedData?.profilePicture}/>
            <AvatarFallback>{`${mappedData?.lastName.slice(0,1)}${mappedData?.firstName.slice(0,1)}`}</AvatarFallback>
          </Avatar>
      </div>
      <div className='flex-1 flex flex-col p-5 justify-center items-center gap-5'>
        <div className='flex flex-col p-10 gap-5 text-xs '>
          <p className='text-3xl font-semibold'>{`${mappedData?.lastName} ${mappedData?.firstName}`}</p>
          <div className='sm:text-sm text-xs flex gap-3'>
            <p className='p-1.5 px-4 hover:bg-blue-100 bg-softblue rounded-md'>
              {mappedData?.isTalent?'Talent':'Client'}
            </p>
            {mappedData?.serviceCategories.length>0&&(
              <p className='p-1.5 px-4 hover:bg-blue-100 bg-softblue rounded-md'>
              {mappedData?.serviceCategories.length>0 ?mappedData?.serviceCategories:'Client'}
            </p> 
            )}
            
          </div>
          {mappedData?.skills && mappedData?.skills.length > 0 && (
            <div className='sm:text-sm text-xs gap-2 flex flex-col'>
              <p className='font-semibold'>Skills </p>
              <div className='flex flex-wrap gap-3'> 
                {mappedData?.skills.map((item, index:number) => (
                  <span key={index} className='p-1.5 px-4 hover:bg-blue-100 bg-softblue rounded-md'>{item}</span>
                ))}
              </div>
             
            </div>
          )}



          <p className='text-sm py-3'>{`${mappedData?.bio?mappedData?.bio:'No bio'}`}</p>

          {mappedData.companyName&&(
            <div className='flex flex-col gap-3 '>
              <p className='font-semibold text-sm'>Company Details</p>
              <div className='flex flex-col p-2 gap-3 w-full border-softblue sm:ml-3 border-2 sm:text-sm text-xs rounded-lg'>
                <p className='font-semibold text-base'>{`${mappedData?.companyName}`}</p>
                <p className=''>{`${mappedData?.companyDescription}`}</p>
                <p className=''>{`Hourly rate : ${mappedData?.hourlyRate} USD`}</p>
                <p className='text-blue-600'>{mappedData.portfolio}</p>
              </div>
            </div>
          )}

          <p className=''>{`${mappedData?.email}`}</p>
          <p>{`${mappedData?.location?.city?mappedData?.location?.city:''} ${mappedData.location.state?mappedData.location.state:''}, ${mappedData.location.country?mappedData.location.country:''}`}</p>
          
          <p className=''>{`${mappedData?.isTalent?'Talent':'Client'} since ${formattedCreationDate}`}</p>

          {showServiceProfile?(<div className='text-sm bg-slate-700 w-28 text-center p-3 my-5 hover:bg-slate-800 text-white rounded-lg' onClick={signOut}>
            Contact
          </div>):
          
          
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