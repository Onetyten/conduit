import React from 'react'
import NavigationButton from '../NavigationButton'

interface propTypes{
    setSlideIndex: React.Dispatch<React.SetStateAction<number>>
    city:string
    setCity:React.Dispatch<React.SetStateAction<string>>
    country:string
    setCountry:React.Dispatch<React.SetStateAction<string>>
    state:string
    setState:React.Dispatch<React.SetStateAction<string>>
}




export default function LocationSlide(props:propTypes) {
    const {setSlideIndex,city,setCity,country,setCountry,state,setState} = props

    function Next() {
        setSlideIndex(4)
    }
    function Prev() {
        setSlideIndex(2)
    }
  return (
    <div className='h-full w-full px-[30%]'>
        <div className='flex flex-col justify-center items-center w-full h-full gap-8'>
            <p className='lg:text-2xl text-lg  font-semibold '>Lets Personalise your profile</p>

            <input type='text' value={country} onChange={(e)=>{setCountry(e.target.value)}} placeholder='Country' className='h-12 placeholder:text-gray-500 rounded-sm p-3 lg:px-5 w-full border-[1px]' />

            <input type='text' value={state} onChange={(e)=>{setState(e.target.value)}} placeholder='State' className='h-12 placeholder:text-gray-500 rounded-sm p-3 lg:px-5 w-full border-[1px]' />

            <input type='text' value={city} onChange={(e)=>{setCity(e.target.value)}} placeholder='City' className='h-12 placeholder:text-gray-500 rounded-sm p-3 lg:px-5 w-full border-[1px]' />

            <div className='flex gap-6'>
                <NavigationButton direction={0} Click={Prev}/>
                <NavigationButton direction={1} Click={Next}/>
            </div>
            
            
        </div>  
    </div>
  )
}
