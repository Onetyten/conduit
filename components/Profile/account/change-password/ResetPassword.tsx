'use client'
import React, { useState } from 'react'
import Field from '../Field'
import Image from 'next/image'
import api from '@/lib/api'
import { isAxiosError } from 'axios'

interface propType{
    oldPassword:string,
    setOldPassword:React.Dispatch<React.SetStateAction<string>>,
    setLoading:React.Dispatch<React.SetStateAction<boolean>>,
    loading:boolean,
    setOTPExpiryTime:React.Dispatch<React.SetStateAction<number>>,
    setState:React.Dispatch<React.SetStateAction<'reset-password'|'verify-otp'|'change-password'>>
}

export default function ResetPassword(props:propType) {
    const {oldPassword,setOldPassword,setState,loading,setLoading,setOTPExpiryTime} = props
    const [oldPasswordError,setOldPasswordError] = useState('')

    async function handleStartReset() {
        if (loading) return
        setOldPasswordError('')
        if (!oldPassword || oldPassword.trim().length === 0){
          setOldPasswordError('please provide your current password');
          return;
        }

        try {
          setLoading(true)
          const response = await api.post('/api/auth/password-reset',{password:oldPassword})
          if (response.status!==200) return
          setOTPExpiryTime(Math.floor((new Date(response.data.expiresAt).getTime() - Date.now())/1000))
          setState('verify-otp')
        }
        catch (error) {
          if (isAxiosError(error)){
            setOldPasswordError(error.response?.data.message)
            return
          }
          setOldPasswordError(`couldn't verify your password due to a server error`)
          return
        }
        finally{
          setLoading(false)
        }
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
