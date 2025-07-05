'use client'
import React from 'react'
import NavigationButton from '../NavigationButton'

interface propTypes{
    setSlideIndex: React.Dispatch<React.SetStateAction<number>>
    district:string
    setDistrict:React.Dispatch<React.SetStateAction<string>>
    country:string
    setCountry:React.Dispatch<React.SetStateAction<string>>
    state:string
    setState:React.Dispatch<React.SetStateAction<string>>
    slideIndex:number
}




export default function LocationSlide(props:propTypes) {
    const {setSlideIndex,country,setCountry,state,setState,district,setDistrict,slideIndex} = props

    function Next() {
        console.log(country,state,district)
        setSlideIndex(slideIndex+1)
        
    }
    function Prev() {
        setSlideIndex(slideIndex-1)
    }
  return (
    <div className='h-full w-full px-6 sm:px-[20%] text-xs'>
        <div className='flex flex-col justify-center items-center w-full h-full gap-8'>
            <p className='lg:text-2xl text-lg  font-semibold '>Lets Personalise your profile</p>


            <div className='flex flex-col gap-2 w-full'>
                <input type='text' value={country} onChange={(e)=>{setCountry(e.target.value)}} placeholder='Country' className='h-12 placeholder:text-gray-500 rounded-sm p-3 lg:px-5 w-full border-[1px]' />
              
            </div>


            <div className='flex flex-col gap-2 w-full'>
            <input type='text' value={state} onChange={(e)=>{setState(e.target.value)}} placeholder='State' className='h-12 placeholder:text-gray-500 rounded-sm p-3 lg:px-5 w-full border-[1px]' />
            </div>


            <div className='flex flex-col gap-2 w-full'>
                <input type='text' value={district} onChange={(e)=>{setDistrict(e.target.value)}} placeholder='District' className='h-12 placeholder:text-gray-500 rounded-sm p-3 lg:px-5 w-full border-[1px]' />
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
