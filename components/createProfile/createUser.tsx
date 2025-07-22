import React from 'react'
import NavigationButton from '../NavigationButton'

interface propTypes{
    setSlideIndex: React.Dispatch<React.SetStateAction<number>>
    slideIndex:number
}





export default function CreateUser(props:propTypes) {
    const {setSlideIndex,slideIndex} = props

    function Prev() {
        setSlideIndex(slideIndex-1)
    }

    
  return (
    <div className='h-full w-full px-[10%]'>
        <div className='flex flex-col justify-center items-center w-full h-full gap-8'>
            <p className='lg:text-2xl text-lg  font-semibold '>Create your conduit profile</p>
            <button  type='submit'  className='text-sm sm:text-base rounded-lg bg-foreground text-background hover:bg-conduit p-2 px-8'>
                    Create Profile
            </button>
            <div className='flex gap-6'>
                <NavigationButton direction={0} Click={Prev}/>
            </div>
            
            
        </div>  
    </div>
  )
}
