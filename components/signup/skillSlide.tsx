'use client'
import React, { useState } from 'react'
import NavigationButton from './NavigationButton'
import { IoCloseOutline } from "react-icons/io5";
import { becomeTalentType, NewUserType } from '@/lib/types'
import { toast } from 'react-toastify';
import { CiCirclePlus } from "react-icons/ci";
import { countryCodes } from '@/data/countryCodes';


interface propTypes<T extends NewUserType | becomeTalentType>{
    newUser:T
    setNewUser:React.Dispatch<React.SetStateAction<T>>
    setSlideIndex: React.Dispatch<React.SetStateAction<number>>
    slideIndex:number
}



export default function SkillSlide<T extends NewUserType | becomeTalentType>(props:propTypes<T>) {
    const {setSlideIndex,slideIndex,newUser,setNewUser} = props
    const [newSkill,setNewSkill] = useState('')
    const isNewUser = "firstname" in newUser

    function Next() {
        if(newUser.bio.trim().length<8) return toast.warn("Please provide a bio with at least 20 characters.")
        if (!isNewUser){

            if (newUser.phoneNumber.num.trim().length < 1) return toast.warn("Phone number is required")
        }

        if(newUser.skills.length==0) return toast.warn("Please add at least one skill to continue.")

        setSlideIndex(slideIndex+1)   
    }

    function AddSkill(){
        if (newSkill.trim().length<3)
        return toast.warn("Skills must be at least 3 characters long.")
        if (newSkill.trim().length>20)
        return toast.warn("Skills must be at most 20 characters long.")
        if (newUser.skills.length>=5) return toast.warn("Skill limit exceeded.")
        if (newUser.skills.includes(newSkill))
        return toast.warn("This skill has already been added.")
        setNewUser(prev => ({...prev, skills : [...(prev.skills || []) ,newSkill ]   }))
        setNewSkill('')
    }




    function Prev() {
        setSlideIndex(slideIndex-1)
    }

    function RemoveSkill(index:number){
        setNewUser(prev => ({...prev, skills :prev.skills.filter( (_, i) => i !== index )   }))
    }


  return (
    <div className={`h-full w-full ${isNewUser?"px-6 sm:px-[20%]":""} text-base`}>
        <div className='flex flex-col justify-center items-center w-full h-full gap-4'>
            {isNewUser && <p className='lg:text-2xl text-xl  font-semibold '>Who are you</p> }

            <div className='flex flex-col gap-2 w-full'>
                <p className='text-sm font-semibold'>
                    Bio
                </p>
                <textarea onChange={(e)=>{setNewUser(prev=>({...prev, bio:e.target.value }))}} value={newUser.bio} className='border border-conduit/40 p-2 rounded-md min-h-16 h-12 max-h-16  md:h-28 md:max-h-28'/>

              
            </div>

            {!isNewUser && (
            <div className='flex flex-col gap-1 w-full'>
                <div className='flex h-12 gap-3 w-full  rounded-sm overflow-hidden'>
                
                    <select value={newUser.phoneNumber.code} onChange={(e) => setNewUser(prev => ({ ...prev, phoneNumber: { ...prev.phoneNumber, code: e.target.value } }))} className='h-full border border-conduit/40 rounded-sm px-2 outline-none cursor-pointer'>
                        {[...countryCodes].sort((a, b) => a.country === 'Nigeria' ? -1 : b.country === 'Nigeria' ? 1 : 0).map((country) => (
                                <option key={country.iso} value={`+${country.code}`}>
                                    {country.iso} +{country.code}
                                </option>
                            ))
                        }
                    </select>

                
                    <input type='tel' required value={newUser.phoneNumber.num}
                        onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '')
                            setNewUser(prev => ({ ...prev, phoneNumber: { ...prev.phoneNumber, num: val } }))
                        }}
                        placeholder='Phone number'
                        className='flex-1 h-full placeholder:text-gray-500 p-3 border border-conduit/40 rounded-sm lg:px-5 outline-none'
                    />
                </div>
            </div>
            )}


            <div  className='flex flex-col relative gap-2 w-full'>
                <p className='text-sm font-semibold'>
                    Services
                </p>
                <form
                    onSubmit={(e)=>{
                        e.preventDefault()
                        AddSkill()
                    }
                }
                className='w-full h-12 relative '>
                  <input onChange={(e)=>{setNewSkill(e.target.value)}} value={newSkill} type='text' className='h-full placeholder:text-gray-500 rounded-sm p-3 lg:px-5 w-full border border-conduit/40' />  
                  <button type='submit'>
                    <CiCirclePlus size={30} className='absolute cursor-pointer right-2 top-1/2 -translate-y-1/2' />
                  </button>
                  
                </form>
                 
                 <p className='absolute -bottom-5 text-sm right-0'>
                    {newUser.skills.length}/5 services
                 </p>

                 <div className='w-full flex flex-wrap gap-2  '>
                    {newUser.skills.map((item,index)=>{
                        return(
                        <div key={index} className='p-1 px-3 text-sm flex items-center gap-1 rounded-full bg-softblue'>
                            <p>
                                {item}
                            </p>
                            <IoCloseOutline size={17} onClick={()=>{RemoveSkill(index)}} className='cursor-pointer' />
                        </div>
                        )
                    })}

                 </div>
            </div>

            
            <div className='flex gap-2 w-full mt-6'>
                {isNewUser &&  <NavigationButton direction={0} Click={Prev}/> }
                <NavigationButton direction={1} Click={Next}/>
            </div>

            
            
        </div>  
    </div>
  )
}
