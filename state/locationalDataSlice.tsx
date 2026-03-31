import { createSlice } from "@reduxjs/toolkit";

interface locationalDataType {
  ip: string;
  continent_code: string;
  continent_name: string;
  country_code2: string;
  country_code3: string;
  country_name: string;
  country_name_official: string;
  country_capital: string;
  state_prov: string;
  state_code: string;
  district: string;
  city: string;
  zipcode: string;
  latitude: string;
  longitude: string;
  is_eu: boolean;
  country_flag: string;
  geoname_id: string;
  country_emoji: string;
  calling_code: string;
  country_tld: string;
  languages: string;
  isp: string;
  connection_type: string;
  organization: string;
  currency: {
    code: string;
    name: string;
    symbol: string;
  };
  time_zone: {
    name: string;
    offset: number;
    offset_with_dst: number;
    current_time: string; // Date-time string
    current_time_unix: number; // Unix timestamp
    is_dst: boolean;
    dst_savings: number;
    dst_exists: boolean;
    dst_start: string; // Date string
    dst_end: string; // Date string
  };
}
interface LocationalDataState {
  data: locationalDataType | null;
}

const initialState: LocationalDataState = {
  data: null,
};



const locationalDataSlice = createSlice({
    name: "locationalData",
    initialState,
    reducers: {
        setLocation:(state,action)=>{
            state.data = action.payload;
        },
        clearLocation:(state)=>{
            state.data = null;
        }
    }
}
)

export const {setLocation,clearLocation} = locationalDataSlice.actions;
export default locationalDataSlice.reducer;