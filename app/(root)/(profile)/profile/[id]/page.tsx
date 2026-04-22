import React from 'react'
import { Avatar,AvatarFallback,AvatarImage } from '@/components/ui/avatar'
import {profileInterface}  from '@/lib/types'
import ServiceViewer from '@/components/Profile/ServiceViewer'
import ProfileBio from '@/components/Profile/profileBio'
import Card from '@/components/Profile/Card'


async function getProfile(id:string):Promise<profileInterface|null> {
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/service/getserviceprofile`,{
    method:'POST',
    next:{revalidate:600},
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({user_id:id})
  })

  if (!res.ok) return null
  const profile = await res.json()
  return profile.user
}


export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const profileData = await getProfile(id)

  if (!profileData) {
    return (
      <div className='w-full min-h-screen mt-6 sm:mt-0 pb-10 flex gap-10 px-6 sm:px-[10%] flex-col relative'>
        <div className='flex flex-col w-full mt-16 gap-4 items-center justify-center'>
          <p className='text-xl font-medium text-red-500'>Profile not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full min-h-screen mt-6 sm:mt-0 pb-10 flex gap-10 px-6 sm:px-[10%] flex-col relative'>

        <Card className='flex flex-col w-full mt-16 gap-4'>
          <div className='w-full flex flex-col md:flex-row gap-2 justify-between'>
            <div className='w-full flex gap-2 items-center '>
              <Avatar className='size-20 sm:size-24 aspect-square object-cover'>
                <AvatarImage src ={profileData?.profilePicture}/>
                <AvatarFallback>{`${profileData?.lastName?.slice(0,1) || ""}${profileData?.firstName?.slice(0,1)||""}`}</AvatarFallback>
              </Avatar>

              <div className='flex-1 flex text-sm font-medium flex-col gap-2'>
                <p className='text-2xl sm:text-4xl text-wrap gap break-normal hyphens-auto w-full font-semibold'>{`${profileData?.lastName|| "John"} ${profileData?.firstName || "Doe"}`}</p>
                <p className='break-all hyphens-auto'>{`${profileData?.email || "john_Doe@gmail.com"}`}</p>
              </div>
              
            </div>
            <div className='h-12 mt-4 md:mt-0 flex items-center px-8 text-white font-medium rounded-xl justify-center  md:rounded-full cursor-pointer hover:bg-black transition-colors duration-200 text-nowrap p-0 bg-conduit'>
              Get in touch
            </div>
          </div>
          
         <ProfileBio profile={profileData}/>


         

        </Card>

        <ServiceViewer profile ={profileData}/>

    </div>
  )
}

