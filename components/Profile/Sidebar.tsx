"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { BsLayoutSidebarInset, BsLayoutSidebarInsetReverse } from 'react-icons/bs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import Logo from '@/public/Images/Logo.png'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Sidebar() {
    const userData = useSelector((state:RootState)=>state.user.user)
    const [showSideBar,setShowSidebar] = useState(false)
    const router = useRouter()
    if (!userData) return

  return (
    <div onClick={()=>setShowSidebar(false)} className={`w-full absolute sm:relative z-40  ${showSideBar?"bg-conduit/50 pointer-events-auto w-full sm:w-64 md:w-80 lg:w-96 backdrop-blur-lg max-w-full lg:max-w-96 md:max-w-80 flex sm:max-w-64 h-full":"pointer-events-none sm:pointer-events-auto w-auto sm:w-16 sm:max-w-16 h-18 sm:h-full sm:bg-conduit/50"}`}>

      <div onClick={(e)=>e.stopPropagation()} className={` overflow-y-scroll ${showSideBar?" w-[80%] sm:w-96 p-5 bg-softblue flex-col ":"sm:p-5 flex-row sm:flex-col shadow-lg sm:shadow-none items-center sm:items-start px-4"} bg-softblue h-full transition-transform duration-200 max-w-full flex-col flex justify-between`}>

        <div className={`flex flex-col gap-3 ${showSideBar?"items-start":"items-center"} w-full`}>

          <div onMouseEnter={()=>router.prefetch(`/`)} className={`flex items-center pointer-events-auto w-full justify-between ${showSideBar?"flex-row":"sm:flex-col-reverse"}`}>
           
            <Link href={"/"} className={` gap-1 ${showSideBar?"flex":" flex sm:hidden"} items-center`}>
              <Image src={Logo} alt='logo' className='w-4 object-contain'/>
              <p className={`font-orbitron font-black text-conduit text-xl ${showSideBar?"inline":"inline sm:hidden"}`}>
                Conduit .
              </p>
            </Link>
          

            <div onClick={()=>setShowSidebar(!showSideBar)}>
              {showSideBar?
                <BsLayoutSidebarInset className='text-2xl text-conduit' />
                :
                <BsLayoutSidebarInsetReverse className='text-2xl text-conduit' />
              }
            </div>

            
          </div>
          
          <div className={`items-center ${showSideBar?"border-2 p-3 rounded-lg flex":"sm:flex hidden "} justify-center items-center border-muted/30 mt-8 w-full gap-3`}>
          
            <Avatar className='size-12 aspect-square object-cover'>
              <AvatarImage src ={userData?.profilePicture}/>
              <AvatarFallback>{`${userData?.lastName?.slice(0,1) || ""}${userData?.firstName?.slice(0,1)||""}`}</AvatarFallback>
            </Avatar>
            {showSideBar && (
              <p className='text-xl text-wrap gap break-all hyphens-auto w-full font-semibold'>{`${userData?.lastName || "John"} ${userData?.firstName || "Doe"}`}</p>
            )}
            
          </div>
        </div>
         
      </div>
    </div>

  )
}
