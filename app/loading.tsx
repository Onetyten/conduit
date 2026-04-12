import React from 'react'
import { Digital } from 'react-activity'

export default function loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm">
      <Digital size={30} color="#373f51" />
    </div>
  )
}