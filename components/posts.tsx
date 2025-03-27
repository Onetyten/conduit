"use client"
import Image from 'next/image'
import React, {useCallback, useEffect, useRef, useState } from 'react'
import { CiHeart } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import {motion} from 'framer-motion'
import { useDispatch ,useSelector} from 'react-redux';
import { serviceTrue } from '@/state/showServiceSlice/showServiceSlice';
import { setService } from '@/state/viewedService/viewedService';


export interface Post {
    _id: string;
    title: string;
    profileId: string;
    galleryImages: string[];
    description: string;
    amountEarned: number;
    price: number;
    avalableOn: string[];
    likes: number;
    views: number;
    reviews: string[]; 
    avalability: boolean;
    deliverables: string[];
    tags: string[];
    createdAt: string;
    address: string;
    deliveryMethod: string[];

  }

const Posts = () => {
    const [post,setPost] = useState<Post[]>([])
    const [page,setPage] = useState(1)
    const [loading,setLoading] = useState(false)
    const [hasMore,setHasMore] = useState(true)
    const limit = 20 

    const dispatch = useDispatch()
    const showReduxModal = useSelector((state)=> state.showService.showService)
    const serviceRedux = useSelector((state)=> state.service.service)

    const observer = useRef<IntersectionObserver|null>(null)
    const triggerRef = useRef(null)


      const getProfile = useCallback(
        async()=>{
            if (!serviceRedux?.profileId) {
                console.warn("serviceRedux._id is undefined or null, cannot make the API call.");
                return;
              }
              try {
                const response  = await fetch(`/api/getserviceprofile`,{
                    method:'POST',
                    headers:{
                      'Content-Type':'application/json'
                    },
                    body:JSON.stringify({user_id:serviceRedux?.profileId})
                  })
    
                if (!response.ok){
                    throw new Error("invalid response")
                }
    
                const serviceUserData  = await response.json()
                console.log(serviceUserData)
    
    
    
              } catch (error) {
                console.error(error)
              }
        },[serviceRedux.profileId]
      )


      useEffect(()=>{
        getProfile()
      },[serviceRedux?.profileId])

    const fetchPost = useCallback(async (limit:number,Currentpage:number)=>{
        setLoading(true)
        try {
            const Response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?page=${Currentpage}&limit=${limit}`)
            if (!Response.ok){
                throw new Error("Failed to get response")
            }
            const PostResponse = await Response.json()
            const postData  = PostResponse?.posts
            if (postData!=null && postData.length>0){
                return postData
            }
            else{
                return []
            }
            
        }
        catch (error) {
            console.error("error fetching posts",error)
        }
        finally{
            setLoading(false)
        }

    },[])


    const loadMorePost  = useCallback(async()=>{
        if (!hasMore||loading) return
        const newPost  = await fetchPost(limit,page)
        if (newPost.length>0){
            setPost((prevPosts) => [...prevPosts, ...newPost])
            setPage((prevPage)=>prevPage+1)
            if (newPost.length<limit){
                setHasMore(false)
            }
        }
        else{
            setHasMore(false) 
        }
        

    },[limit,page,fetchPost,loading,hasMore])

    useEffect(()=>{
        loadMorePost()
        
    },[])

    useEffect(() => {
        console.log('showReduxModal updated:', showReduxModal);
      }, [showReduxModal]);

    const showModal = (item)=>{
        dispatch(setService(item))
        console.log("ServiceRedux",serviceRedux)
        dispatch(serviceTrue())
    }


    useEffect(()=>{
        if (loading) return
        if (observer.current) observer.current.disconnect()
        const observerOptions = {
            root: null,
            threshold: 0.1
        }

        const newObserver = new IntersectionObserver((entries)=>{
            const entry = entries[0]
            if (entry.isIntersecting){
                console.log('Trigger element in view, loading more...')
                loadMorePost()
            }        
    },observerOptions)

    if (triggerRef.current){
        newObserver.observe(triggerRef.current)
        observer.current = newObserver
    }

    return()=>{
        if (observer.current) observer.current.disconnect()
    }
        
    },[loading,loadMorePost])





    
  return (
    <div className='flex justify-center w-full p-5'>
        <div className='text-xs py-6 flex gap-6 justify-center flex-wrap'>
            {post.length>0?(
                post.map((item,index)=>{
                    return(
                        <div key={index} className='flex gap-3 flex-col'>
                            <div className="relative w-80 h-64">
                                <Image src={item.galleryImages[0]} alt="post cover image" className="object-cover rounded-lg" fill onClick={()=>{showModal(item)}}/>
                                
                                <motion.div  initial={{height:"100%", opacity:1}} animate={{height:0,opacity:0.5}} transition={{ duration: 0.5 }} className="div top-0 left-0 absolute w-full h-0 bg-gray-400">

                                </motion.div>
                                
                            </div>
                                                            
                            <div className='flex items-center justify-between '>
                                <div className='flex gap-2 items-center'>
                                    <Image src={item.galleryImages[0]} alt='post cover image' className='object-cover aspect-square rounded-3xl' width={25} height={100}/> 
                                    <p>
                                        {item.title?.length<20?item.title:`${item.title.slice(0,18)}...`}
                                    </p>
                                </div>
                                <div className='flex gap-3 text-sm items-center'>
                                    <div className='flex gap-1 items-center'>
                                        < MdOutlineRemoveRedEye/>
                                        <p className='text-xs'>{item.likes}</p>
                                    </div>

                                    <div className='flex gap-1 items-center'>
                                        <CiHeart/>
                                        <p className='text-xs'>{item.views}</p>
                                    </div>

                                </div>
                            </div>
                            
                             
                        </div>
                    )
                })):
                (
                    <div className=' text-sm text-gray-400 mt-4'>
                        {!loading&&(<p>
                            No Services available at the moment
                        </p>)}
                    </div>
                )
            }
            <div ref = {triggerRef} className='w-3 h-3'>

            </div>
            {loading&&(<div className='w-full py-5 flex justify-center items-center text-base text-gray-400'>
                <p>Loading services</p> 
            </div>)}
        </div>
    </div>
  )
}

export default Posts