'use client'
import React,{useState} from 'react'
import NavigationButton from '../NavigationButton'

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

    function Next() {
        if (password.length<1){
            setShowPasswordEmpty(true)
        }
        if (password!=passwordCheck){
            setShowPasswordMatchErr(true)
        }
        if(password.length>1 &&password==passwordCheck){
            setSlideIndex(slideIndex+1)
        }
        
    }
    function Prev() {
        setSlideIndex(slideIndex-1)
    }
  return (
    <div className='h-full w-full px-[20%]'>
        <div className='flex flex-col justify-center items-center w-full h-full gap-8'>
            <p className='lg:text-2xl text-lg  font-semibold '>Secure Your Account</p>

           

            <div className='flex flex-col gap-2 w-full'>
                <input type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password' className='h-12 placeholder:text-gray-500 rounded-sm p-3 lg:px-5 w-full border-[1px]' /> 
              {showPasswordEmpty&&(
                <p className='text-xs text-red-600'>
                    The password field is empty
                </p>
              )}
              
            </div>


            <div className='flex flex-col gap-2 w-full'>
                <input type='password' value={passwordCheck} onChange={(e)=>{setPasswordCheck(e.target.value)}} placeholder='Confirm Password'className='h-12 placeholder:text-gray-500 rounded-sm p-3 lg:px-5 w-full border-[1px]' />
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
