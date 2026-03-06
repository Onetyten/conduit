import React from 'react'
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";

interface LikeComponentProps {
    LikePost: () => void;
    postLiked:boolean
  }

export default function LikeComponent(props:LikeComponentProps) {
    const {LikePost,postLiked} = props

  return (
        <div className='flex items-center w-full'>
            <div className='h-0.5 flex-1 bg-gray-400 w-full'>
                
            </div>
            <div className='border-gray-200 cursor-pointer shadow-xl border-[1px] rounded-full p-2 mx-6 ' 
            onClick={()=>{LikePost()}}
            >
                {postLiked?( < IoMdHeart className='text-pink-500 hover:text-pink-600 text-4xl'/>):(<IoMdHeartEmpty  className='text-pink-500 hover:text-pink-600 text-4xl'/>)}
                
            </div>
            <div className='h-0.5 flex-1 bg-gray-400'>
                
            </div>
        </div>
  )
}
