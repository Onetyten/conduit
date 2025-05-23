import React, { useState } from 'react'
import NavigationButton from '../NavigationButton'

interface propTypes{
    setSlideIndex: React.Dispatch<React.SetStateAction<number>>
    city:string
    setCity:React.Dispatch<React.SetStateAction<string>>
    country:string
    setCountry:React.Dispatch<React.SetStateAction<string>>
    state:string
    setState:React.Dispatch<React.SetStateAction<string>>
    slideIndex:number
}




export default function LocationSlide(props:propTypes) {
    const {setSlideIndex,city,setCity,country,setCountry,state,setState,slideIndex} = props
    const [showCountryErr,setShowCountryErr] = useState(false)
    const [showStateErr,setShowStateErr] = useState(false)
    const [showCityErr,setShowCityErr] = useState(false)

    function Next() {
        if (country.length<1){
            setShowCountryErr(true)
        }
        if (state.length<1){
            setShowStateErr(true)
        }
        if (city.length<1){
            setShowCityErr(true)
        }
        
        if(city.length>1 && country.length>1 && state.length>1){
            setSlideIndex(slideIndex+1)
        }
        
    }
    function Prev() {
        setSlideIndex(slideIndex-1)
    }
  return (
    <div className='h-full w-full px-[30%]'>
        <div className='flex flex-col justify-center items-center w-full h-full gap-8'>
            <p className='lg:text-2xl text-lg  font-semibold '>Lets Personalise your profile</p>


            <div className='flex flex-col gap-2 w-full'>
                <input type='text' value={country} onChange={(e)=>{setCountry(e.target.value)}} placeholder='Country' className='h-12 placeholder:text-gray-500 rounded-sm p-3 lg:px-5 w-full border-[1px]' />
              {showCountryErr&&(
                <p className='text-xs text-red-600'>
                    This field is empty
                </p>
              )}
              
            </div>


            <div className='flex flex-col gap-2 w-full'>
            <input type='text' value={state} onChange={(e)=>{setState(e.target.value)}} placeholder='State' className='h-12 placeholder:text-gray-500 rounded-sm p-3 lg:px-5 w-full border-[1px]' />
              {showStateErr&&(
                <p className='text-xs text-red-600'>
                    This field is empty
                </p>
              )}
              
            </div>


            <div className='flex flex-col gap-2 w-full'>
            <input type='text' value={city} onChange={(e)=>{setCity(e.target.value)}} placeholder='City' className='h-12 placeholder:text-gray-500 rounded-sm p-3 lg:px-5 w-full border-[1px]' />
              {showCityErr&&(
                <p className='text-xs text-red-600'>
                    This field is empty
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
