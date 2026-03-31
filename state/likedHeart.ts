import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    heartState : false
}

const likedHeartSlice = createSlice({
    name : "heartState",
    initialState,
    reducers:{
        likeHeart:(state)=>{
            state.heartState = true

        },
        unlikeHeart:(state)=>{
            state.heartState = false
        }
    }


})

export const {likeHeart,unlikeHeart} = likedHeartSlice.actions
export default likedHeartSlice.reducer

