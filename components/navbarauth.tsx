"use client"
import React from 'react'
import Logo from '@/public/Images/Logo.png'

import Image from 'next/image'
import Link from 'next/link'
import { Avatar, AvatarFallback,AvatarImage} from './ui/avatar'
import { useSelector,useDispatch} from 'react-redux'
import { clearUser } from '@/state/userInfo/userSlice'
import { RootState } from '@/store'


const NavbarAuth = () => {
  const userReduxData = useSelector((state:RootState)=>state.user.user)
  const dispatch = useDispatch()
  return (
    <div className='py-3 flex justify-between w-full text-sm '>
      <div className='flex gap-1 items-center '>
        <Image src={Logo} alt='logo' className='w-5 object-contain'/>
        <p className='font-rowdies text-conduit font-bold text-xl sm:text-2xl'>
          Conduit .
        </p>
      </div>

      
      <div className=' flex justify-end sm:justify-center items-center'>
        {
          userReduxData?
            (
              <div className='flex items-center  gap-2 font-semibold'>
                <Link href="/business/create" className='bg-foreground  cursor-pointer hover:bg-conduit text-background py-1 px-2 sm:px-5 sm:py-2 rounded-full' >
                  Create
                </Link>
                <form action={()=>{dispatch(clearUser())}} className='hover:text-conduit cursor-pointer text-foreground py-1 px-2 sm:px-5 sm:py-2 rounded-full'>
                  <button type='submit'>
                    Log out
                  </button>
                </form>
                <Link href={`/profile`}>
                  <Avatar>
                      <AvatarImage src ={userReduxData?.profilePicture}/>
                      <AvatarFallback>{`${userReduxData?.lastName.slice(0,1)}${userReduxData?.firstName.slice(0,1)}`}</AvatarFallback>
                  </Avatar>
                
                </Link>
                
                

              </div>
              )
              :
              (
              <div className='flex  items-center justify-end w-full gap-1 sm:gap-2 font-semibold'>
                <Link href="/signup" className='bg-foreground  cursor-pointer hover:bg-conduit text-background py-1 px-2 sm:px-5 sm:py-2 rounded-full' >
                  Sign up
                </Link>

                <Link href="/signin"  className='hover:text-conduit cursor-pointer text-foreground py-1 px-2 sm:px-5 sm:py-2rounded-full' >
                  Sign In
                </Link>

              </div>
            )
        }
      </div>



      

      
      
    </div>
  )
}

export default NavbarAuth