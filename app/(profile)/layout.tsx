'use client'
import React from 'react'
import {Provider} from 'react-redux'
import { store } from '@/store'

export default function layout({children}:{children:React.ReactNode}) {
  return (
    <Provider store={store}>
      <main>
        {children}
      </main>
    </Provider>
    
  )
}
