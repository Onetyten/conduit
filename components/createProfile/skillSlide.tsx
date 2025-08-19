'use client'
import React, { useState } from 'react'
import NavigationButton from '../NavigationButton'
import { IoCloseOutline } from "react-icons/io5";
import { NewUserType } from '@/lib/types'
import { toast } from 'react-toastify';
import { CiCirclePlus } from "react-icons/ci";


interface propTypes{
    newUser:NewUserType
    setNewUser:React.Dispatch<React.SetStateAction<NewUserType>>
    setSlideIndex: React.Dispatch<React.SetStateAction<number>>
    slideIndex:number
    isUser:boolean
}




export default function SkillSlide(props:propTypes) {
    const {setSlideIndex,slideIndex,newUser,setNewUser,isUser} = props
    const [newSkill,setNewSkill] = useState('')

    function Next() {
        if(newUser.bio.trim().length<20) return toast.warn("Please provide a bio with at least 20 characters.")
        if(newUser.skills.length==0) return toast.warn("Please add at least one skill to continue.")
        setSlideIndex(slideIndex+1)
        
    }
    function Prev() {
        setSlideIndex(slideIndex-1)
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

    function RemoveSkill(index:number){
        setNewUser(prev => ({...prev, skills :prev.skills.filter( (_, i) => i !== index )   }))
    }



  return (
    <div className='h-full w-full px-6 md:px-[20%] text-xs'>
        <div className='flex flex-col justify-center items-center w-full h-full gap-8 sm:gap-4 md:gap-6'>
            <p className='lg:text-2xl text-lg  font-semibold '>Who are you</p>


            <div className='flex flex-col gap-2 w-full'>
                <p className='text-sm font-semibold'>
                    Bio
                </p>
                <textarea onChange={(e)=>{setNewUser(prev=>({...prev, bio:e.target.value }))}} value={newUser.bio} className='border-[1px] p-2 rounded-md min-h-16 h-12 max-h-16  md:h-28 md:max-h-28'/>

              
            </div>


            <div className='flex flex-col relative gap-2 w-full'>
                <p className='text-sm font-semibold'>
                    Skills
                </p>
                <div className='w-full h-12 relative '>
                  <input onChange={(e)=>{setNewSkill(e.target.value)}} value={newSkill} type='text' className='h-full placeholder:text-gray-500 rounded-sm p-3 lg:px-5 w-full border-[1px]' />  
                  <CiCirclePlus size={30} onClick={AddSkill} className='absolute cursor-pointer right-2 top-1/2 -translate-y-1/2' />
                </div>
                 
                 <p className='absolute -bottom-5 right-0'>
                    {newUser.skills.length}/5 skill
                 </p>

                 <div className='w-full flex flex-wrap gap-2  '>
                    {newUser.skills.map((item,index)=>{
                        return(
                        <div key={index} className='p-1 px-3 flex items-center gap-1 rounded-full bg-softblue'>
                            <p>
                                {item}
                            </p>
                            <IoCloseOutline size={17} onClick={()=>{RemoveSkill(index)}} className='cursor-pointer' />
                        </div>
                        )
                    })}

                 </div>
            </div>



            
            <div className='flex gap-6'>
                {!isUser&&<NavigationButton direction={0} Click={Prev}/>}
                
                <NavigationButton direction={1} Click={Next}/>
            </div>

            
            
        </div>  
    </div>
  )
}
