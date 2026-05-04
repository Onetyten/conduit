'use client'
import React, { useState } from 'react'
import NavigationButton from './NavigationButton'
import { becomeTalentType, NewUserType } from '@/lib/types'


interface propTypes<T extends NewUserType | becomeTalentType >{
    newUser:T
    setNewUser:React.Dispatch<React.SetStateAction<T>>
    setSlideIndex: React.Dispatch<React.SetStateAction<number>>
    slideIndex:number
}

export default function LocationSlide<T extends NewUserType | becomeTalentType>(props:propTypes<T>) {
    const {setSlideIndex,slideIndex,newUser,setNewUser} = props
    const slideJump = 3
    const isNewUser = "firstname" in newUser

    const [showCountryErr,setShowCountryErr] = useState(false)
    const [showStateErr,setShowStateErr] = useState(false)
    const [showDistrictErr, setShowDistrictErr] = useState(false)

    function Next() {
        setShowCountryErr(false)
        setShowStateErr(false)
        setShowDistrictErr(false)

        if (newUser.isTalent || !isNewUser){
            if (newUser.location.country.trim().length<1){ setShowCountryErr(true); return}
            if (newUser.location.state.trim().length<1){; setShowStateErr(true); return}
            if (newUser.location.district.trim().length<1){ setShowDistrictErr(true); return}
            setSlideIndex(slideIndex+1)
            return
        }
        if (isNewUser){
            setSlideIndex(slideIndex+slideJump)
        }
        else{
            setSlideIndex(slideIndex+1)
        }
    }


    function Prev() {
        setSlideIndex(slideIndex-1)
    }

  return (
    <div className={`h-full w-full ${isNewUser?"px-6 sm:px-[20%]":""} text-base`}>
        <div className={`flex flex-col justify-center ${isNewUser?"gap-5":"gap-1"} items-center w-full h-full `}>
            {isNewUser && 
                <p className='lg:text-2xl text-xl  font-semibold text-center '>Lets Personalise your profile</p>
            }

            <div className='flex flex-col gap-1 w-full'>
                <input type='text' value={newUser.location.country} onChange={(e)=>{setNewUser(prev=>({...prev, location:{...prev.location,country:e.target.value} }))}} placeholder='Country' className='h-12 placeholder:text-gray-500 rounded-sm p-3 lg:px-5 w-full border border-conduit/40' />

                <p className={`text-xs ${showCountryErr?"opacity-100":"opacity-0"} duration-300 text-red-600`}>
                    Country is required
                </p>
              
            </div>


            <div className='flex flex-col gap-1 w-full'>
                <input type='text' value={newUser.location.state}  onChange={(e)=>{setNewUser(prev=>({...prev, location:{...prev.location,state:e.target.value} }))}}  placeholder='State' className='h-12 placeholder:text-gray-500 rounded-sm p-3 lg:px-5 w-full border border-conduit/40' />

                <p className={`text-xs ${showStateErr?"opacity-100":"opacity-0"} duration-300 text-red-600`}>
                    State is required
                </p>
            </div>


            <div className='flex flex-col gap-1 w-full'>
                <input type='text' value={newUser.location.district}  onChange={(e)=>{setNewUser(prev=>({...prev, location:{...prev.location,district:e.target.value} }))}}  placeholder='District' className='h-12 placeholder:text-gray-500 rounded-sm p-3 lg:px-5 w-full border border-conduit/40' />

                <p className={`text-xs ${showDistrictErr?"opacity-100":"opacity-0"} duration-300 text-red-600`}>
                    District is required
                </p>
            </div>

            
            <div className='flex w-full gap-2'>
                <NavigationButton direction={0} Click={Prev}/>
                <NavigationButton direction={1} Click={Next}/>
            </div>

            <div>
                <p className='text-muted text-sm'>
                    {newUser.isTalent==false&& isNewUser && "(Optional)"}
                </p>
            </div>
            
            
        </div>  
    </div>
  )
}
