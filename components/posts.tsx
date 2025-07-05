"use client"
import Image from 'next/image'
import React, {useCallback, useEffect, useRef, useState } from 'react'
import { CiHeart } from "react-icons/ci";
import { RootState } from '@/store';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import {motion} from 'framer-motion'
import { useDispatch ,useSelector} from 'react-redux';
import { serviceTrue } from '@/state/showServiceSlice/showServiceSlice';
import { likeHeart,unlikeHeart } from '@/state/likedHeart/likedHeart';
import { setService ,} from '@/state/viewedService/viewedService';
import { clearServiceProfile, setServiceProfile } from '@/state/serviceProfile/serviceProfile';
import { updateService } from '@/state/updatedService/updatedService'
import { serviceInterface } from '@/lib/types';



const Posts = () => {
    const [post,setPost] = useState<serviceInterface[]>([])
    const [page,setPage] = useState(1)
    const [serviceIndex,setserviceIndex] = useState(0)
    const [loading,setLoading] = useState(false)
    const [hasMore,setHasMore] = useState(true)
    const limit = 20 

    const dispatch = useDispatch()
    const serviceRedux = useSelector((state:RootState)=> state.service.service)
    const newServiceRedux = useSelector((state:RootState)=> state.newservice.newservice)
    const profileDataRedux = useSelector((state:RootState)=> state.user.user)
    // const serviceProfileRedux = useSelector((state:RootState)=> state.serviceProfile.serviceProfile)

    const observer = useRef<IntersectionObserver|null>(null)
    const triggerRef = useRef(null)


      const getProfile = useCallback(
        async()=>{
            
            if (!serviceRedux || !serviceRedux.profileId) {
                console.warn("serviceRedux or profileId is missing, cannot make the API call.")
                return
              }
              dispatch(clearServiceProfile())
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
                dispatch(setServiceProfile(serviceUserData.user))
    
    
    
              } catch (error) {
                console.error(error)
              }
        },[serviceRedux,dispatch]
      )



      useEffect(()=>{
        getProfile()
      },[getProfile])



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
        if (!hasMore || loading) return
        const newPost  = await fetchPost(limit,page)
        if (newPost && newPost.length>0){
            setPost((prevPosts) => [...prevPosts, ...newPost])
            setPage((prevPage)=>prevPage+1)
            if (newPost.length<limit){
                setHasMore(false)
            }
        }
        else{
            setHasMore(false) 
        }
        

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[loading,fetchPost,limit,hasMore])




    useEffect(() => {
        if (!newServiceRedux) return
        if (post.length <= 0) return
        setPost(prev => {
            const newPosts = [...prev];
            newPosts[serviceIndex] = newServiceRedux;
            return newPosts;
        });
    }, [newServiceRedux, serviceIndex,post.length]);


    const showModal = async (item:serviceInterface,index:number)=>{
        if (!profileDataRedux) console.log("User profile is not logged in")
        setserviceIndex(index)

        dispatch(setService(item))
        


        // set the like and unlike state base on whether the liked id array of te services contains the id of the user profile
        // this means that like and unlike stste will be set based on if the user has liked the post in the service redux 
        if (serviceRedux && profileDataRedux) {
            if (serviceRedux.likedId.includes(profileDataRedux._id)) {
              dispatch(likeHeart())
            } else {
              dispatch(unlikeHeart())
            }
        }

        // set the show service redux
        // console.log("Service Redux", serviceRedux,"\nprofileDataRedux",profileDataRedux,"\nserviceProfileRedux",serviceProfileRedux)
        dispatch(serviceTrue())



        // fetch from the update views api and update the views on the backend
        if (profileDataRedux){
            if (item._id && typeof item._id === 'string' && item._id.length>0){
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/update_views`,{
                    method:"PATCH",
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({id:item._id,user_id:profileDataRedux._id})
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
            //response if item or item id is null
            else{
                console.log("no itemid",item)
            }

        }

        }
    
    // set the like and unlike state base on whether the liked id array of te services contains the id of the user profile
    // this means that like and unlike stste will be set based on if the user has liked the post in the service redux
    // this  is useeffect is added as a fail safe due to the asynchronous nature of redux 
    useEffect(() => {
        if (serviceRedux && profileDataRedux) {
            if (serviceRedux.likedId.includes(profileDataRedux._id)) {
                dispatch(likeHeart());
            } else {
                dispatch(unlikeHeart());
            }
        }
    }, [serviceRedux, profileDataRedux, dispatch]);


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
                post.map((item ,index)=>{
                    return(
                        <div key={index} className='flex gap-3 flex-col'>
                            <div className="relative w-80 h-64">
                                <Image src={item.galleryImages[0]} alt="post cover image" className="object-cover rounded-lg" fill onClick={()=>{showModal(item,index)}}/>
                                
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
                                        <p className='text-xs'>{item.views}</p>
                                    </div>

                                    <div className='flex gap-1 items-center'>
                                        <CiHeart/>
                                        <p className='text-xs'>{item.likes}</p>
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