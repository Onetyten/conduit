"use client"
import { profileInterface } from '@/lib/types'
import React, { useState } from 'react'
import { format } from 'date-fns'


interface propType{
    profile:profileInterface
}

export default function ProfileBio({profile}:propType) {
    const [showSkill,setShowSkill] = useState(false)
    const creationDate = profile?.createdAt ? new Date(profile.createdAt) : null
    const formattedCreationDate = creationDate && !isNaN(creationDate.getTime()) 
        ? format(creationDate, "MMM d, yyyy") 
        : "Unknown Date"


  return (
     <div className={`flex flex-col ${showSkill?"gap-3":" gap-0 md:gap-3"}`}>
        
        <div className='flex flex-col'>
            {profile?.bio&&<p className='text-lg font-medium text-conduit'>{profile?.bio}</p>}
        </div>

        <div className={`flex-col gap-3 ${showSkill?"flex":" hidden md:flex"}`}>

           {profile?.skills && profile?.skills.length > 0 && (
            <div className='text-sm w-full flex  items-start gap-3'>
                <div className='flex flex-wrap gap-3'> 
                    {profile?.skills.map((item, index:number) => (
                    <span key={index} className='p-1.5 hover:bg-softblue/40 select-none capitalize bg-softblue rounded-md'>{item}</span>
                    ))}
                </div>
                
                </div>
            )}
            
            <div className='w-full flex justify-start sm:justify-end'>
                <p className='text-xs font-normal'>{`${profile?.isTalent?'Talent':'Client'} since ${formattedCreationDate}`}</p>

            </div>
            <p className='text-xs md:hidden block'>{profile.location.state}, {profile.location.country}</p>
        </div>

        {<button onClick={()=>setShowSkill(!showSkill)} className='flex hover:underline md:hidden text-muted'> ...{showSkill?"less":"more"}</button>}
        
    </div>
  )
}
