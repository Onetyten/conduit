/* eslint-disable react-hooks/rules-of-hooks */

'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Logo from '@/public/Images/Logo.png'
import SigninPic from '@/public/Images/SigninPic.png'
import { useDispatch} from 'react-redux';
import {setUser, userState} from '@/state/userInfo/userSlice'
import { useRouter } from 'next/navigation'
import { signUpTrue } from '@/state/showSignUp/showSignUp'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Squares } from "react-activity";



export default function page() {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch()

  async function SignInUser(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return
    try {
      setLoading(true)
      const response  = await axios.post(`/api/login`,{password,email})
      const userData = await response.data
      if (!(response.status == 200))
      {
        return toast.error(userData.message)
      }
      const payload:userState = {user:userData.user,token:userData.token}
      dispatch(setUser(payload))
      toast.success("Signin successful")
      router.push('/');
    }

    catch (error)
    {
      if (axios.isAxiosError(error)){
        if (error.response){
          toast.error(error.response.data.message)
        }
        
      }
      else
      {
        toast.error("Unexpected error")
      }
      

    }
    finally{
      setLoading(false)
    }
  }



  function SignIn(){
    dispatch(signUpTrue())
    router.push('/');
  }

  return (
    <div className='w-full h-dvh border-2 flex bg-softblue justify-center text-xs lg:text-sm items-center'>
      <div className='flex lg:p-6 w-[90%] lg:w-auto p-3 py-6 flex-col bg-white lg:rounded-4xl rounded-md '>
        <div className='flex gap-1 lg:p-2 mb-5 lg:mb-0  items-center '>
                <Image src={Logo} alt='logo' className='w-3 lg:w-5 object-contain'/>
                <p className='font-orbitron text-conduit font-bold text-lg lg:text-2xl '>
                  CONDUIT .
                </p>  
        </div>
        <div className='lg:w-5xl w-full lg:text-base text-sm  flex justify-center gap-3 lg:p-20 items-center'>
          <div className='flex lg:w-[50%] w-full gap-3 sm:gap-6 flex-col'>
            <h1 className='lg:text-2xl text-xl  font-semibold '>Welcome back</h1>
            <form onSubmit={SignInUser} className='flex gap-2 sm:gap-3 flex-col items-center'>
                <input type='email' tabIndex={1} required value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='name@email.com' className='h-12 placeholder:text-muted rounded-sm p-3 lg:px-5 w-full border border-conduit/40' />
                <input type='password' tabIndex={2} required  value={password} onChange={(e)=>{setPassword(e.target.value)}}placeholder='......................................' className='h-12 rounded-sm placeholder:text-muted border-conduit/40  p-3 px-5 w-full border' />
                <div className='w-full mt-8 relative'>
                    <button className={`w-full ${loading?'bg-softblue':'bg-foreground hover:bg-conduit '} text-background lg:p-4 p-3 text-base cursor-pointer lg:rounded-full rounded-lg`} type='submit'>Log in </button>


                    {loading&&(
                        <div className='w-full flex absolute lg:-bottom-10 -bottom-6  justify-center items-center'>
                          <Squares color="#373f51"/>
                        </div>
                    )}
                </div>


                
            </form>



            
          </div>
          <div className='w-[50%] hidden lg:flex justify-center items-center '>
            <Image src={SigninPic} alt='An image of the globe'/>
          </div>
        </div>
        <div className='flex gap-2 lg:text-base text-sm p-2 lg:mt-0 mt-8  w-full justify-center items-center'>
            <p>
              New to Conduit?
            </p>
            <button onClick={SignIn} className='lg:p-2 p-1.5 border border-foreground lg:rounded-xl cursor-pointer rounded-md'>
              Sign up
            </button>
        </div>
      </div>
    </div>
  )
}
