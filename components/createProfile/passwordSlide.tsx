'use client'
import React,{useState} from 'react'
import NavigationButton from '../NavigationButton'

interface propTypes{
    setSlideIndex: React.Dispatch<React.SetStateAction<number>>
    password:string
    setPassword:React.Dispatch<React.SetStateAction<string>>
}




export default function PasswordSlide(props:propTypes) {
    const {setSlideIndex,password,setPassword} = props
    const [passwordCheck,setPasswordCheck] = useState('')

    function Next() {
        setSlideIndex(2)
    }
    function Prev() {
        setSlideIndex(0)
    }
  return (
    <div className='h-full w-full px-[20%]'>
        <div className='flex flex-col justify-center items-center w-full h-full gap-8'>
            <p className='lg:text-2xl text-lg  font-semibold '>Secure Your Account</p>

            <input type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password' className='h-12 placeholder:text-gray-500 rounded-sm p-3 lg:px-5 w-full border-[1px]' />

            <input type='email' value={passwordCheck} onChange={(e)=>{setPasswordCheck(e.target.value)}} placeholder='Confirm Password'className='h-12 placeholder:text-gray-500 rounded-sm p-3 lg:px-5 w-full border-[1px]' />

            <div className='flex gap-6'>
                <NavigationButton direction={0} Click={Prev}/>
                <NavigationButton direction={1} Click={Next}/>
            </div>
            
            
        </div>  
    </div>
  )
}
