"use client"
import React,{useState} from 'react'
import Logo from '@/public/Images/Logo.png'

import Image from 'next/image'
import Link from 'next/link'
import { Avatar, AvatarFallback,AvatarImage} from './ui/avatar'
import { useSelector,useDispatch} from 'react-redux'
import { clearUser } from '@/state/userInfo/userSlice'
import {signUpTrue} from '@/state/showSignUp/showSignUp'
import { RootState } from '@/store'
import { GiHamburgerMenu } from "react-icons/gi";
import { setToProfile } from '@/state/profileIsMe/profileIsMeSlice'



const NavbarAuth = () => {
  const userReduxData = useSelector((state:RootState)=>state.user.user)
  const [showHamburger,setShowHamburger] = useState(false)
  const dispatch = useDispatch()
  return (
    <div className='py-3 flex justify-between w-full text-sm '>
      <div className='flex gap-1 items-center '>
        <Image src={Logo} alt='logo' className='w-5 object-contain'/>
        <p className='raleway-text text-conduit font-bold text-xl sm:text-2xl'>
          Conduit .
        </p>
      </div>

      
      <div className=' flex justify-end raleway-text sm:justify-center items-center'>
        {
          userReduxData?
            (
              <div className='flex items-center  gap-2 font-semibold relative'>
                <div className='sm:flex items-center  gap-2 hidden'>
                     <Link href="/" className='bg-foreground  cursor-pointer hover:bg-conduit text-background py-1 px-2 sm:px-5 sm:py-2 rounded-full' >
                      Create a service
                    </Link>
                    <form action={()=>{dispatch(clearUser())}} className='hover:text-conduit cursor-pointer text-foreground py-1 px-2 sm:px-5 sm:py-2 rounded-full'>
                      <button type='submit' className='cursor-pointer'>
                        Log out
                      </button>
                    </form>
                    <Link href={`/profile/${userReduxData._id}`}>
                      <Avatar>
                          <AvatarImage src ={userReduxData?.profilePicture}/>
                          <AvatarFallback>{`${userReduxData?.lastName.slice(0,1)}${userReduxData?.firstName.slice(0,1)}`}</AvatarFallback>
                      </Avatar>
                    
                    </Link>
                </div>

                <div className='text-xl sm:hidden cursor-pointer flex items-center gap-4 '>
                  <Link href={`/profile/${userReduxData._id}`} >
                      <Avatar>
                          <AvatarImage src ={userReduxData?.profilePicture}/>
                          <AvatarFallback>{`${userReduxData?.lastName.slice(0,1)}${userReduxData?.firstName.slice(0,1)}`}</AvatarFallback>
                      </Avatar>
                  </Link>


                  <GiHamburgerMenu onClick={()=>{setShowHamburger(!showHamburger)}}/>
                  {showHamburger&&(
                    <div className='absolute text-sm flex justify-center items-center flex-col rounded-md cursor-pointer w-44 right-0 top-10 bg-conduit/20 backdrop-blur-xs text-foreground overflow-hidden z-10 shadow-md'>

                      <Link href="/" className='hover:bg-background w-full h-full text-center p-3' >
                        Create a service
                      </Link>

                      <form action={()=>{dispatch(clearUser())}} className='hover:bg-softblue w-full h-full text-center p-3'>
                        <button type='submit'>
                          Log out
                        </button>
                      </form>
                    </div>
                  )}

                </div>
                
                

              </div>
              )
              :
              (
              <div className='flex  items-center justify-end w-full gap-1 sm:gap-2 font-semibold'>
                <button onClick={()=>{dispatch(signUpTrue())}} className=' bg-foreground  cursor-pointer hover:bg-conduit text-background py-2 px-2 sm:px-5 sm:py-2 rounded-md sm:rounded-full ' >
                  Sign up
                </button>

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