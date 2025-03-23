"use client"
import React from 'react'
import Logo from '@/public/Images/Logo.png'

import Image from 'next/image'
import Link from 'next/link'
import { Avatar, AvatarFallback,AvatarImage} from './ui/avatar'
import { useSelector,useDispatch} from 'react-redux'
import { clearUser } from '@/state/userInfo/userSlice'
import { RootState } from '@/store'

interface UserData {
  user?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  profilePicture?: string;
  bio?: string;
  isTalent?: boolean;
  location?: string;
  companyName?: string;
  companyDescription?: string;
}


const NavbarAuth = () => {
  const userReduxData: UserData|null|undefined = useSelector((state:RootState)=>state.user.user)
  const dispatch = useDispatch()
  return (
    <div className='py-3 flex justify-between w-full text-sm '>
      <div className='flex gap-1 items-center '>
        <Image src={Logo} alt='logo' className='w-5 object-contain'/>
        <p className='font-rowdies text-conduit font-bold text-2xl'>
          Conduit .
        </p>
      </div>
      <div>

      </div>
      
      {
        userReduxData?
          (
            <div className='flex items-center gap-2 font-semibold'>
              <Link href="/business/create" className='bg-foreground  cursor-pointer hover:bg-conduit text-background px-5 py-2 rounded-full' >
                Create
              </Link>
              <form action={()=>{dispatch(clearUser())}} className='hover:text-conduit cursor-pointer text-foreground px-5 py-2 rounded-full'>
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
            <div className='flex  items-center gap-2 font-semibold'>
              <Link href="/signup" className='bg-foreground  cursor-pointer hover:bg-conduit text-background px-5 py-2 rounded-full' >
                Sign up
              </Link>

              <Link href="/signin"  className='hover:text-conduit cursor-pointer text-foreground px-5 py-2 rounded-full' >
                Sign In
              </Link>

            </div>
          )
      }

      

      
      
    </div>
  )
}

export default NavbarAuth