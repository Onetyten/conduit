'use client'
import React, { useEffect, useState } from 'react'
import { signUpFalse } from '@/state/showSignUp'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { NewUserType } from '@/lib/types'
import { Check } from 'lucide-react'

interface propTypes {
  newUser: NewUserType
}

export default function FinishSlide(props: propTypes) {
  const router = useRouter()
  const dispatch = useDispatch()
  const { newUser } = props


  async function Continue() {
    dispatch(signUpFalse())
    router.push('/signin')
  }

  return (
    <div className='h-full w-full flex flex-col gap-8 items-center justify-center relative overflow-hidden'>
             <div className='absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-conduit/30 rounded-bl-sm' />
            <div className='absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-conduit/30 rounded-br-sm' />
            <div className='absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-conduit/30 rounded-tr-sm' />
   
      <div className='relative flex items-center justify-center '>
        <div className='relative z-10 w-16 h-16 rounded-full bg-conduit flex items-center justify-center shadow-lg'>
            <Check color='#ffffff' size={30}/>
        </div>
      </div>

      <div className='flex flex-col items-center gap-3 text-center px-8'>

        <p className='text-2xl lg:text-3xl font-bold leading-snug'>
          Welcome to Conduit {newUser.firstname ? (
            <span className='text-conduit'>, {newUser.firstname}.</span>
          ) : '.'}
        </p>

        <p className='text-bas text-muted max-w-xs leading-relaxed'>
          Your profile is all set. Sign in to start connecting.
        </p>
      </div>


      <button
        onClick={Continue}
        className='group relative overflow-hidden h-12 px-10 rounded-xl bg-conduit text-white font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
      >
        <span
          className='absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700'
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
          }}
        />
        <span className='relative px-6 flex text-base items-center gap-2'>
          Sign in to Conduit
        </span>
      </button>
    </div>
  )
}