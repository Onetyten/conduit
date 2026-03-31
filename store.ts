import {configureStore} from '@reduxjs/toolkit'
import userReducer from '@/state/userSlice'
import showServiceReducer from '@/state/showServiceSlice'
import servicePostReducer from '@/state/viewedService'
import showSignUpReducer from '@/state/showSignUp'
import keywordReducer from '@/state/keywordSlice'
import locationalDataSlice from '@/state/locationalDataSlice'
import storage from 'redux-persist/lib/storage'
import {persistReducer,persistStore} from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit'


const persistConfig = {
    key:'root',
    version:1,
    storage,
    whitelist: ['user']
    // whitelist:[]
}

const reducer = combineReducers({
    user:userReducer,
    keyword:keywordReducer,
    showService:showServiceReducer,
    service:servicePostReducer,
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