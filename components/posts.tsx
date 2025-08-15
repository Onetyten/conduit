"use client"
import Image from 'next/image'
import React, {useEffect} from 'react'
import Digital from 'react-activity/dist/Digital'
import "react-activity/dist/Digital.css";
import PostItem from './postItem';
import useFetchServices from '@/hooks/useFetchServices';
import useGetPostProfile from '@/hooks/useGetPostProfile';

const Posts = () => {
    const {keywordRedux,triggerRef,isSearching,post,loading,setPost} = useFetchServices()
    const {getProfile} = useGetPostProfile() 
    useEffect(()=>{
        getProfile()
    },[getProfile])


  return (
    <div className='flex flex-col justify-center w-full py-5'>
        {isSearching&&
        (<div className='w-full py-5 mt-10 flex flex-col justify-center items-center text-base text-gray-400'> 
            <p >
                Getting search result for {keywordRedux} 
            </p>
            <div className='p-2'>
                <Digital size={30} color="#373f51" />
            </div>
        </div>)}
        {!isSearching&&(
            <div className='text-xs py-6 gap-6 justify-start grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full'>
                {post.length>0?(
                    post.map((item ,index)=>{
                        return(
                            <PostItem key={item._id} index={index} post={item} refreshPost = {(updatedPost)=>{
                               setPost((prevPosts) =>
                                prevPosts.map((p) => (p._id === updatedPost._id ? updatedPost : p))
                                );
                            }} />
                        )
                    })):
                    (
                         !loading && (<div className=' text-sm text-gray-400 text-center gap-6 flex-col col-span-full justify-center items-center w-full flex mt-4'>
                            <p className='text-center'>
                                No Services available at the moment
                            </p>
                            {/* <div className='relative'>
                                <Image src='/icons/NoServices.webp' alt='No service image' className='object-contain' width={250} height={250}/>
                            </div> */}
                        </div>)
                    )
                }
                <div ref = {triggerRef} className='w-3 h-3'>

                </div>

            </div>
        )}
        {!isSearching&&loading&&(<div className='w-full py-5 mt-10 flex flex-col justify-center items-center text-base text-gray-400'>
                <p>Loading services</p> 
                <div className='p-2'>
                <Digital size={30} color="#373f51" />
            </div>
        </div>)}
    </div>
  )
}

export default Posts