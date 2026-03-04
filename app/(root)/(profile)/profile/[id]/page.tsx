import React from 'react'
import { Avatar,AvatarFallback,AvatarImage } from '@/components/ui/avatar'
import { format } from 'date-fns'
import {profileInterface}  from '@/lib/types'
import ServiceViewer from '@/components/Profile/ServiceViewer'


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
    <div className='w-full min-h-screen flex gap-10 px-[10%] flex-col relative'>

        <div className='flex flex-col w-full mt-16 gap-4'>
          <div className='w-full flex gap-2 justify-between'>
            <div className='w-full flex gap-2 items-center '>
              <Avatar className='size-24 aspect-square object-cover'>
                <AvatarImage src ={profileData?.profilePicture}/>
                <AvatarFallback>{`${profileData?.lastName?.slice(0,1) || ""}${profileData?.firstName?.slice(0,1)||""}`}</AvatarFallback>
              </Avatar>

              <div className='flex-1 flex text-sm font-medium flex-col gap-2'>
                <p className='text-4xl text-wrap gap break-all hyphens-auto w-full font-semibold'>{`${profileData?.lastName|| "John"} ${profileData?.firstName || "Doe"}`}</p>
                <p className='break-all hyphens-auto'>{`${profileData?.email || "john_Doe@gmail.com"}`}</p>
              </div>
              
            </div>
            <div className=' h-12 flex items-center px-8 text-white font-medium rounded-full cursor-pointer hover:bg-black transition-colors duration-200 text-nowrap p-0 bg-conduit'>
              Get in touch
            </div>
          </div>
          
          {profileData?.bio&&<p className='text-lg font-medium text-conduit'>{profileData?.bio}</p>}

          {profileData?.skills && profileData?.skills.length > 0 && (
            <div className='text-sm w-full flex  items-start gap-3'>
              <div className='flex flex-wrap gap-3'> 
                {profileData?.skills.map((item, index:number) => (
                  <span key={index} className='p-1.5 hover:bg-softblue/40 select-none capitalize bg-softblue rounded-md'>{item}</span>
                ))}
              </div>
             
            </div>
          )}
          <p className='text-xs font-normal'>{`${profileData?.isTalent?'Talent':'Client'} since ${formattedCreationDate}`}</p>

        </div>

        <ServiceViewer profile ={profileData}/>

        


    </div>
  )
}

