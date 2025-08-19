import { serviceInterface } from "@/lib/types"
import { RootState } from "@/store"
import { useCallback, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"



export default function useFetchServices(){
    const keywordRedux = useSelector((state:RootState)=>state.keyword.keyword)
    const triggerRef = useRef(null)
    const observer = useRef<IntersectionObserver|null>(null)
    const prevKeywordRef = useRef(keywordRedux)    
    const [isSearching,setIsSearching] = useState(false)
    const [loading,setLoading] = useState(false)
    const [post,setPost] = useState<serviceInterface[]>([])
    const [page,setPage] = useState(1)
    const [hasMore,setHasMore] = useState(true)
    const limit = 20 
    
    

    //fetch post usecallback
    const fetchPost = useCallback(async (limit:number,Currentpage:number)=>{
        setLoading(true)
        try {                
            let url = `/api/service/posts?page=${Currentpage}&limit=${limit}`;

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
    
    },
    [keywordRedux])

    // The callback that fetch posts conditionally to prevent fetchpoats from getting too cluttered
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
                console.log('Trigger element in view, loading more...')
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


    useEffect(()=>{
        const prevKeyword = prevKeywordRef.current

        if (prevKeyword !== "All services" && keywordRedux === "All services" ){
            setPost([])
            setPage(1)
        }
        prevKeywordRef.current = keywordRedux
        
        },[keywordRedux])

    return {keywordRedux,triggerRef,isSearching,post,loading,setPost}
}