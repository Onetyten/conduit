import { createSlice } from "@reduxjs/toolkit";


interface Location {
    city: string;
    state: string;
    country: string;
  }
  
  interface userInterface {
    location: Location;
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePicture: string;
    bio: string;
    isTalent: boolean;
    skills: string[];
    serviceCategories: string[];
    hourlyRate: number;
    portfolio?: string; // Optional property
    companyName?: string; // Optional property
    companyDescription?: string; // Optional property
    createdAt: string;
    updatedAt: string;
    totalSpent: number;
    __v: number;
  }

interface userState {
    user:userInterface|null
}


const initialState:userState ={
    user:null
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.user = action.payload
        },
        clearUser :(state)=>{
            state.user = null
        }   
    }
})

export const {setUser,clearUser} = userSlice.actions
export default userSlice.reducer