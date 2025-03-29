import {configureStore} from '@reduxjs/toolkit'
import userReducer from '@/state/userInfo/userSlice'
import showServiceReducer from '@/state/showServiceSlice/showServiceSlice'
import servicePostReducer from '@/state/viewedService/viewedService'
import serviceProfileReducer from '@/state/serviceProfile/serviceProfile'
import storage from 'redux-persist/lib/storage'
import {persistReducer,persistStore} from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit'

const persistConfig = {
    key:'root',
    version:1,
    storage,
    blacklist: ['showService']
}

const reducer = combineReducers({
    user:userReducer,
    showService:showServiceReducer,
    service:servicePostReducer,
    serviceProfile:serviceProfileReducer
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