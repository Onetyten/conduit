/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React from 'react'
import { useSelector } from 'react-redux'
import { Avatar,AvatarFallback,AvatarImage } from '@/components/ui/avatar'
import { format } from 'date-fns'
import { MdArrowBack } from 'react-icons/md'
import { useRouter } from 'next/navigation'
import { clearUser } from '@/state/userInfo/userSlice'
import { useDispatch } from 'react-redux'
import Link from 'next/link'

const page = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const userReduxData = useSelector((state)=>state.user.user)
    const creationDate = userReduxData?.createdAt ? new Date(userReduxData.createdAt) : null;
    const formattedCreationDate = creationDate && !isNaN(creationDate.getTime()) ? format(creationDate, "MMM d, yyyy") : "Unknown Date";
    console.log(userReduxData)

    const signOut = ()=>{
      router.push('/')
      dispatch(clearUser())
      
    }

    if (userReduxData == null)
    return(
        <div className='w-full min-h-screen flex justify-center items-center'>
          <p>
            User Logged out
          </p>
        </div>
  )
  return (
    <div className='w-full min-h-screen flex relative'>
      <Link href={'/'} className='absolute top-3 left-3 text-2xl bg-blue-100 hover:bg-blue-200 p-2 text-conduit rounded-full'>
        <MdArrowBack className=''/>
      </Link>
      
      <div className='bg-softblue flex-1 p-5 flex justify-center items-center'>
         <Avatar className='w-56 h-56 object-cover'>
            <AvatarImage src ={userReduxData?.profilePicture}/>
            <AvatarFallback>{`${userReduxData?.lastName.slice(0,1)}${userReduxData?.firstName.slice(0,1)}`}</AvatarFallback>
          </Avatar>
      </div>
      <div className='flex-1 flex flex-col p-5 justify-center items-center gap-5'>
        <div className='flex flex-col p-10 gap-5 text-xs '>
          <p className='text-3xl font-semibold'>{`${userReduxData?.lastName} ${userReduxData?.firstName}`}</p>
          <div className='text-sm flex gap-3'>
            <p className='p-1.5 px-4 hover:bg-blue-100 bg-softblue rounded-md'>
              {userReduxData?.isTalent?'Talent':'Client'}
            </p>
            {userReduxData?.serviceCategories.length>0&&(
              <p className='p-1.5 px-4 hover:bg-blue-100 bg-softblue rounded-md'>
              {userReduxData?.serviceCategories.length>0 ?userReduxData?.serviceCategories:'Client'}
            </p> 
            )}
            
          </div>
          {userReduxData?.skills && userReduxData?.skills.length > 0 && (
            <div className='text-sm gap-2 flex flex-col'>
              <p className='font-semibold'>Skills </p>
              <div className='flex flex-wrap gap-3'> 
                {userReduxData?.skills.map((item, index) => (
                  <span key={index} className='p-1.5 px-4 hover:bg-blue-100 bg-softblue rounded-md'>{item}</span>
                ))}
              </div>
             
            </div>
          )}



          <p className='text-sm py-3'>{`${userReduxData?.bio}`}</p>

          {userReduxData.companyName&&(
            <div className='flex flex-col gap-3'>
              <p className='font-semibold text-sm'>Company Details</p>
              <div className='flex flex-col p-2 gap-3 w-full border-softblue ml-3 border-2 text-sm rounded-lg'>
                <p className='font-semibold text-base'>{`${userReduxData?.companyName}`}</p>
                <p className=''>{`${userReduxData?.companyDescription}`}</p>
                <p className=''>{`Hourly rate : ${userReduxData?.hourlyRate} USD`}</p>
                <Link href={userReduxData.portfolio} className='text-blue-600'>
                  {userReduxData.portfolio}
                </Link>
              </div>
            </div>
          )}

          <p className=''>{`${userReduxData?.email}`}</p>
          <p>{`${userReduxData?.location?.city?userReduxData?.location?.city:''} ${userReduxData.location.state?userReduxData.location.state:''}, ${userReduxData.location.country?userReduxData.location.country:''}`}</p>
          
          <p className=''>{`${userReduxData?.isTalent?'Talent':'Client'} since ${formattedCreationDate}`}</p>
          <div className='text-sm bg-red-500 w-28 text-center p-3 my-5 hover:bg-red-600 text-white rounded-lg' onClick={signOut}>
            Sign out
          </div>
        </div>
      </div>


    </div>
  )
}

export default page