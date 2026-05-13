'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Field from '../Field'
import { toast } from 'react-toastify'
import { Clock, KeyRound } from 'lucide-react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import Link from 'next/link'
interface propType{
    oldPassword:string,
    setOldPassword:React.Dispatch<React.SetStateAction<string>>,
    setLoading:React.Dispatch<React.SetStateAction<boolean>>,
    loading:boolean,
    setState:React.Dispatch<React.SetStateAction<'reset-password'|'verify-otp'|'change-password'>>
}


export default function OTPVerification(props:propType) {
    const {oldPassword,setOldPassword,setState,loading,setLoading} = props
    const [oldPasswordError,setOldPasswordError] = useState('')
    const profile = useSelector((state:RootState)=>state.user.user)
    const [timeLeft, setTimeLeft] = useState(60)
    const [canResend, setCanResend] = useState(false)

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1)
            }, 1000)
            return () => clearTimeout(timer)
        } else {
            setCanResend(true)
        }
    }, [timeLeft])


    // Format time as MM:SS
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const handleResendOTP = async () => {
        if (!canResend || loading) return
        
        setLoading(true)
        try {
            setTimeLeft(60)
            setCanResend(false)
            toast.success('Verification code resent successfully!')
        } 
        catch (error) {
            toast.error('Failed to resend code. Please try again.')
        }
        finally {
            setLoading(false)
        }
    }

    function verifyOTP() {
        if (loading) return
        setState('change-password')
        toast.success('change password')
    }

  return (
    <div className='flex justify-center items-center flex-col gap-5'> 
        <div className='flex gap-1 items-center'>
            <Image src={'/icons/password/otp.png'} alt='img' width={80} height={80} />
        </div>

        <div className='flex flex-col w-full items-center text-center'>
            <p className=''>
                A verification code has been sent to <span className='font-bold'>{profile?.email}</span>

            </p>

        </div>
        

        {/* <Field type="password" error={oldPasswordError} value={oldPassword} onChange={(e)=>setOldPassword(e)} label="Current Password" /> */}
        <button onClick={verifyOTP} className="h-11 w-full bg-conduit text-white rounded-xl font-semibold hover:bg-black transition-colors flex items-center justify-center gap-2">
            <KeyRound size={20} /> Verify OTP
        </button>

        <div className='w-full flex text-sm justify-between items-center'>
            <div  className='flex items-center gap-2'>
                <Clock size={20} className='text-muted'/>
                <p>
                    00:00
                </p>
            </div>

            <div>
                {canResend?(
                    <button className='text-blue-700 font-bold cursor-pointer' onClick={handleResendOTP}>
                        Resend
                    </button>
                ):(
                    <div className='flex text-sm items-center gap-2'>
                        <div>
                            Resend in:
                        </div>
                        <p>
                            {formatTime(timeLeft)}
                        </p>
                    </div>
                )}
            </div>

        </div>
    </div> 
  )
}