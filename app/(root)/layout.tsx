'use client'
import React from 'react'
import {Provider} from 'react-redux'
import { store,persistor } from '@/store'
import { PersistGate } from 'redux-persist/integration/react'

export default function layout({children}:{children:React.ReactNode})
{
      
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <main className='font-inter'>
            {children}
        </main>
      </PersistGate>

    </Provider>
  )
}
