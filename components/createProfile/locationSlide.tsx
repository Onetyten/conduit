'use client'
import React from 'react'
import NavigationButton from '../NavigationButton'
import { NewUserType } from '@/lib/types'


interface propTypes{
    newUser:NewUserType
    setNewUser:React.Dispatch<React.SetStateAction<NewUserType>>
    setSlideIndex: React.Dispatch<React.SetStateAction<number>>
    slideIndex:number
}

export default function LocationSlide(props:propTypes) {
    const {setSlideIndex,slideIndex,newUser,setNewUser} = props

    function Next() {
        setSlideIndex(slideIndex+1)
        
    }
    function Prev() {
        setSlideIndex(slideIndex-1)
    }
  return (
    <div className='h-full w-full px-6 sm:px-[20%] text-xs'>
        <div className='flex flex-col justify-center items-center w-full h-full gap-8'>
            <p className='lg:text-2xl text-lg  font-semibold text-center '>Lets Personalise your profile</p>


            <div className='flex flex-col gap-2 w-full'>
                <input type='text' value={newUser.location.country} onChange={(e)=>{setNewUser(prev=>({...prev, location:{...prev.location,country:e.target.value} }))}} placeholder='Country' className='h-12 placeholder:text-gray-500 rounded-sm p-3 lg:px-5 w-full border-[1px]' />
              
            </div>


            <div className='flex flex-col gap-2 w-full'>
            <input type='text' value={newUser.location.state}  onChange={(e)=>{setNewUser(prev=>({...prev, location:{...prev.location,state:e.target.value} }))}}  placeholder='State' className='h-12 placeholder:text-gray-500 rounded-sm p-3 lg:px-5 w-full border-[1px]' />
            </div>


            <div className='flex flex-col gap-2 w-full'>
                <input type='text' value={newUser.location.district}  onChange={(e)=>{setNewUser(prev=>({...prev, location:{...prev.location,district:e.target.value} }))}}  placeholder='District' className='h-12 placeholder:text-gray-500 rounded-sm p-3 lg:px-5 w-full border-[1px]' />
            </div>

            
            <div className='flex gap-6'>
                <NavigationButton direction={0} Click={Prev}/>
                <NavigationButton direction={1} Click={Next}/>
            </div>

            <div>
                <p className='text-gray-500'>
                    (Optional)
                </p>
            </div>
            
            
        </div>  
    </div>
  )
}
