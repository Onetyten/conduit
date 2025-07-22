"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const headerDetails = [
    {
        name:"Chidi Okafo",
        profession:"Plumber",
        profileImg :"https://t3.ftcdn.net/jpg/03/97/01/50/360_F_397015069_YvoHexqYAKLGdeKNZktvjchm7bkQEsMc.jpg",
    },
    {
        name:"Aisha Kani",
        profession:"Salon",
        profileImg :"https://cdn.pixabay.com/photo/2023/07/30/09/12/red-hair-girl-8158373_1280.jpg",
    },
    {
        name:"Tobi Adeba",
        profession:"Personal trainer",
        profileImg :"https://cdn.pixabay.com/photo/2020/01/20/17/30/look-4780865_1280.jpg",
    },
    {
        name:"Ese Osagie",
        profession:"Cleaner",
        profileImg :"https://cdn.pixabay.com/photo/2018/10/11/15/35/angry-boy-3740043_1280.jpg",
    },
    {
        name:"Alex Musa",
        profession:"Electrician",
        profileImg :"https://cdn.pixabay.com/photo/2021/05/09/12/58/fashion-6240876_1280.jpg",
    },
]




const HeaderSlide = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const slide = () => {
            setIndex((prevIndex) => (prevIndex < headerDetails.length - 1 ? prevIndex + 1 : 0));
        };
        const timeout = setTimeout(slide, 2000);

        return () => clearTimeout(timeout); // Clean up previous timeout
    }, [index]); // Depend on index


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
                <Image src={headerDetails[index]?.profileImg} width={50} height={70} alt='profile image' className='object-cover text-xs rounded-full aspect-square'/>
                <p className='text-xs font-semibold'>{headerDetails[index].name}</p>
                <p className='text-xs bg-gray-100 border-gray-200 py-1 px-3 border-[1px]'>{headerDetails[index].profession}</p>

            </div>
        </div>
    </div>
  )
}

export default HeaderSlide