"use client"
import { clearUser } from "@/state/userSlice"
import { AlertTriangle, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import Modal from "./Modal"

export default function DeleteAccountModal({ onClose }: { onClose: () => void }) {
  const [confirm, setConfirm] = useState('')
  const router = useRouter()
  const dispatch = useDispatch()

  function handleDelete() {
    if (confirm !== 'DELETE') return toast.error('Type DELETE to confirm')
    dispatch(clearUser())
    router.replace('/')
  }

  return (
    <Modal title="Delete Account" onClose={onClose}>
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
          <AlertTriangle size={18} className="text-red-500 mt-0.5 shrink-0" />
          <p className="text-sm text-red-600 leading-relaxed">
            This action is <strong>permanent</strong>. All your data, services, and payment history will be erased and cannot be recovered.
          </p>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-muted">Type <span className="font-mono font-bold text-red-500">DELETE</span> to confirm</label>
          <input
            type="text"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            placeholder="DELETE"
            className="h-11 rounded-xl px-4 w-full border border-red-300 bg-white/60 placeholder:text-gray-400 focus:outline-none focus:border-red-400 transition text-sm"
          />
        </div>
        <button
          onClick={handleDelete}
          className="h-11 w-full bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
        >
          <Trash2 size={16} /> Delete My Account
        </button>
      </div>
    </Modal>
  )
}