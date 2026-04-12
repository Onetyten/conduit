import React, { Suspense } from 'react'
import { Avatar,AvatarFallback,AvatarImage } from '@/components/ui/avatar'
import { format } from 'date-fns'
import {profileInterface}  from '@/lib/types'
import ServiceViewer from '@/components/Profile/ServiceViewer'
import { CiLocationOn } from 'react-icons/ci'
import { Skeleton } from '@/components/ui/skeleton'


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


function ProfileSkeleton() {
  return (
    <div className='w-full min-h-screen mt-6 sm:mt-0 pb-10 flex gap-10 px-6 sm:px-[10%] flex-col relative'>
      <div className='flex flex-col w-full mt-16 gap-4'>
        <div className='w-full flex flex-col md:flex-row gap-2 justify-between'>
          <div className='w-full flex gap-2 items-center'>
            <Skeleton className='size-20 sm:size-24 rounded-full' />
            <div className='flex-1 flex text-sm font-medium flex-col gap-2'>
              <Skeleton className='h-10 sm:h-12 w-48' />
              <Skeleton className='h-5 w-64' />
            </div>
          </div>
          <Skeleton className='h-12 w-36 mt-4 md:mt-0 rounded-xl md:rounded-full' />
        </div>

        <Skeleton className='h-6 w-full max-w-2xl' />

        <div className='flex flex-wrap gap-3'>
          <Skeleton className='h-8 w-20 rounded-md' />
          <Skeleton className='h-8 w-24 rounded-md' />
          <Skeleton className='h-8 w-16 rounded-md' />
        </div>

        <Skeleton className='h-4 w-32' />
        <Skeleton className='h-4 w-48 md:hidden block' />
      </div>

      {/* ServiceViewer skeleton */}
      <div className='w-full'>
        <Skeleton className='h-96 w-full rounded-lg' />
      </div>
    </div>
  )
}

async function ProfileContent({ id }: { id: string }) {
  const profileData = await getProfile(id)
  const creationDate = profileData?.createdAt ? new Date(profileData.createdAt) : null
  const formattedCreationDate = creationDate && !isNaN(creationDate.getTime()) 
    ? format(creationDate, "MMM d, yyyy") 
    : "Unknown Date"

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

        <div className='flex flex-col w-full mt-16 gap-4'>
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
          <p className='text-xs md:hidden block'>{profileData.location.state}, {profileData.location.country}</p>

        </div>

        <ServiceViewer profile ={profileData}/>

    </div>
  )
}



export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileContent id={id} />
    </Suspense>
  )
}

