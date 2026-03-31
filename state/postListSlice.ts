import { serviceInterface } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState:{posts:serviceInterface[]} = {
    posts:[]
}


const postListSlice = createSlice({
    name:'posts',
    initialState,
    reducers:{
        setPosts:(state,action:PayloadAction<serviceInterface[]>)=>{
            state.posts = action.payload
        },
        addPosts: (state,action:PayloadAction<serviceInterface[]>)=>{
            const existingIds = new Set(state.posts.map(post=>post._id))
            const uniquePosts = action.payload.filter(post=>!existingIds.has(post._id))
            state.posts.push(...uniquePosts)
        },
        updatePostList: (state,action:PayloadAction<{id:string,update:Partial<serviceInterface>}>)=>{
            const {id,update} = action.payload
            const findPost = state.posts.find(post=>post._id === id)
            if (!findPost) return
            Object.assign(findPost,update)
        },
        clearPosts:(state)=>{
            state.posts = []
        }
    }
})

export const {setPosts,clearPosts,addPosts,updatePostList} = postListSlice.actions
export default postListSlice.reducer