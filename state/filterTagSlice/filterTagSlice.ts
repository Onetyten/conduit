import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    tagFilter:"All services"
}

const filterTagSlice = createSlice({
    name:'tagFilter',
    initialState,
    reducers:{
        setTagFilter:(state,action:PayloadAction<string>)=>{
            state.tagFilter = action.payload
        },
        clearTagFilter:(state)=>{
            state.tagFilter = ''
        }
    }

})

export const {setTagFilter,clearTagFilter} = filterTagSlice.actions
export default filterTagSlice.reducer