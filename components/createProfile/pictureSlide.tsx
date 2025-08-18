'use client'
import React,{useState} from 'react'
import NavigationButton from '../NavigationButton'
import Image from 'next/image'
import {motion} from 'framer-motion'
import { NewUserType } from '@/lib/types'





interface propTypes{
    newUser:NewUserType
    setNewUser:React.Dispatch<React.SetStateAction<NewUserType>>
    setSlideIndex: React.Dispatch<React.SetStateAction<number>>
    slideIndex:number
}


export default function PictureSlide(props:propTypes) {
    const {setSlideIndex,slideIndex,newUser,setNewUser} = props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [imageSaved,setImageSaved] = useState(false)
    const [PreviewImage,setPreviewImage] = useState<string | null>(null)


    function Next() {
        setSlideIndex(slideIndex+1)
    }
    function Prev() {
        setSlideIndex(slideIndex-1)
    }

    function uploadImage(e:React.ChangeEvent<HTMLInputElement>){

        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];

        if (!file) return;
        const validFileTypes = ['image/jpeg', 'image/png', 'image/webp']

        if (!validFileTypes.includes(file.type))  return alert("invalid file type")
        if (file.size > 5 * 1024 * 1024)   return alert("Image should be less than 5MB")
        setNewUser(prev=>({...prev, profileImage:file }))
        const reader = new FileReader();

        reader.onload = (e) => {
            const result = e.target?.result as string
            setPreviewImage(result)
            setImageSaved(true)
        }
        reader.onerror = () => alert("Error reading file")
        reader.readAsDataURL(file)

    }



  return (
    <div className='h-full w-full sm:px-[10%] px-6 text-xs'>
        <div className='flex flex-col justify-center items-center w-full h-full gap-6'>
            <p className='lg:text-2xl text-lg  font-semibold text-center '>Add a profile picture</p>
            <div className='relative w-20 h-20 rounded-full overflow-hidden'>
                <Image src={PreviewImage || newUser.profilePicUrl} alt='previewImage' className='object-cover w-full h-full aspect-square' fill/>
            </div>
            
            <div className="w-[90%] sm:w-1/2 h-48 relative">
                <input
                    type="file"
                    id="upload"
                    className="hidden"
                    onChange={(e)=>{uploadImage(e)}}
                />
                <label
                    htmlFor="upload"
                    className="cursor-pointer relative overflow-hidden lg:text-xl text-lg  font-semibold w-full h-36 flex justify-center items-center bg-softblue/40 hover:bg-softblue/70 rounded-2xl text-center"
                >
                <div className='absolute w-full h-full'>
                    <motion.div  animate={{ x: [0, 300, 0],  y: [0, 80, 0]}}transition = {{duration:5,repeat:Infinity, repeatType:"loop", ease:'easeInOut' }} className='bg-blue-100/70 -z-20 w-32 h-32 absolute top-0 -left-10 rounded-full'>

                    </motion.div>

                    <motion.div animate={{ x: [0, -300, 0],  y: [0, 30, 0]}}transition = {{duration:7,repeat:Infinity, repeatType:"loop", ease:'easeInOut' }} className='bg-teal-100/50 -z-20 w-40 h-32 absolute top-0 -right-10 rounded-full'>

                    </motion.div>

                    <motion.div animate={{ x: [0, -40, 0],  y: [0, -80, 0]}}transition = {{duration:3,repeat:Infinity, repeatType:"loop", ease:'easeInOut' }} className='bg-pink-100/80 -z-20 w-40 h-32 absolute -bottom-4 right-8 rounded-full'>

                    </motion.div>
                </div>

                {/* overlay backdrop */}
                <div className='absolute -z-10 w-full h-full backdrop-blur-xl'>

                </div>
                <p className='text-sm md:text-lg '>
                   Click to upload image 
                </p>
                    
                </label>
            </div>

            <div className='flex gap-6'>
                <NavigationButton direction={0} Click={Prev}/>
                <NavigationButton direction={1} Click={Next}/>
            </div>
            <div>
                <p className='text-gray-500'>
                    (Optional)
                </p>
            </div>
            
        </div>  
    </div>
  )
}
