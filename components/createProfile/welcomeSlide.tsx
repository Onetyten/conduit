"use client"
import React,{useState} from 'react'
import NavigationButton from '../NavigationButton'


interface propTypes{
    email:string
    setEmail:React.Dispatch<React.SetStateAction<string>>
    firstname:string
    setFirstname:React.Dispatch<React.SetStateAction<string>>
    lastname:string
    setLastname:React.Dispatch<React.SetStateAction<string>>
    setSlideIndex: React.Dispatch<React.SetStateAction<number>>
    slideIndex:number
}






export default function WelcomeSlide(props:propTypes) {
    const {email,setEmail,firstname,setFirstname,lastname,setLastname,setSlideIndex,slideIndex} = props
    const [showEmailErr,setShowEmailErr] = useState(false)
    const [showFirstNameErr,setShowFirstNameErr] = useState(false)
    const [showLastNameErr,setShowLastNameErr] = useState(false)

    function Next() {
        if (email.trim().length<1){
            setShowEmailErr(true)
        }
        if (firstname.trim().length<1){
            setShowFirstNameErr(true)
        }
        if (lastname.trim().length<1){
            setShowLastNameErr(true)
        }
        
        if (email.trim().length>0 && firstname.trim().length>0&&lastname.trim().length>0){
            setSlideIndex(slideIndex+1)
        }

    
        
    }
    
    
  return (
    <div className='h-full w-full px-6 sm:px-[20%] text-xs'>
        <div className='flex flex-col justify-center items-center w-full h-full gap-8'>
            <p className='lg:text-2xl text-lg  font-semibold text-conduit'>Welcome to conduit 👋</p>

            <div className='flex flex-col gap-2 w-full'>
              <input type='email' value={email} onChange={(e)=>{setEmail(e.target.value.toLowerCase())}} placeholder='example@email.com' className='h-12 placeholder:text-gray-500 rounded-sm p-3 lg:px-5 w-full border-[1px]' /> 
              {showEmailErr&&(
                <p className='text-xs text-red-600'>
                    Email is required
                </p>
              )}
              
            </div>
            
            <div className='flex flex-col gap-2 w-full'>
                <input type='text' value={firstname} onChange={(e)=>{setFirstname(e.target.value)}} placeholder='First Name' className='h-12 placeholder:text-gray-500 rounded-sm p-3 lg:px-5 w-full border-[1px]' />
                {showFirstNameErr&&(
                    <p className='text-xs text-red-600'>
                        First name is required
                    </p>
                )}
                
            </div>
            
            <div className='flex flex-col gap-2 w-full'>
               <input type='text' value={lastname} onChange={(e)=>{setLastname(e.target.value)}} placeholder='Last Name' className='h-12 placeholder:text-gray-500 rounded-sm p-3 lg:px-5 w-full border-[1px]' /> 
               {showLastNameErr&&(
                    <p className='text-xs text-red-600'>
                        Last name is required
                    </p>
                )}
                
            </div>
            
            <div className='flex gap-6'>
                <NavigationButton direction={1} Click={Next}/>
            </div>
            
            
        </div>  
    </div>
  )
}
