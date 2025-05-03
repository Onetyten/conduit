import React from 'react'
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

interface LikeComponentProps {
    LikePost: () => void;
  }

export default function LikeComponent({LikePost}:LikeComponentProps) {
    const likedHeartRedux  = useSelector((state:RootState)=>state.heartState.heartState)

  return (
        <div className='flex items-center'>
            <div className='h-0.5 flex-1 bg-gray-400'>
                
            </div>
            <div className='border-gray-200 shadow-xl border-[1px] rounded-full p-2 mx-6 ' 
            onClick={()=>{LikePost()}}
            >
                {likedHeartRedux?( < IoMdHeart className='text-pink-500 text-4xl'/>):(<IoMdHeartEmpty  className='text-pink-500 text-4xl'/>)}
                
            </div>
            <div className='h-0.5 flex-1 bg-gray-400'>
                
            </div>
        </div>
  )
}
