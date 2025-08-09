'use client'
import React,{useState} from 'react'
import { CiHeart } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import {motion} from 'framer-motion'
import Link from 'next/link';
import Image from 'next/image';
import { serviceInterface } from '@/lib/types';
import useShowService from '@/hooks/useShowService';

interface propTypes{
    index:number,
    post:serviceInterface
    refreshPost: (updatedPost: serviceInterface) => void
}


export default function PostItem(props:propTypes) {
    const [imageLoaded,setImageLoaded] = useState(false)
    const {post,index,refreshPost} = props
    const {isMobile,getService} = useShowService(post,refreshPost)

    const image = (
        <Image src={post.galleryImages[0] || "/Images/Stock image/NoImage.jpg"} alt={`${post.title} cover image`} className="object-cover rounded-lg" fill onLoad={() => setImageLoaded(true)} onError={() => setImageLoaded(false)} onClick={()=>{getService()}} />
    );

  return (
    <div key={index} className='flex gap-3 w-full flex-col col-span-1'>
        <div className="relative cursor-pointer h-80 sm:h-72">
            {isMobile ? (<Link href="/serviceDetails" onClick={getService}>{image} </Link>) 
            :
            (image)}
            <motion.div  initial={{height:"100%", opacity:1}} animate={imageLoaded?{height:0,opacity:0.5}:{ height: "100%", opacity: 1 }} transition={{ duration: 0.5 }} className="div top-0 left-0 absolute w-full h-0 bg-gray-400">
            </motion.div>
        </div>
                                        
        <div className='flex items-center justify-between '>
            <div className='flex gap-2 items-center'>
                <Link  href="/serviceDetails" onClick={getService}>
                    <Image src={post.galleryImages[0]} alt={`${post.title.slice(0,2)}`} className='object-cover uppercase cursor-pointer aspect-square rounded-3xl' width={25} height={25}/> 
                </Link>
                <p>
                    {post.title?.length<20?post.title:`${post.title.slice(0,18)}...`}
                </p>
            </div>
            <div className='flex gap-3 text-sm items-center'>
                <div className='flex gap-1 items-center cursor-pointer'>
                    < MdOutlineRemoveRedEye/>
                    <p className='text-xs'>{post.viewedId.length}</p>
                </div>

                <div className='flex gap-1 items-center cursor-pointer'>
                    <CiHeart/>
                    <p className='text-xs'>{post.likedId.length}</p>
                </div>

            </div>
        </div>
        
    </div>
  )
}
