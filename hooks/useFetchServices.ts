/* eslint-disable react-hooks/exhaustive-deps */

import api from "@/lib/api"
import { serviceInterface } from "@/lib/types"
import { addPosts, clearPosts, setPosts } from "@/state/postListSlice"
import { RootState } from "@/store"
import { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

interface postResponseType{
    message:string;
    posts: serviceInterface[];
    currentPage: number;
    totalPages: number;
    hasMore: boolean
}


export default function useFetchServices(){
    const keywordRedux = useSelector((state:RootState)=>state.keyword.keyword)
    const triggerRef = useRef(null)
    const observer = useRef<IntersectionObserver|null>(null)
    const prevKeywordRef = useRef(keywordRedux)    
    const [loading,setLoading] = useState(false)
    const post = useSelector((state:RootState)=>state.posts.posts)
    const [page,setPage] = useState(1)
    const [hasMore,setHasMore] = useState(true)
    const limit = 20
    const dispatch = useDispatch()

    const fetchPost = useCallback(async (limit:number,Currentpage:number):Promise<postResponseType|null>=>{
        setLoading(true)
        try {                
            let url = `/api/service/posts?page=${Currentpage}&limit=${limit}`;

            if (keywordRedux && keywordRedux !== "" && keywordRedux !== "All services") {
                url += `&q=${encodeURIComponent(keywordRedux)}`;
            }
            const Response = await api.get(url)
            const PostResponse = Response.data
   
            const postData  = PostResponse?.posts
            if (postData!=null && postData.length>0){
                return PostResponse
            }
            return null
        }
        catch{
            return null
        }
        finally{
            setLoading(false)
        }
    
    },
    [keywordRedux])


    const loadMorePost  = useCallback(async()=>{
        if ( !hasMore || loading || !keywordRedux) return;        
        const newPost  = await fetchPost(limit,page)
        const posts = newPost?.posts

        if (posts && posts.length>0){
            if (page===1){
                dispatch(setPosts(posts))
            }
            else{
                dispatch(addPosts(posts))
            }
    
            setPage((prevPage)=>prevPage+1)
            setHasMore(newPost.hasMore)
        }
        else{
            setHasMore(false) 
        }
        
    },[loading,fetchPost,hasMore,keywordRedux,page])


    // call the load more post callback when/if the trigger element is in view
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
                loadMorePost()
            }        
    },observerOptions)

    //observe the trigger
    if (triggerRef.current){
        newObserver.observe(triggerRef.current)
        
    }
    observer.current = newObserver
    return()=>observer.current?.disconnect()
    
        
    },[loading,loadMorePost])


    useEffect(()=>{
        const prevKeyword = prevKeywordRef.current
        if (prevKeyword !== keywordRedux ){
            dispatch(clearPosts())
            setPage(1)
            setHasMore(true)
        }
        prevKeywordRef.current = keywordRedux
        
        },[keywordRedux])

    return {keywordRedux,triggerRef,post,loading}
}