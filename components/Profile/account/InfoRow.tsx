import React from 'react'

export default function InfoRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null
  return (
    <div className="flex flex-col gap-1.5 min-w-0">
      <p className="text-xs font-medium text-muted/70 uppercase tracking-wide">{label}</p>
      <p className="text-sm wrap-break-word leading-relaxed font-medium">{value}</p>
    </div>
  )
}