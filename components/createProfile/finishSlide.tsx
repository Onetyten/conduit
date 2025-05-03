import React from 'react'
import NavigationButton from '../NavigationButton'
import {signUpFalse} from '@/state/showSignUp/showSignUp'
import { useDispatch } from 'react-redux';

interface propTypes{
    setSlideIndex: React.Dispatch<React.SetStateAction<number>>
}




export default function FinishSlide(props:propTypes) {
    const dispatch = useDispatch()
    const {setSlideIndex} = props

    function Prev() {
        setSlideIndex(3)
    }
  return (
    <div className='h-full w-full px-[10%]'>
        <div className='flex flex-col justify-center items-center w-full h-full gap-8'>
            <p className='lg:text-2xl text-lg  font-semibold '>All Done 🎉</p>
            <p>You have successfully created a conduit profile</p>
            <p>Welcome</p>


            <div className='flex gap-6'>
                <NavigationButton direction={0} Click={Prev}/>
                <button  onClick={()=>{dispatch(signUpFalse())}}  className='rounded-lg bg-blue-100 hover:bg-blue-200 p-2'>
                    Continue
                </button>
            </div>
            
            
        </div>  
    </div>
  )
}
