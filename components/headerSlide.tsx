"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { profileInterface } from '@/lib/types';
import Link from 'next/link';



const HeaderSlide = () => {
    const [index, setIndex] = useState(0);
    const [headerProfiles,setHeaderProfiles] = useState<profileInterface[]>([])
    const limit = 10

    async function fetchRandomProfiles (){
        try {
            const response = await fetch(`/api/fetchProfilesInHead?limit=${limit}`)
            if (!response.ok){
                return console.log("Failed to fetch header profile")
            }
            const profiles = await response.json()
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
    <div className='w-full flex justify-center sm:mb-0 mb-8 text-xs '>
        <div className=' w-full px-6 sm:w-[85%] relative'>
            <div className='overflow-hidden rounded-2xl w-full aspect-video'>
                <video autoPlay muted loop className='object-cover w-full h-full'>
                    <source src='/video/serviceVid.mp4' type='video/mp4' />
                    Your browser does not support the video tag.
                </video>
            </div>



            <div className='min-w-32 h-32 md:flex cursor-pointer sm:hidden rounded-2xl overflow-hidden flex flex-col justify-between p-2 items-center bg-background absolute right-1/2 -bottom-12 translate-x-1/2  sm:-right-0 sm:top-1/2 sm:-translate-y-1/2 shadow-md'>
                <div className='w-12 h-12 relative bg-gray-200 rounded-full overflow-hidden flex justify-center items-center'>
                    {headerProfiles[index]?.profilePicture&&(
                        <Link href={`/profile/${headerProfiles[index]._id}`}>
                            <Image src={headerProfiles[index]?.profilePicture} fill alt={`${headerProfiles[index]?.firstName.slice(0,2)}`} className='uppercase text-center align-middle object-cover text-xs rounded-full aspect-square'/>
                        </Link>
                         
                    )}
                </div>
                <p className='text-xs font-semibold'>{headerProfiles[index]?.firstName || "John"}</p>
                <p className='text-xs bg-gray-100 border-gray-200 py-1 capitalize px-3 border-[1px]'>{headerProfiles[index]?.skills[0].slice(0,20)||"Talent"}</p>

            </div>
        </div>
    </div>
  )
}

export default HeaderSlide