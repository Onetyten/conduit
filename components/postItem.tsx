import React,{useState} from 'react'
import { CiHeart } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import {motion} from 'framer-motion'
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch,useSelector } from 'react-redux';
import { serviceTrue } from '@/state/showServiceSlice/showServiceSlice';
import { serviceInterface } from '@/lib/types';
import { RootState } from '@/store';
import { setService } from '@/state/viewedService/viewedService';
import { likeHeart,unlikeHeart } from '@/state/likedHeart/likedHeart';
import { updateService } from '@/state/updatedService/updatedService';
import {isMobile} from 'react-device-detect'

interface propTypes{
    index:number,
    post:serviceInterface
}

export default function PostItem(props:propTypes) {
    const dispatch = useDispatch()
    const profileDataRedux = useSelector((state:RootState)=> state.user.user)
    const serviceRedux = useSelector((state:RootState)=> state.service.service)
    const [imageLoaded,setImageLoaded] = useState(false)
    const {post,index} = props

    const showModal =()=>{
        dispatch(serviceTrue())
    }

    const getService = async ()=>{
        if (!isMobile) {
            showModal();
        }
        
        if (!profileDataRedux) console.log("User profile is not logged in")
        dispatch(setService(post))
        if (serviceRedux && profileDataRedux) {
            if (serviceRedux.likedId.includes(profileDataRedux._id)) {
                dispatch(likeHeart())
            } else {
                dispatch(unlikeHeart())
            }
        }
        // fetch from the update views api and update the views on the backend
        if (profileDataRedux){
            if (post._id && typeof post._id === 'string' && post._id.length>0){
                const response = await fetch(`/api/update_views`,{
                    method:"PATCH",
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({id:post._id,user_id:profileDataRedux._id})
                })
                // log out the error if the response is not okay meaning the views did not get updated on the backend for some reason
                if (!response.ok){
                    const errorBody  = await response.json() 
                    console.log(errorBody)
                }
                // set the service redux to the updated post data sent from the backend
                else
                {
                    const viewMessage = await response.json()
                    console.log(viewMessage.post)
                    dispatch(setService(viewMessage.post))
                    dispatch(updateService(viewMessage.post))
                    console.log(viewMessage)
                }
            }
            //response if post or post id is null
            else{
                console.log("no itemid",post)
            }

        }

    }
    const image = (
    <Image
      src={post.galleryImages[0] || "/Images/Stock image/NoImage.jpg"}
      alt={`${post.title} cover image`}
      className="object-cover rounded-lg"
      fill
      onLoad={() => setImageLoaded(true)}
      onError={() => setImageLoaded(false)}
      onClick={()=>{getService()}}
    />
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
                <Link  href="/serviceDetails" onClick={()=>{getService()}}>
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
