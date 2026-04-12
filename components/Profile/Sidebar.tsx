"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { BsLayoutSidebarInset, BsLayoutSidebarInsetReverse } from 'react-icons/bs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import Logo from '@/public/Images/Logo.png'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Banknote, CircleUser, House, LogOut, MessageSquareMore, Wallet } from 'lucide-react'

export default function Sidebar() {
    const userData = useSelector((state:RootState)=>state.user.user)
    const [showSideBar,setShowSidebar] = useState(false)
    const router = useRouter()
    const currentPath = usePathname()
    const linkData = [
      {name:"Home",href:`/profile/${userData?._id}`,icon:House},
      {name:"Account",href:"/profile/account",icon:CircleUser},
      {name:"Messages",href:"/profile/messages",icon:MessageSquareMore,},
      {name:"Wallet",href:"/profile/wallet",icon:Wallet},
      {name:"Payments",href:"/profile/payments",icon:Banknote},
    ]
    if (!userData) return

  return (
    <div onClick={()=>setShowSidebar(false)} className={`w-full absolute sm:relative z-40  ${showSideBar?"bg-conduit/50 h-full pointer-events-auto w-full sm:w-64 md:w-80 lg:w-96 backdrop-blur-lg max-w-full lg:max-w-96 md:max-w-80 flex sm:max-w-64 ":"pointer-events-none sm:pointer-events-auto w-auto sm:w-16 sm:max-w-16 h-18 sm:h-full  sm:bg-conduit/50"}`}>

      <div onClick={(e)=>e.stopPropagation()} className={` overflow-y-scroll ${showSideBar?" w-[80%] sm:w-96 p-5 bg-softblue flex-col ":"sm:p-5 flex-row sm:flex-col items-center sm:items-start px-4"} shadow-lg bg-softblue h-full transition-transform duration-200 max-w-full flex-col flex justify-between`}>

        <div className={`flex flex-col gap-3 ${showSideBar?"items-start h-full ":"items-center sm:h-full"}  w-full`}>

          <div onMouseEnter={()=>router.prefetch(`/`)} className={`flex items-center pointer-events-auto w-full justify-between ${showSideBar?"flex-row":"sm:flex-col-reverse"}`}>
           
            <Link href={"/"} className={` gap-1 ${showSideBar?"flex":" flex sm:hidden"} items-center`}>
              <Image src={Logo} alt='logo' className='w-4 object-contain'/>
              <p className={`font-orbitron font-black text-conduit text-xl ${showSideBar?"inline":"inline sm:hidden"}`}>
                Conduit .
              </p>
            </Link>
          

            <div onClick={()=>setShowSidebar(!showSideBar)} className='cursor-pointer'>
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

          <div className={`w-full flex-1 ${showSideBar?"flex":"sm:flex hidden"}  flex-col justify-between h-full`}>
            <div className='gap-1 mt-12 flex flex-col'>
              {linkData.map((item,index)=>{
                return(
                  <Link href={item.href} key={index} className={`flex gap-2 text-conduit w-full transition-colors duration-100 ${showSideBar?`sm:p-5 ${currentPath===item.href?"sm:bg-white text-muted sm:text-conduit":""} my-5 sm:my-0 sm:hover:bg-conduit/10 sm:hover:shadow-md`:`my-5 hover:text-muted ${currentPath===item.href?"text-muted":""} `} rounded-xl`}>
                    <item.icon/> 
                    {showSideBar && item.name }

                  </Link>
                )
              })}

            </div>

            <div className={`font-bold flex gap-2 cursor-pointer hover:font-extrabold transition-all duration-300 text-red-500 my-8`}>
              <LogOut/>
              {showSideBar && "Sign out" }
            </div>
          </div>




        </div>
         
      </div>
    </div>

  )
}
