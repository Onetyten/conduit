import {configureStore} from '@reduxjs/toolkit'
import userReducer from '@/state/userInfo/userSlice'
import showServiceReducer from '@/state/showServiceSlice/showServiceSlice'
import newServiceReducer from '@/state/updatedService/updatedService'
import servicePostReducer from '@/state/viewedService/viewedService'
import serviceProfileReducer from '@/state/serviceProfile/serviceProfile'
import likeHeartReducer from '@/state/likedHeart/likedHeart'
import showSignUpReducer from '@/state/showSignUp/showSignUp'
import locationalDataSlice from '@/state/locationalData/locationalDataSlice'
import storage from 'redux-persist/lib/storage'
import {persistReducer,persistStore} from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit'


const persistConfig = {
    key:'root',
    version:1,
    storage,
    blacklist: ['heartState','showSignUp']
}

const reducer = combineReducers({
    user:userReducer,
    showService:showServiceReducer,
    newservice:newServiceReducer,
    service:servicePostReducer,
    serviceProfile:serviceProfileReducer,
    heartState: likeHeartReducer,
    showSignUp:showSignUpReducer,
    locationalData:locationalDataSlice
})

const persistedReducer = persistReducer(persistConfig,reducer)

export const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleWare)=> getDefaultMiddleWare({
        serializableCheck:false
    })
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 