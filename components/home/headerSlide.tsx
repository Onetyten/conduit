"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { profileInterface } from '@/lib/types';
import Link from 'next/link';
import axios from 'axios';



const HeaderSlide = () => {
    const [index, setIndex] = useState(0);
    const [headerProfiles,setHeaderProfiles] = useState<profileInterface[]>([])
    const limit = 10

    async function fetchRandomProfiles (){
        try {
            const response = await axios.get(`/api/profile/fetchProfilesInHead?limit=${limit}`)
            const profiles = await response.data
            setHeaderProfiles(profiles.data)
        } 
        catch (error) {
            console.error(error)
        }        
    }
    useEffect(()=>{
        fetchRandomProfiles()
    },[])

    useEffect(() => {
        const slide = () => {
            setIndex((prevIndex) => (prevIndex < headerProfiles.length - 1 ? prevIndex + 1 : 0));
        };
        const timeout = setTimeout(slide, 3000);

        return () => clearTimeout(timeout); 
    }, [headerProfiles.length, index]); // Depend on index


  return (
    <div className='w-full sm:w-64 h-44 aspect-square py-2 flex cursor-pointer rounded-2xl overflow-hidden flex-col justify-center gap-2.5 p-2 items-center bg-background  shadow-md'>
        <div className=' size-16 relative bg-gray-200 rounded-full overflow-hidden flex justify-center items-center'>
            {headerProfiles[index]?.profilePicture&&(
                <Link href={`/profile/${headerProfiles[index]._id}`}>
                    <Image src={headerProfiles[index]?.profilePicture} fill alt={`${headerProfiles[index]?.firstName.slice(0,2)}`} className='uppercase text-center align-middle object-cover text-xs rounded-full aspect-square'/>
                </Link>
                    
            )}
        </div>
        <p className='text-sm font-semibold'>{headerProfiles[index]?.firstName || "John"}</p>
        <p className='text-sm text-center w-full bg-softblue rounded-sm border-gray-200 py-2.5 capitalize px-3 border'>{headerProfiles[index]?.skills[0].slice(0,32)||"Talent"}</p>

    </div>
  )
}

export default HeaderSlide