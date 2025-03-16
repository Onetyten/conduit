
import { createSlice} from "@reduxjs/toolkit"

interface queryState{
    value:string
}
const initialState:queryState = {
    value:""
}

const QuerySlice = createSlice({
    name:  "searchQuery",
    initialState,
    reducers:{
       

       
    }
})

export default QuerySlice.reducer