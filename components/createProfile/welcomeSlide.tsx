"use client"
import React,{useState} from 'react'
import NavigationButton from '../NavigationButton'
import { NewUserType } from '@/lib/types'


interface propTypes{
    newUser:NewUserType
    setNewUser:React.Dispatch<React.SetStateAction<NewUserType>>
    setSlideIndex: React.Dispatch<React.SetStateAction<number>>
    slideIndex:number
}



export default function WelcomeSlide(props:propTypes) {
    const {newUser,setNewUser,setSlideIndex,slideIndex} = props
    const [showEmailErr,setShowEmailErr] = useState(false)
    const [showFirstNameErr,setShowFirstNameErr] = useState(false)
    const [showLastNameErr,setShowLastNameErr] = useState(false)

    function Next() {
         setShowEmailErr(false)
         setShowFirstNameErr(false)
         setShowLastNameErr(false)

        if (newUser.email.trim().length<1){
            setShowEmailErr(true)
            return
        }
        if (newUser.firstname.trim().length<1){
            setShowFirstNameErr(true)
            return
        }
        if (newUser.lastname.trim().length<1){
            setShowLastNameErr(true)
            return
        }
        
        if (newUser.email.trim().length>0 && newUser.firstname.trim().length>0&&newUser.lastname.trim().length>0){
            setSlideIndex(slideIndex+1)
        }
    }
    
    
  return (
    <div className='h-full w-full px-6 sm:px-[20%] text-base'>
        <div className='flex flex-col justify-center items-center w-full h-full gap-2'>
            <p className='lg:text-2xl text-xl  font-semibold text-conduit mb-6'>Welcome to conduit</p>

            <div className='flex flex-col gap-1 w-full'>
              <input type='email' required value={newUser.email} onChange={(e)=>{setNewUser(prev=>({...prev, email:e.target.value }))}} placeholder='example@email.com' className='h-12 placeholder:text-gray-500 rounded-sm p-3 lg:px-5 w-full border border-conduit/40' /> 
           
            <p className={`text-xs ${showEmailErr?"opacity-100":"opacity-0"} duration-300 text-red-600`}>
                Email is required
            </p>
            
              
            </div>
            
            <div className='flex flex-col gap-1 w-full'>
                <input type='text' required value={newUser.firstname} onChange={(e)=>{setNewUser(prev=>({...prev, firstname:e.target.value }))}} placeholder='First Name' className='h-12 placeholder:text-gray-500 rounded-sm p-3 lg:px-5 w-full border border-conduit/40' />
                
                <p className={`text-xs ${showFirstNameErr?"opacity-100":"opacity-0"} duration-300 text-red-600`}>
                    First name is required
                </p>
                
                
            </div>
            
            <div className='flex flex-col gap-1 w-full'>
               <input type='text' required value={newUser.lastname} onChange={(e)=>{setNewUser(prev=>({...prev, lastname:e.target.value }))}} placeholder='Last Name' className='h-12 placeholder:text-gray-500 rounded-sm p-3 lg:px-5 w-full border border-conduit/40' /> 
              
                <p className={`text-xs ${showLastNameErr?"opacity-100":"opacity-0"} duration-300 text-red-600`}>
                    Last name is required
                </p>
        
                
            </div>
            
            <div className='flex mt-6 gap-6'>
                <NavigationButton direction={1} Click={Next}/>
            </div>
            
            
        </div>  
    </div>
  )
}
