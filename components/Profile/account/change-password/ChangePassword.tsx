'use client'
import React, { useState } from 'react'
import Field from '../Field'
import { toast } from 'react-toastify'
import Image from 'next/image'
import { KeyRound } from 'lucide-react'
import axios, { isAxiosError } from 'axios'
import { setUser, userState } from '@/state/userSlice'
import { useDispatch } from 'react-redux'

interface propType{
    resetToken:string,
    onClose: () => void
    setLoading:React.Dispatch<React.SetStateAction<boolean>>,
    loading:boolean,
}

export default function ChangePassword(props:propType) {
    const {loading,onClose,resetToken,setLoading} = props
    const [error,setError] = useState('')
    const [newPassword,setNewPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const dispatch = useDispatch() 


    async function handleChangePassword() {
        if (loading) return
        setError('')
        try {
            setLoading(true)
            if (newPassword !== confirmPassword) return setError("your passwords must match")
            if (!newPassword || newPassword.length<8) return setError("Password must be at least 8 characters")
            if (newPassword.length>100) return setError('Password cannot exceed 100 characters')
            if (!resetToken || resetToken.length==0) return setError("User is not verified, please try again")
            
            const response = await axios.post('/api/auth/password-change',{password:newPassword},{
                headers:{
                    'Authorization':`Bearer ${resetToken}`
                }
            })
            if (response.status!==200) return
            const userData = await response.data
            const payload:userState = {user:userData.user,token:userData.token}
            dispatch(setUser(payload))
            toast.success("password changed successfully")
            onClose()
        }

        catch (error) {
            if (isAxiosError(error)) return setError(error.response?.data.message)
            return setError(`couldn't change your password due to a server error`)
        }

        finally{
            setLoading(false)
        }
        
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

        <button onClick={handleChangePassword} className="h-11 w-full bg-conduit text-white rounded-xl font-semibold hover:bg-black transition-colors flex items-center justify-center gap-2">
            <KeyRound size={16} /> Update Password
        </button>
    </div> 
  )
}
