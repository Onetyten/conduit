'use client'
import React, { useState } from 'react'
import NavigationButton from '../NavigationButton'
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill,RiTwitterXFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
import { NewUserType } from '@/lib/types';
import { FiUser } from "react-icons/fi";
import { toast } from 'react-toastify';



interface propTypes{
    setSlideIndex: React.Dispatch<React.SetStateAction<number>>
    slideIndex:number
    newUser:NewUserType 
    setNewUser:React.Dispatch<React.SetStateAction<NewUserType>>
}


export default function LinkSlide(props:propTypes) {
    const {setSlideIndex,slideIndex,newUser,setNewUser} = props
    const [linkIndex,setLinkIndex] = useState(0)
    const links = [
        { name: "Facebook", key: "facebook", icon: <FaFacebook size={20} /> },
        { name: "Instagram", key: "instagram", icon: <RiInstagramFill size={20} /> },
        { name: "LinkedIn", key: "linkedin", icon: <FaLinkedin size={20} /> },
        { name: "X", key: "twitter_x", icon: <RiTwitterXFill size={20} /> },
        { name: "Other", key: "other", icon: <FiUser size={20} /> },
    ];

    function Next() {
        const { socialLinks } = newUser;
        // Regex patterns for each platform
        const regexPatterns: Record<string, RegExp> = {
            facebook: /^https?:\/\/(www\.)?facebook\.com\/.+\/?/,
            instagram: /^https?:\/\/(www\.)?instagram\.com\/.+\/?/,
            linkedin: /^https?:\/\/(www\.)?linkedin\.com\/in\/.+\/?/,
            twitter_x: /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/.+\/?/,
            other: /^https?:\/\/[^\s$.?#].[^\s]*$/ 
        };

        const hasLink = Object.values(socialLinks).some(link => link.trim() !== "");
        if (!hasLink) {
            return toast.warn("Please add at least one social link to continue.");
        }

        // Validate provided links
        for (const key in socialLinks) {
            const value = socialLinks[key as keyof typeof socialLinks];
            if (value.trim() !== "") {
                const regex = regexPatterns[key];
                if (!regex.test(value)) {
                    return toast.warn(`Please enter a valid ${key} link.`);
                }
            }
        }
        setSlideIndex(slideIndex + 1);
    }

    function Prev() {
        setSlideIndex(slideIndex-1)
    }
  return (
    <div className='h-full w-full px-6 sm:px-[20%] text-xs'>
        <div className='flex flex-col justify-center items-center w-full h-full gap-8'>
            <p className='lg:text-2xl text-lg  font-semibold text-center '>Add Social Links</p>

            <div className='flex w-full justify-between items-center gap-1'>
                {links.map((item,index)=>{
                    return(
                        <div onClick={()=>{setLinkIndex(index)}} key={index} className={`flex-1 sm:px-1 flex justify-center ${linkIndex==index?"bg-black text-white ":""}  items-center border-[1px] border-black h-11 rounded-md`}>
                            {item.icon}
                        </div>
                    )
                })}
            </div>


            <div className='w-full flex relative justify-center items-center gap-2 text-sm font-semibold'>
                {/* <p className='absolute left-5 '>
                    {links[linkIndex].name}
                </p> */}
                <input type="text" value={newUser.socialLinks[links[linkIndex].key as keyof typeof newUser.socialLinks]} 
                onChange={(e) => setNewUser((prev) => ({...prev, socialLinks: { ...prev.socialLinks, [links[linkIndex].key]: e.target.value,}}))}
                placeholder={`Enter your ${links[linkIndex].name} link`} className="h-full placeholder:text-gray-500 font-normal rounded-sm p-3 w-full border-[1px]" />
            </div>

            
            <div className='flex gap-6'>
                <NavigationButton direction={0} Click={Prev}/>
                <NavigationButton direction={1} Click={Next}/>
            </div>
            
        </div>  
    </div>
  )
}
