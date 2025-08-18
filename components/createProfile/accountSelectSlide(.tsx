'use client'
import React, { useState } from 'react'
import NavigationButton from '../NavigationButton'
import IsTalentCard from '../isTalentCard'
import IsClientCard from '../isClientCard'
import { NewUserType } from '@/lib/types'


interface propTypes{
    newUser:NewUserType
    setNewUser:React.Dispatch<React.SetStateAction<NewUserType>>
    setSlideIndex: React.Dispatch<React.SetStateAction<number>>
    slideIndex:number
}




export default function AccountSelectSlide(props:propTypes) {
    const [indexCount,setIndexCount] = useState(1)
    const {setSlideIndex,slideIndex,newUser,setNewUser} = props

    function Next() {
        setSlideIndex(slideIndex+indexCount)   
    }

    function Prev() {
        setSlideIndex(slideIndex-indexCount)
    }

    
  return (
    <div className='h-full w-full px-6 sm:px-[20%] text-xs'>
        <div className='flex flex-col justify-center items-center w-full h-full gap-8'>
            <p className='lg:text-2xl text-lg  font-semibold '>Which best describes you</p>
            
            <div className='w-full flex items-center gap-3 justify-center'>
                <IsTalentCard indexCount = {indexCount} setIndexCount = {setIndexCount} newUser={newUser} setNewUser={setNewUser} />
                <IsClientCard indexCount = {indexCount} setIndexCount = {setIndexCount} newUser={newUser} setNewUser={setNewUser}/>  
            </div>

            
            <div className='flex gap-6'>
                <NavigationButton direction={0} Click={Prev}/>
                <NavigationButton direction={1} Click={Next}/>
            </div>

            
        </div>  
    </div>
  )
}
