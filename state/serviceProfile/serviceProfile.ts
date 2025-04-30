import { createSlice } from "@reduxjs/toolkit";
import { profileInterface } from "@/lib/types";

interface profileState{
    serviceProfile:profileInterface|null
}

const initialState:profileState ={
    serviceProfile:null
}

const serviceProfileSlice = createSlice({
    name:"serviceProfile",
    initialState,
    reducers:{
        setServiceProfile:(state,action)=>{
            state.serviceProfile = action.payload
        },
        clearServiceProfile :(state)=>{
            state.serviceProfile = null
        }   
    }
})

export const {setServiceProfile,clearServiceProfile} = serviceProfileSlice.actions
export default serviceProfileSlice.reducer