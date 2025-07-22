'use client'
import React,{useState} from 'react'
import NavigationButton from '../NavigationButton'
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';

interface propTypes{
    setSlideIndex: React.Dispatch<React.SetStateAction<number>>
    password:string
    setPassword:React.Dispatch<React.SetStateAction<string>>
    slideIndex:number
    passwordCheck:string
    setPasswordCheck:React.Dispatch<React.SetStateAction<string>>
}




export default function PasswordSlide(props:propTypes) {
    const {setSlideIndex,password,setPassword,slideIndex,passwordCheck,setPasswordCheck} = props
    const [showPasswordEmpty,setShowPasswordEmpty] = useState(false)
    const [showPasswordMatchErr,setShowPasswordMatchErr] = useState(false)

    const [showPassword,setShowPassword] = useState(false)
    const [showPasswordCheck,setShowPasswordCheck] = useState(false)

    function Next() {
        if (password.length<1){
            setShowPasswordEmpty(true)
            toast.error("The password field is empty",{autoClose:1000})
        }
        if (password!=passwordCheck){
            setShowPasswordMatchErr(true)
             toast.error("Passwords do not match",{autoClose:1000})
        }
        if(password.length>1 &&password==passwordCheck){
            setSlideIndex(slideIndex+1)
        }
        
    }
    function Prev() {
        setSlideIndex(slideIndex-1)
    }
  return (
    <div className='h-full w-full px-6 sm:px-[20%] text-xs'>
        <div className='flex flex-col justify-center items-center w-full h-full gap-8'>
            <p className='lg:text-2xl text-lg  font-semibold '>Secure Your Account</p>

           

            <div className='flex flex-col gap-2 w-full'>
                <div className='relative w-full h-full flex justify-center items-center'>
                    <input required type ={`${showPassword?'text':'password'}`} value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password' className='h-12 placeholder:text-gray-500 rounded-sm p-3 lg:px-5 w-full border-[1px]' /> 
                    {showPassword?(<FaEyeSlash className='text-conduit text-xl absolute right-6 cursor-pointer ' onClick={()=>{setShowPassword(false)}}/>):(<FaEye className='text-conduit text-xl absolute right-6 cursor-pointer ' onClick={()=>{setShowPassword(true)}}/>)}

                </div>
              {showPasswordEmpty&&(
                <p className='text-xs text-red-600'>
                    The password field is empty
                </p>
              )}
              
            </div>


            <div className='flex flex-col gap-2 w-full'>
                <div className='relative w-full h-full flex justify-center items-center'>
                    <input required type={`${showPasswordCheck?'text':'password'}`} value={passwordCheck} onChange={(e)=>{setPasswordCheck(e.target.value)}} placeholder='Confirm Password'className='h-12 placeholder:text-gray-500 rounded-sm p-3 lg:px-5 w-full border-[1px]' />   
                    {showPasswordCheck?(<FaEyeSlash className='text-conduit text-xl absolute right-6 cursor-pointer ' onClick={()=>{setShowPasswordCheck(false)}}/>):(<FaEye className='text-conduit text-xl absolute right-6 cursor-pointer ' onClick={()=>{setShowPasswordCheck(true)}}/>)} 
                </div>

              {showPasswordMatchErr&&(
                <p className='text-xs text-red-600'>
                    Passwords do not match
                </p>
              )}
              
            </div>

            

            <div className='flex gap-6'>
                <NavigationButton direction={0} Click={Prev}/>
                <NavigationButton direction={1} Click={Next}/>
            </div>
       
            
            
        </div>  
    </div>
  )
}
