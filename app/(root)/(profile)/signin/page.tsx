/* eslint-disable react-hooks/rules-of-hooks */

'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Logo from '@/public/Images/Logo.png'
import SigninPic from '@/public/Images/SigninPic.png'
import { useDispatch, useSelector } from 'react-redux';
import {setUser} from '@/state/userInfo/userSlice'
import { useRouter } from 'next/navigation'
import { RootState } from '@/store'
import { signUpTrue } from '@/state/showSignUp/showSignUp'
import { toast } from 'react-toastify'
import axios from 'axios'

export default function page() {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userReduxdata = useSelector((state:RootState)=>state.user.user)
  const dispatch = useDispatch()

  async function SignInUser(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response  = await axios.post(`/api/login`,{password,email})
      const userData = await response.data
      console.log(userData)
      if (!(response.status == 200))
      {
        return toast.error(userData.message)
      }
      dispatch(setUser(userData.user))
      toast.success("Signin successful")
      console.log("redux data",userReduxdata)
      router.push('/');
    }

    catch (error)
    {
      if (axios.isAxiosError(error)){
        if (error.response){
          toast.error(error.response.data.message)
          console.log(error.response.data.message)
        }
        
      }
      else
      {
        toast.error("Unexpected error")
      }
      

    }
  }



  function SignIn(){
    dispatch(signUpTrue())
    router.push('/');
  }

  return (
    <div className='w-full h-screen border-2 flex bg-softblue justify-center text-sm items-center'>
      <div className='flex lg:p-6 w-[90%] lg:w-auto p-3 flex-col bg-white lg:rounded-4xl rounded-md '>
        <div className='flex gap-1 lg:p-2 mb-5 lg:mb-0  items-center '>
                <Image src={Logo} alt='logo' className='w-5 object-contain'/>
                <p className='raleway-text text-conduit font-bold text-2xl'>
                  Conduit .
                </p>  
        </div>
        <div className='lg:w-5xl w-full flex justify-center gap-3 lg:p-20 items-center'>
          <div className='flex lg:w-[50%] w-full gap-6 flex-col'>
            <h1 className='lg:text-2xl text-lg  font-semibold '>Welcome back to Conduit</h1>
            <form onSubmit={SignInUser} className='flex gap-6 flex-col items-center'>
                <input type='email' tabIndex={1} required value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='name@email.com' className='h-12 placeholder:text-gray-500 rounded-sm p-3 lg:px-5 w-full border-[1px]' />
                <input type='password' tabIndex={2} required  value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='......................................' className='h-12 rounded-sm placeholder:text-gray-500  p-3 px-5 w-full border-[1px]' />
                <button className='w-full bg-foreground text-background lg:p-4 p-3 lg:text-sm text-xs hover:bg-conduit cursor-pointer lg:rounded-full rounded-lg  mt-6 lg:mt-0' type='submit'>Log in </button>
            </form>
            
          </div>
          <div className='w-[50%] hidden lg:flex justify-center items-center '>
            <Image src={SigninPic} alt='An image of the globe'/>
          </div>
        </div>
        <div className='flex gap-2 p-2 lg:mt-0 mt-4  w-full justify-center items-center lg:text-sm text-xs '>

                <p 
                // onClick={()=>{ console.log("redux data",userReduxdata)}}
                >
                  New to Conduit?
                </p>
                <button onClick={SignIn} className='lg:p-2 p-1.5 border-[1px] border-foreground lg:rounded-xl cursor-pointer rounded-md'>
                  Sign up
                </button>
        </div>
      </div>
    </div>
  )
}
