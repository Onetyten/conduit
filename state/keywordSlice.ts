import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    keyword:"All services"
}

const keyWordSlice = createSlice({
    name:'keyword',
    initialState,
    reducers:{
        setkeyWord:(state,action:PayloadAction<string>)=>{
            state.keyword = action.payload
        },
        clearkeyWord:(state)=>{
            state.keyword = ''
        }
    }

})

export const {setkeyWord,clearkeyWord} = keyWordSlice.actions
export default keyWordSlice.reducer