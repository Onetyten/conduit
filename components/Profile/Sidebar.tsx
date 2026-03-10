import Image from 'next/image'
import React from 'react'
import { BsLayoutSidebarInsetReverse } from 'react-icons/bs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import Logo from '@/public/Images/Logo.png'
import Link from 'next/link'

export default function Sidebar() {
    const userData = useSelector((state:RootState)=>state.user.user)
    if (!userData) return

  return (
 
      <div className='bg-softblue/30 overflow-y-scroll w-96 max-w-full flex-col p-5 flex justify-between items-center'>
        <div className='flex flex-col gap-3 items-start w-full'>
          <div className='flex items-center w-full justify-between '>
            <Link href={"/"} className='flex gap-1 items-center '>
              <Image src={Logo} alt='logo' className='w-4 object-contain'/>
              <p className='font-orbitron font-black text-conduit text-xl'>
                Conduit .
              </p>
            </Link>
            <BsLayoutSidebarInsetReverse className='text-2xl text-conduit' />
          </div>
          
          <div className='flex items-center p-3 border rounded-lg border-muted/40 mt-8 w-full gap-3'>
          
            <Avatar className='size-12 aspect-square object-cover'>
              <AvatarImage src ={userData?.profilePicture}/>
              <AvatarFallback>{`${userData?.lastName?.slice(0,1) || ""}${userData?.firstName?.slice(0,1)||""}`}</AvatarFallback>
            </Avatar>

            <p className='text-xl text-wrap gap break-all hyphens-auto w-full font-semibold'>{`${userData?.lastName || "John"} ${userData?.firstName || "Doe"}`}</p>
          </div>
        </div>
         
      </div>
  )
}
