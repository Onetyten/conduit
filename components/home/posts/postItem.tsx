'use client'
import React,{useState} from 'react'
import { CiHeart } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import {motion} from 'framer-motion'
import Link from 'next/link';
import Image from 'next/image';
import { serviceInterface } from '@/lib/types';
import useShowService from '@/hooks/useShowService';
import PostImage from './PostImage';

interface propTypes{
    index:number,
    post:serviceInterface
    refreshPost: (updatedPost: serviceInterface) => void
}

export default function PostItem(props:propTypes) {
    const [imageLoaded,setImageLoaded] = useState(false)
    const {post,index,refreshPost} = props
    const {isMobile,getService} = useShowService(post,refreshPost)
    



  return (
    <div key={index} className='flex gap-3 w-full flex-col col-span-1'>
        <div className="relative cursor-pointer h-80 sm:h-72">
            {isMobile ? (<Link href={`/service/${post._id}`} onClick={getService}>
                <PostImage post={post} refreshPost={refreshPost} setImageLoaded={setImageLoaded}/>
            </Link>) 
            :
            (<PostImage post={post} refreshPost={refreshPost} setImageLoaded={setImageLoaded}/>)}

            <motion.div  initial={{height:"100%", opacity:1}} animate={imageLoaded?{height:0,opacity:0.5}:{ height: "100%", opacity: 1 }} transition={{ duration: 0.5 }} className="div top-0 left-0 z-20 absolute w-full h-0 bg-gray-400">
            </motion.div>
            
        </div>
        
                                        
        <div className='flex items-center justify-between '>
            <div className='flex gap-2 text-sm items-center'>
                <Link  href={`/service/${post._id}`} onClick={getService}>
                    <Image src={post.galleryImages?.[0] || "/Images/Stock image/NoImage.jpg"} alt={`${post.title?.slice(0,2)}`} className='object-cover uppercase cursor-pointer aspect-square rounded-3xl' width={25} height={25}/> 
                </Link>
                <p>
                    {post.title?.length<20?post.title:`${post.title?.slice(0,18)}...`}
                </p>
            </div>
            <div className='flex gap-3 text-base items-center'>
                <div className='flex gap-1 items-center cursor-pointer'>
                    < MdOutlineRemoveRedEye className='text-base'/>
                    <p>{post.viewedId?.length}</p>
                </div>

                <div className='flex gap-1 items-center cursor-pointer'>
                    <CiHeart/>
                    <p>{post.likedId?.length}</p>
                </div>

            </div>
        </div>
        
    </div>
  )
}
