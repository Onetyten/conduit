"use client"

import React from 'react'
import Digital from 'react-activity/dist/Digital'
import "react-activity/dist/Digital.css";
import PostItem from './postItem';
import useFetchServices from '@/hooks/useFetchServices';

const Posts = () => {
    const {keywordRedux,triggerRef,post,loading} = useFetchServices()
    
  return (
    <div className='flex flex-col justify-center items-center w-full py-5'>
        {loading && post.length==0?
        (<div className='w-full py-5 mt-10 flex flex-col justify-center items-center text-base text-gray-400'> 
            <p >
                {(keywordRedux==="All services" || keywordRedux==="")?`Loading services`:`Getting search result for ${keywordRedux}`}
            </p>
            <div className='p-2'>
                <Digital size={30} color="#373f51" />
            </div>
        </div>):(
            <div className='text-xs py-6 gap-6 justify-start grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full'>
                {post.length>0?(
                    post.map((item ,index)=>{
                        return(
                            <PostItem key={item._id} index={index} post={item} />
                        )
                    })):
                    (
                         !loading && (<div className=' text-sm text-gray-400 text-center gap-6 flex-col col-span-full justify-center items-center w-full flex mt-4'>
                            <p className='text-center'>
                                No Services available at the moment
                            </p>
                        </div>)
                    )
                }
            </div>
        )}
        <div ref={triggerRef} className='w-3 h-3'>

        </div>

        {loading && post.length>0&&(
            <div className='p-2'>
                <Digital size={30} color="#373f51" />
            </div>
        )}
        


    </div>
  )
}

export default Posts