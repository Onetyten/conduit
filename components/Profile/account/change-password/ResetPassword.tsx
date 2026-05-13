'use client'
import React, { useState } from 'react'
import Field from '../Field'
import { toast } from 'react-toastify'
import Image from 'next/image'

interface propType{
    oldPassword:string,
    setOldPassword:React.Dispatch<React.SetStateAction<string>>,
    setLoading:React.Dispatch<React.SetStateAction<boolean>>,
    loading:boolean,
    setState:React.Dispatch<React.SetStateAction<'reset-password'|'verify-otp'|'change-password'>>
}

export default function ResetPassword(props:propType) {
    const {oldPassword,setOldPassword,setState,loading,setLoading} = props
    const [oldPasswordError,setOldPasswordError] = useState('')

    function handleStartReset() {
        if (loading) return
        setOldPasswordError('')
        if (!oldPassword || oldPassword.trim().length === 0){
        setOldPasswordError('please provide your current password');
        return;
        } 
        setState('verify-otp')
        toast.success('Please check your email')
    }
  return (
    <div className='flex justify-center items-center flex-col gap-10'> 
        <div className='flex gap-1 items-center'>
            {Array.from({length:3}).map((_,i) =>  <Image key={i} src={'/icons/password/asterick.png'} alt='img' width={50} height={50} /> )}
        </div>
        <Field type="password" error={oldPasswordError} value={oldPassword} onChange={(e)=>setOldPassword(e)} label="Current Password" />
          <button onClick={handleStartReset} className="h-11 w-full bg-conduit text-white rounded-xl font-semibold hover:bg-black transition-colors flex items-center justify-center gap-2">
          Next
        </button>
    </div> 
  )
}
