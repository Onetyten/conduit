import React from 'react'
import NavigationButton from '../NavigationButton'


interface propTypes{
    email:string
    setEmail:React.Dispatch<React.SetStateAction<string>>
    firstname:string
    setFirstname:React.Dispatch<React.SetStateAction<string>>
    lastname:string
    setLastname:React.Dispatch<React.SetStateAction<string>>
    setSlideIndex: React.Dispatch<React.SetStateAction<number>>
}






export default function WelcomeSlide(props:propTypes) {
    const {email,setEmail,firstname,setFirstname,lastname,setLastname,setSlideIndex} = props
    function Next() {
        setSlideIndex(1)
    }
    
  return (
    <div className='h-full w-full px-[20%]'>
        <div className='flex flex-col justify-center items-center w-full h-full gap-8'>
            <p className='lg:text-2xl text-lg  font-semibold '>Welcome to conduit 👋</p>

            <input type='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='example@email.com' className='h-12 placeholder:text-gray-500 rounded-sm p-3 lg:px-5 w-full border-[1px]' />

            <input type='text' value={firstname} onChange={(e)=>{setFirstname(e.target.value)}} placeholder='First Name' className='h-12 placeholder:text-gray-500 rounded-sm p-3 lg:px-5 w-full border-[1px]' />

            <input type='text' value={lastname} onChange={(e)=>{setLastname(e.target.value)}} placeholder='Last Name' className='h-12 placeholder:text-gray-500 rounded-sm p-3 lg:px-5 w-full border-[1px]' />
            <div className='flex gap-6'>
                <NavigationButton direction={1} Click={Next}/>
            </div>
            
            
        </div>  
    </div>
  )
}
