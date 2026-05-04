'use client'
import React, { useState } from 'react'
import NavigationButton from './NavigationButton'
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill,RiTwitterXFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
import { becomeTalentType, NewUserType } from '@/lib/types';
import { FiUser } from "react-icons/fi";
import { toast } from 'react-toastify';



interface propTypes<T extends NewUserType | becomeTalentType>{
    setSlideIndex: React.Dispatch<React.SetStateAction<number>>
    slideIndex:number
    newUser:T
    setNewUser:React.Dispatch<React.SetStateAction<T>>
}


export default function LinkSlide<T extends NewUserType | becomeTalentType>(props:propTypes<T>) {
    const {setSlideIndex,slideIndex,newUser,setNewUser} = props
    const [linkIndex,setLinkIndex] = useState(0)
    const links = [
        { name: "Facebook", key: "facebook", icon: <FaFacebook size={20} /> },
        { name: "Instagram", key: "instagram", icon: <RiInstagramFill size={20} /> },
        { name: "LinkedIn", key: "linkedin", icon: <FaLinkedin size={20} /> },
        { name: "X", key: "twitter_x", icon: <RiTwitterXFill size={20} /> },
        { name: "Other", key: "other", icon: <FiUser size={20} /> },
    ];

    const isNewUser = "firstname" in newUser

    function Next() {
        const { socialLinks } = newUser;

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
    <div className={`h-full w-full ${isNewUser?"px-6 sm:px-[20%]":""} text-base`}>
        <div className={`flex flex-col justify-center items-center w-full h-full ${isNewUser?"gap-8":"gap-5"} `}>
            {isNewUser && <p className='lg:text-2xl text-xl  font-semibold text-center '>Add Social Links</p>}

            <div className='flex w-full justify-between items-center gap-1'>
                {links.map((item,index)=>{
                    return(
                        <div onClick={()=>{setLinkIndex(index)}} key={index} className={`flex-1 sm:px-1 flex justify-center ${linkIndex==index?"bg-black text-white ":""}  items-center border border-black h-11 rounded-md`}>
                            {item.icon}
                        </div>
                    )
                })}
            </div>


            <div className='w-full flex relative justify-center items-center gap-2 text-base font-semibold'>
   
                <input type="text" value={newUser.socialLinks[links[linkIndex].key as keyof typeof newUser.socialLinks]} 
                onChange={(e) => setNewUser((prev) => ({...prev, socialLinks: { ...prev.socialLinks, [links[linkIndex].key]: e.target.value,}}))}
                placeholder={`Enter your ${links[linkIndex].name} link`} className="h-full placeholder:text-gray-500 font-normal rounded-sm p-3 w-full border border-conduit/40" />
            </div>

            
            <div className='flex gap-2 w-full'>
                <NavigationButton direction={0} Click={Prev}/>
                <NavigationButton direction={1} Click={Next}/>
            </div>
            
        </div>  
    </div>
  )
}
