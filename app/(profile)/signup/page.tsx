import React from 'react'
import Image from 'next/image'
import Logo from '@/public/Images/Logo.png'
import SigninPic from '@/public/Images/SigninPic.png'
import Link from 'next/link'

const page = () => {
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
            <form action="" className='flex gap-5 flex-col items-center'>
                <input type='email' placeholder='name@email.com' className='h-12 placeholder:text-gray-500 rounded-sm p-3 px-5 w-full border-[1px]' />
                <input type='password' placeholder='......................................' className='h-12 rounded-sm placeholder:text-gray-500  p-3 px-5 w-full border-[1px]' />
                <button className='w-full bg-foreground text-background p-4 hover:bg-conduit rounded-full'>Log in </button>
            </form>
            
          </div>
          <div className='w-[50%] flex justify-center items-center'>
            <Image src={SigninPic} alt='An image of the globe'/>
          </div>
        </div>
        <div className='flex gap-2 p-2 w-full justify-center items-center '>

                <p>New to Conduit?</p>
                <Link href="/signin" className='p-2 border-[1px] border-foreground rounded-xl'>
                  Sign in
                </Link>
                
               
        </div>
      </div>
    </div>
  )
}

export default page