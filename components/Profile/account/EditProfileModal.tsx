import { profileInterface } from "@/lib/types";
import { useState } from "react";
import { toast } from "react-toastify";
import Field from "./Field";
import Modal from "./Modal";
import { Check, MapPin } from "lucide-react";

export default function EditProfileModal({ user, onClose }: { user: profileInterface; onClose: () => void }) {
  const [form, setForm] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    country: user.location?.country ?? '',
    state: user.location?.state ?? '',
    district: user.location?.district ?? '',
  })

  function handleSave() {
    toast.success('Profile updated!')
    onClose()
  }
  return (
    <Modal title="Edit Profile" onClose={onClose}>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label="First Name" value={form.firstName} onChange={v => setForm(p => ({ ...p, firstName: v }))} />
          <Field label="Last Name" value={form.lastName} onChange={v => setForm(p => ({ ...p, lastName: v }))} />
        </div>
        <p className="text-sm font-semibold text-conduit flex items-center gap-1.5 mt-1">
          <MapPin size={14} /> Location
        </p>
        <div className="flex flex-col gap-3">
          <Field label="Country" value={form.country} onChange={v => setForm(p => ({ ...p, country: v }))} placeholder="e.g. Nigeria" />
          <Field label="State" value={form.state} onChange={v => setForm(p => ({ ...p, state: v }))} placeholder="e.g. Lagos" />
          <Field label="District" value={form.district} onChange={v => setForm(p => ({ ...p, district: v }))} placeholder="e.g. Ikeja" />
        </div>
        <button
          onClick={handleSave}
          className="mt-2 h-11 w-full bg-conduit text-white rounded-xl font-semibold hover:bg-black transition-colors flex items-center justify-center gap-2"
        >
          <Check size={16} /> Save Changes
        </button>
      </div>
    </Modal>
  )
}

