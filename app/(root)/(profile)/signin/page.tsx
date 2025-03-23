/* eslint-disable react-hooks/rules-of-hooks */

"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Logo from '@/public/Images/Logo.png'
import SigninPic from '@/public/Images/SigninPic.png'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux';
import {setUser} from '@/state/userInfo/userSlice'
import { useRouter } from 'next/navigation'

export default function page() {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userReduxdata = useSelector((state)=>state.user.user)
  const dispatch = useDispatch()


  const Submit = async () => {
    try {
      const response  = await fetch(`/api/auth/${email}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({password})
      })

      const userData = await response.json()
      if (!response.ok)
        {
          
          alert(userData.message)
          throw new Error(`Failed to fetch user ${email}`)
        }
      dispatch(setUser(userData.user))
      console.log("redux data",userReduxdata)
      router.push('/');
    }

    catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='w-full h-screen flex bg-softblue justify-center text-sm items-center'>
      <div className='flex p-6 flex-col bg-white rounded-4xl'>
        <div className='flex gap-1 p-2 items-center '>
                <Image src={Logo} alt='logo' className='w-5 object-contain'/>
                <p className='font-rowdies text-conduit font-bold text-2xl'>
                  Conduit .
                </p>
               
        </div>
        <div className='w-5xl flex justify-center gap-3 p-20 items-center'>
          <div className='flex w-[50%] gap-5 flex-col'>
            <h1 className='text-2xl font-semibold '>Welcome back to Conduit 👋</h1>
            <form action={()=>{Submit()}} className='flex gap-5 flex-col items-center'>
                <input type='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='name@email.com' className='h-12 placeholder:text-gray-500 rounded-sm p-3 px-5 w-full border-[1px]' />
                <input type='password'  value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='......................................' className='h-12 rounded-sm placeholder:text-gray-500  p-3 px-5 w-full border-[1px]' />
                <button className='w-full bg-foreground text-background p-4 hover:bg-conduit rounded-full' type='submit'>Log in </button>
            </form>
            
          </div>
          <div className='w-[50%] flex justify-center items-center'>
            <Image src={SigninPic} alt='An image of the globe'/>
          </div>
        </div>
        <div className='flex gap-2 p-2 w-full justify-center items-center '>

                <p 
                // onClick={()=>{ console.log("redux data",userReduxdata)}}
                >
                  New to Conduit?
                </p>
                <Link href="/signup" className='p-2 border-[1px] border-foreground rounded-xl'>
                  Sign up
                </Link>
        </div>
      </div>
    </div>
  )
}
