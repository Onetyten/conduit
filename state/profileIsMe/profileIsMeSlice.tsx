import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profileIsMe:true
}

const profileIsMeSlice = createSlice({
    name:'profileIsMe',
    initialState,
    reducers:{
        setToProfile:(state)=>{
            state.profileIsMe = true
        },
        setToService:(state)=>{
            state.profileIsMe = false
        }
    }
})

export const {setToProfile,setToService} = profileIsMeSlice.actions
export default profileIsMeSlice.reducer