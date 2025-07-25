"use client"
import React from 'react'
import Logo from '@/public/Images/Logo.png'

import Image from 'next/image'
import { useSession,signIn,signOut } from 'next-auth/react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const Navbar = () => {
  const { data: session } = useSession()
  return (
    <div className='py-3 flex justify-between w-full text-sm '>
      <div className='flex gap-1 items-center '>
        <Image src={Logo} alt='logo' className='w-5 object-contain'/>
        <p className='raleway-text text-conduit font-bold text-2xl'>
          Conduit .
        </p>
      </div>
      <div>

      </div>
      
      {
        session && session?.user?
          (
            <div className='flex items-center gap-2 font-semibold'>
              <Link href="/business/create" className='bg-foreground  cursor-pointer hover:bg-conduit text-background px-5 py-2 rounded-full' >
                Create
              </Link>
              <form className='hover:text-conduit cursor-pointer text-foreground px-5 py-2 rounded-full'  action={async()=>{
              await signOut()}}>
                <button type='submit'>
                  Log out
                </button>
              </form>
              <Link href={`/user/${session?.user?.id}`}>
                <Avatar>
                    {(session?.user?.image&&<AvatarImage src ={session?.user?.image}/>)}
                    <AvatarFallback>{session?.user?.name?.toUpperCase().slice(0,2)}</AvatarFallback>
                </Avatar>
              
              </Link>
              
              

            </div>
            )
            :
            (
            <div className='flex  items-center gap-2 font-semibold'>
              <form className='hover:text-conduit cursor-pointer text-foreground px-5 py-2 rounded-full' action={async()=>{
                await signIn()}}>
                <button type='submit'>
                  Sign In
                </button>
              </form>
            </div>
          )
      }

      

      
      
    </div>
  )
}

export default Navbar