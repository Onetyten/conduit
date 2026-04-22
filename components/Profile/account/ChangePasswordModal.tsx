import { useState } from "react"
import { toast } from "react-toastify"
import Modal from "./Modal"
import { Eye, EyeOff, KeyRound } from "lucide-react"

export default function ChangePasswordModal({ onClose }: { onClose: () => void }) {
  const [show, setShow] = useState({ current: false, new: false, confirm: false })
  const [form, setForm] = useState({ current: '', new: '', confirm: '' })

  function handleSubmit() {
    if (form.new !== form.confirm) return toast.error('Passwords do not match')
    if (form.new.length < 8) return toast.error('Password must be at least 8 characters')
    toast.success('Password updated!')
    onClose()
  }

  const PasswordField = ({ fieldKey, label }: { fieldKey: 'current' | 'new' | 'confirm'; label: string }) => (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-medium text-muted">{label}</label>
      <div className="relative">
        <input
          type={show[fieldKey] ? 'text' : 'password'}
          value={form[fieldKey]}
          onChange={e => setForm(p => ({ ...p, [fieldKey]: e.target.value }))}
          className="h-11 rounded-xl px-4 pr-11 w-full border border-conduit/30 bg-white/60 placeholder:text-gray-400 focus:outline-none focus:border-conduit/60 focus:ring-2 focus:ring-conduit/10 transition text-sm"
        />
        <button
          type="button"
          onClick={() => setShow(p => ({ ...p, [fieldKey]: !p[fieldKey] }))}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
        >
          {show[fieldKey] ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  )

  return (
    <Modal title="Change Password" onClose={onClose}>
      <div className="flex flex-col gap-4">
        <PasswordField fieldKey="current" label="Current Password" />
        <PasswordField fieldKey="new" label="New Password" />
        <PasswordField fieldKey="confirm" label="Confirm New Password" />
        <button
          onClick={handleSubmit}
          className="mt-2 h-11 w-full bg-conduit text-white rounded-xl font-semibold hover:bg-black transition-colors flex items-center justify-center gap-2"
        >
          <KeyRound size={16} /> Update Password
        </button>
      </div>
    </Modal>
  )
}
