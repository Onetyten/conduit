import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showSignUp:false
}

const showSignUpSlice = createSlice({
    name:"showSignUp",
    initialState:initialState,
    reducers :{
        signUpTrue:(state)=>{
            state.showSignUp = true
        },
        signUpFalse:(state)=>{
            state.showSignUp= false
        },
    }


    } 
)
export const {signUpTrue,signUpFalse} = showSignUpSlice.actions
export default showSignUpSlice.reducer