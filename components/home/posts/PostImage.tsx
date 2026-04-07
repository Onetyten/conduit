import useShowService from '@/hooks/useShowService';
import { serviceInterface } from '@/lib/types';
import Image from 'next/image';
import React, { useState } from 'react'
import {motion} from 'framer-motion'
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { CiHeart } from 'react-icons/ci';

interface propTypes{
    post:serviceInterface
    setImageLoaded:React.Dispatch<React.SetStateAction<boolean>>
    openLink?:boolean
}

export default function PostImage(props:propTypes) {
    const maxDescLength = 256
    const {post,setImageLoaded,openLink} = props
    const [showImageDetails,setShowImageDetails] = useState(false)
    const {getService} = useShowService(post)

    function pointerEntered(){
        setShowImageDetails(true)
    }
    function pointerExited(){
        setShowImageDetails(false)
    }


  return (
    <div onPointerEnter={pointerEntered} onPointerLeave={pointerExited} className='w-full h-full relative'>
            <Image src={post.galleryImages?.[0] || "/Images/Stock image/NoImage.jpg"} alt={`${post.title} cover image`} className="object-cover select-none rounded-lg overflow-hidden" fill  onLoad={() => setImageLoaded(true)} onError={() => setImageLoaded(false)} onClick={()=>{
                if (openLink) return;
                getService();
            }}/>
         
            <motion.div className={`bg-linear-to-b ${showImageDetails?"opacity-100":"opacity-0"}  transition-all duration-400 pointer-events-none rounded-lg from-transparent to-conduit inset-0 absolute w-full h-full z-10 text-white text-base font-medium p-3 flex flex-col items-start justify-end gap-2`}>
                <p>{post.title?post.title:""}</p>
                <p className='text-xs'>{post.description?.slice(0,maxDescLength)}  {post.description?.length>maxDescLength?"...":""}</p>
                <div className='flex gap-3 text-base items-center'>
                <div className='flex gap-1 items-center cursor-pointer'>
                        < MdOutlineRemoveRedEye className='text-base'/>
                        <p>{post.viewCount}</p>
                    </div>
    
                    <div className='flex gap-1 items-center cursor-pointer'>
                        <CiHeart/>
                        <p>{post.likeCount}</p>
                    </div>
    
                </div>

            </motion.div>
        </div>
  )
}

