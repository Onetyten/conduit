'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Clock, KeyRound } from 'lucide-react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { InputOTP,InputOTPGroup,InputOTPSlot } from '@/components/ui/input-otp'



interface propType{
    oldPassword:string,
    setOldPassword:React.Dispatch<React.SetStateAction<string>>,
    setResetToken:React.Dispatch<React.SetStateAction<string>>,
    setLoading:React.Dispatch<React.SetStateAction<boolean>>,
    loading:boolean,
    setState:React.Dispatch<React.SetStateAction<'reset-password'|'verify-otp'|'change-password'>>
}


export default function OTPVerification(props:propType) {
    const {oldPassword,setOldPassword,setState,loading,setLoading,setResetToken} = props
    const profile = useSelector((state:RootState)=>state.user.user)
    const [timeLeft, setTimeLeft] = useState(60)
    const [canResend, setCanResend] = useState(false)
    const [otpValue, setOtpValue] = useState('')
    const [otpError, setOtpError] = useState('')

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
        setResetToken('reset')
        setState('change-password')
        toast.success(`Password changed with OTP: ${otpValue}`)
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
        
        <InputOTP value={otpValue} maxLength={6}
            onChange={(value) => {
                const numericValue = value.replace(/\D/g, '')
                setOtpValue(numericValue)
            }} >
            <InputOTPGroup>
                {Array.from({length:6}).map((_,index)=> <InputOTPSlot key={index} index={index} className="w-14 h-14 text-xl" />)}
            </InputOTPGroup>
        </InputOTP>

        {otpError && (
            <p className='text-red-500 text-sm mt-2 text-center'>
                {otpError}
            </p>
        )}
    
        <button disabled={loading || otpValue.length !== 6} onClick={verifyOTP} className="h-11 w-full bg-conduit text-white rounded-xl font-semibold hover:bg-black transition-colors flex disabled:bg-muted items-center justify-center gap-2">
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