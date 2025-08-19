import React from 'react'
import { Avatar,AvatarFallback,AvatarImage } from '@/components/ui/avatar'
import { format } from 'date-fns'
import BackButton from '@/components/BackButton'
import {profileInterface}  from '@/lib/types'
import ProfileActions from '@/components/profileActions'


async function getProfile(id:string):Promise<profileInterface> {
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getserviceprofile`,{
  method:'POST',
  cache:'no-store',
  headers:{
      'Content-Type':'application/json'
  },
  body:JSON.stringify({user_id:id})
  })

  if (!res.ok) throw new Error('Failed to fetch profile')
  const profile = await res.json()
  return profile.user
}


export default async function page({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
  const { id } = await params
    const profileData = await getProfile(id)
    const creationDate = profileData?.createdAt ? new Date(profileData.createdAt) : null
    const formattedCreationDate = creationDate && !isNaN(creationDate.getTime()) ? format(creationDate, "MMM d, yyyy") : "Unknown Date";

  return (
    <div className='w-full min-h-screen flex flex-col sm:flex-row  relative'>
      <BackButton/>
      <div className='bg-softblue sm:pt-0 pt-16 flex-1 p-5 flex justify-center items-center'>
         <Avatar className='sm:w-56 sm:h-56 w-32 h-32 object-cover'>
            <AvatarImage src ={profileData?.profilePicture}/>
            <AvatarFallback>{`${profileData?.lastName?.slice(0,1) || ""}${profileData?.firstName?.slice(0,1)||""}`}</AvatarFallback>
          </Avatar>
      </div>
      <div className='flex-1 flex flex-col p-5 justify-center items-center gap-5'>
        <div className='flex flex-col p-10 gap-5 text-xs '>
          <p className='text-3xl font-semibold'>{`${profileData?.lastName || "John"} ${profileData?.firstName || "Doe"}`}</p>
          <div className='sm:text-sm text-xs flex gap-3'>
            <p className='p-1.5 px-4 hover:bg-softblue/50 bg-softblue select-none rounded-md'>
              {profileData?.isTalent?'Talent':'Client'}
            </p>
            
          </div>

          {profileData?.skills && profileData?.skills.length > 0 && (
            <div className='sm:text-sm text-xs gap-2 flex flex-col'>
              <p className='font-semibold'>Skills </p>
              <div className='flex flex-wrap gap-3'> 
                {profileData?.skills.map((item, index:number) => (
                  <span key={index} className='p-1.5 px-4 hover:bg-softblue/50 select-none capitalize bg-softblue rounded-md'>{item}</span>
                ))}
              </div>
             
            </div>
          )}

          {profileData?.bio&&<p className='text-sm py-3'>{profileData?.bio}</p>}
          


          <p className=''>{`${profileData?.email || "john_Doe@gmail.com"}`}</p>
          <p>{`${profileData?.location?.district?profileData?.location?.district:''} ${profileData?.location?.state?profileData?.location?.state:''}, ${profileData?.location?.country?profileData.location?.country:''}`}</p>
          
          <p className=''>{`${profileData?.isTalent?'Talent':'Client'} since ${formattedCreationDate}`}</p>
          <ProfileActions currentId={id}/>



          
        </div>
      </div>


    </div>
  )
}

