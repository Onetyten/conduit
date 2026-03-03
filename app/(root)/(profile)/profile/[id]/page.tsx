import React from 'react'
import { Avatar,AvatarFallback,AvatarImage } from '@/components/ui/avatar'
import { format } from 'date-fns'
import BackButton from '@/components/BackButton'
import {profileInterface}  from '@/lib/types'
import ProfileActions from '@/components/profileActions'


async function getProfile(id:string):Promise<profileInterface> {
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/service/getserviceprofile`,{
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


export default async function page({ params}: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const profileData = await getProfile(id)
  const creationDate = profileData?.createdAt ? new Date(profileData.createdAt) : null
  const formattedCreationDate = creationDate && !isNaN(creationDate.getTime()) ? format(creationDate, "MMM d, yyyy") : "Unknown Date";

  return (
    <div className='w-full min-h-screen flex flex-col sm:flex-row  relative'>
      <BackButton/>

      <div className='bg-softblue overflow-y-scroll w-96 max-w-full flex-col p-5 flex justify-between items-center'>
        <div className='flex flex-col w-full mt-16 gap-3'>
          <div className='w-full flex gap-2 '>
            <Avatar className='size-32 aspect-square object-cover'>
              <AvatarImage src ={profileData?.profilePicture}/>
              <AvatarFallback>{`${profileData?.lastName?.slice(0,1) || ""}${profileData?.firstName?.slice(0,1)||""}`}</AvatarFallback>
            </Avatar>

            <div className='flex-1 flex text-sm font-medium flex-col gap-2'>
              <p className='text-3xl text-wrap gap break-all hyphens-auto w-full font-semibold'>{`${profileData?.lastName || "John"} ${profileData?.firstName || "Doe"}`}</p>
              <p className='break-all hyphens-auto'>{`${profileData?.email || "john_Doe@gmail.com"}`}</p>
              <p className='break-all hyphens-auto'>{`${profileData?.location?.district?profileData?.location?.district:''} ${profileData?.location?.state?profileData?.location?.state:''}, ${profileData?.location?.country?profileData.location?.country:''}`}</p>

              <p className='text-xs font-normal'>{`${profileData?.isTalent?'Talent':'Client'} since ${formattedCreationDate}`}</p>
            </div>
            
          </div>
          
          {profileData?.bio&&<p className='text-base'>{profileData?.bio}</p>}

          {profileData?.skills && profileData?.skills.length > 0 && (
            <div className='text-sm w-full flex items-center gap-3'>
              <p className='font-semibold'>Skills</p>
              <div className='flex flex-wrap gap-3'> 
                {profileData?.skills.map((item, index:number) => (
                  <span key={index} className='p-1.5 hover:bg-muted/40 select-none capitalize bg-muted/50 rounded-md'>{item}</span>
                ))}
              </div>
             
            </div>
          )}

          
          
          




        </div>

        <div className='w-full'>
          <ProfileActions currentId={id}/>
        </div>
         
      </div>

      <div className='flex-1 flex flex-col p-5 justify-center items-center gap-5'>
        <div className='flex flex-col p-10 gap-5 text-xs '>
          


          



          
        </div>
      </div>


    </div>
  )
}

