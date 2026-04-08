/* eslint-disable react-hooks/exhaustive-deps */

import api from "@/lib/api"
import { addPosts, clearPosts, setPosts } from "@/state/postListSlice"
import { RootState } from "@/store"
import { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"



export default function useFetchServices(){
    const keywordRedux = useSelector((state:RootState)=>state.keyword.keyword)
    const triggerRef = useRef(null)
    const observer = useRef<IntersectionObserver|null>(null)
    const prevKeywordRef = useRef(keywordRedux)    
    const [isSearching,setIsSearching] = useState(false)
    const [loading,setLoading] = useState(false)
    const post = useSelector((state:RootState)=>state.posts.posts)
    const [page,setPage] = useState(1)
    const [hasMore,setHasMore] = useState(true)
    const limit = 20 

    const dispatch = useDispatch()
    
    


    const fetchPost = useCallback(async (limit:number,Currentpage:number)=>{
        setLoading(true)
        try {                
            let url = `/api/service/posts?page=${Currentpage}&limit=${limit}`;

            if (keywordRedux && keywordRedux !== "" && keywordRedux !== "All services") {
                url += `&q=${encodeURIComponent(keywordRedux)}`;
            }
            const Response = await api.get(url)
            const PostResponse = await Response.data
            const postData  = PostResponse?.posts
            if (postData!=null && postData.length>0){
                return postData
            }
            else{
                return []
            }
            
        }
        finally{
            setLoading(false)
        }
    
    },
    [keywordRedux])


    const loadMorePost  = useCallback(async()=>{
        if ( !hasMore || loading || (keywordRedux && keywordRedux !== "" && keywordRedux !== "All services")) return;

        const newPost  = await fetchPost(limit,page)
        if (newPost && newPost.length>0){
            dispatch(addPosts(newPost))
            setPage((prevPage)=>prevPage+1)
            if (newPost.length<limit){
                setHasMore(false)
            }
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



    // Load tag posts when the keyword changes
    useEffect(()=>{
        async function loadTagPosts(){
            try {
                setIsSearching(true)
                if (keywordRedux && keywordRedux !== "" && keywordRedux !== "All services"){
                const newPost  = await fetchPost(50,1)
                dispatch(setPosts(newPost))
                setPage(2)
                setHasMore(true)
                }
            }
            finally{
                setIsSearching(false)
            }
            
        }
        loadTagPosts()
    },[fetchPost, keywordRedux])


    useEffect(()=>{
        const prevKeyword = prevKeywordRef.current

        if (prevKeyword !== "All services" && keywordRedux === "All services" ){
            dispatch(clearPosts())
            setPage(1)
        }
        prevKeywordRef.current = keywordRedux
        
        },[keywordRedux])

    return {keywordRedux,triggerRef,isSearching,post,loading}
}