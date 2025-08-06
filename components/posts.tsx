"use client"
import Image from 'next/image'
import React, {useCallback, useEffect, useRef, useState } from 'react'
import { RootState } from '@/store';
import { useDispatch ,useSelector} from 'react-redux';
import { likeHeart,unlikeHeart } from '@/state/likedHeart/likedHeart';
import { clearServiceProfile, setServiceProfile } from '@/state/serviceProfile/serviceProfile';
import { serviceInterface } from '@/lib/types';
import Digital from 'react-activity/dist/Digital'
import "react-activity/dist/Digital.css";
import PostItem from './postItem';



const Posts = () => {
    const [post,setPost] = useState<serviceInterface[]>([])
    const [page,setPage] = useState(1)
    const [loading,setLoading] = useState(false)
    const [hasMore,setHasMore] = useState(true)
    const [isSearching,setIsSearching] = useState(false)
    const limit = 20 
    const dispatch = useDispatch()
    const serviceRedux = useSelector((state:RootState)=> state.service.service)
    const profileDataRedux = useSelector((state:RootState)=> state.user.user)
    const keywordRedux = useSelector((state:RootState)=>state.keyword.keyword)
    const prevKeywordRef = useRef(keywordRedux)

    
    // const serviceProfileRedux = useSelector((state:RootState)=> state.serviceProfile.serviceProfile)

    const observer = useRef<IntersectionObserver|null>(null)
    const triggerRef = useRef(null)


      const getProfile = useCallback(
        async()=>{
            
            if (!serviceRedux || !serviceRedux.serviceProviderId) {
                console.warn("serviceRedux or serviceProviderId is missing, cannot make the API call.")
                return
              }
              dispatch(clearServiceProfile())
              try {
                const response  = await fetch(`/api/getserviceprofile`,{
                    method:'POST',
                    headers:{
                      'Content-Type':'application/json'
                    },
                    body:JSON.stringify({user_id:serviceRedux?.serviceProviderId})
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

      useEffect(()=>{
        const prevKeyword = prevKeywordRef.current
        if (prevKeyword !== "All services" && keywordRedux === "All services" ){
            setPost([])
            setPage(1)
        }
        prevKeywordRef.current = keywordRedux
      },[keywordRedux])


    const fetchPost = useCallback(async (limit:number,Currentpage:number)=>{
        setLoading(true)
        try {                
            let url = `/api/posts?page=${Currentpage}&limit=${limit}`;

            if (keywordRedux && keywordRedux !== "" && keywordRedux !== "All services") {
                url += `&q=${encodeURIComponent(keywordRedux)}`;
            }
            const Response = await fetch(url)
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

    },[keywordRedux])




    useEffect(()=>{
        async function loadTagPosts(){
            try {
                setIsSearching(true)
                if (keywordRedux && keywordRedux !== "" && keywordRedux !== "All services"){
                const newPost  = await fetchPost(50,1)
                setPost(newPost)
                setPage(2)
                setHasMore(true)
                }
            }
            catch (error) {
                console.log(error)
            }
            finally{
                setIsSearching(false)
            }
            
        }
        loadTagPosts()

    },[fetchPost, keywordRedux])

    const loadMorePost  = useCallback(async()=>{
        if ( !hasMore || loading || (keywordRedux && keywordRedux !== "" && keywordRedux !== "All services")) return;

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
        
    },[loading,fetchPost,hasMore,keywordRedux,page])
    
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
        
    }
    observer.current = newObserver
    return()=>observer.current?.disconnect()
    
        
    },[loading,loadMorePost])





    
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
                            <PostItem key={index} index={index} post={item} />
                        )
                    })):
                    (
                         !loading && (<div className=' text-sm text-gray-400 text-center gap-6 flex-col col-span-full justify-center items-center w-full flex mt-4'>
                            <p className='text-center'>
                                No Services available at the moment
                            </p>
                            <div className='relative'>
                                <Image src='/icons/NoServices.webp' alt='No service image' className='object-contain' width={250} height={250}/>
                            </div>
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