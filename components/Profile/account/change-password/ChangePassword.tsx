'use client'
import React, { useState } from 'react'
import Field from '../Field'
import { toast } from 'react-toastify'
import Image from 'next/image'
import { KeyRound } from 'lucide-react'

interface propType{
    oldPassword:string,
    setOldPassword:React.Dispatch<React.SetStateAction<string>>,
    setLoading:React.Dispatch<React.SetStateAction<boolean>>,
    loading:boolean,
    setState:React.Dispatch<React.SetStateAction<'reset-password'|'verify-otp'|'change-password'>>
}

export default function ChangePassword(props:propType) {
    const {oldPassword,setOldPassword,setState,loading,setLoading} = props
    const [error,setError] = useState('')
    const [newPassword,setNewPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')


    function handleStartReset() {
        if (loading) return
        setError('')
        if (!oldPassword || oldPassword.trim().length === 0){
            setError('please provide your current password');
            return;
        } 
        setState('verify-otp')
        toast.success('Please check your email')
    }
  return (
    <div className='flex justify-center items-center flex-col gap-10'> 
        <div className='flex gap-1 items-center'>
            <Image src={'/icons/password/key.png'} alt='img' width={80} height={80} />
        </div>
        <div className='flex flex-col gap-2 w-full'>
            <Field type="password" error={error} value={newPassword} onChange={(e)=>setNewPassword(e)} label="New password" />
            <Field type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e)} label="Confirm password" />
        </div>

        <button onClick={handleStartReset} className="h-11 w-full bg-conduit text-white rounded-xl font-semibold hover:bg-black transition-colors flex items-center justify-center gap-2">
            <KeyRound size={16} /> Update Password
        </button>
    </div> 
  )
}
