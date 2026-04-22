import { useState } from "react"
import { toast } from "react-toastify"
import Modal from "./Modal"
import Field from "./Field"
import { Check, ChevronRight } from "lucide-react"
import { FaFacebook, FaLinkedin } from "react-icons/fa6"
import { RiInstagramFill, RiTwitterXFill } from "react-icons/ri"
import { FiUser } from "react-icons/fi"

export default function BecomeProviderModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0)
  const socialLinks = [
    { name: 'Facebook', key: 'facebook', icon: <FaFacebook size={18} /> },
    { name: 'Instagram', key: 'instagram', icon: <RiInstagramFill size={18} /> },
    { name: 'LinkedIn', key: 'linkedin', icon: <FaLinkedin size={18} /> },
    { name: 'X', key: 'twitter_x', icon: <RiTwitterXFill size={18} /> },
    { name: 'Other', key: 'other', icon: <FiUser size={18} /> },
  ]

  const [activeSocial, setActiveSocial] = useState(0)
  const [form, setForm] = useState({
    bio: '',
    skills: '',
    country: '',
    state: '',
    district: '',
    socialLinks: { facebook: '', instagram: '', linkedin: '', twitter_x: '', other: '' },
  })
  const steps = ['About', 'Location', 'Social Links']

  function handleSubmit() {
    toast.success("You're now a service provider!")
    onClose()
  }

  return (
    <Modal title="Become a Service Provider" onClose={onClose}>
      <div className="flex gap-2 mb-5">
        {steps.map((s, i) => (
          <div key={i} className={`flex-1 h-1.5 rounded-full transition-colors ${i <= step ? 'bg-conduit' : 'bg-muted/20'}`} />
        ))}
      </div>
      <p className="text-xs text-muted mb-4 font-medium tracking-wide uppercase">{steps[step]}</p>

      {step === 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-muted">Bio</label>
            <textarea
              rows={3}
              value={form.bio}
              onChange={e => setForm(p => ({ ...p, bio: e.target.value }))}
              placeholder="Tell clients what you do..."
              className="rounded-xl p-3 w-full border border-conduit/30 bg-white/60 placeholder:text-gray-400 focus:outline-none focus:border-conduit/60 focus:ring-2 focus:ring-conduit/10 transition text-sm resize-none"
            />
          </div>
          <Field label="Skills (comma separated)" value={form.skills} onChange={v => setForm(p => ({ ...p, skills: v }))} placeholder="e.g. Web Design, Video Editing" />
        </div>
      )}

      {step === 1 && (
        <div className="flex flex-col gap-3">
          <Field label="Country" value={form.country} onChange={v => setForm(p => ({ ...p, country: v }))} placeholder="e.g. Nigeria" />
          <Field label="State" value={form.state} onChange={v => setForm(p => ({ ...p, state: v }))} placeholder="e.g. Lagos" />
          <Field label="District" value={form.district} onChange={v => setForm(p => ({ ...p, district: v }))} placeholder="e.g. Ikeja" />
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 w-full">
            {socialLinks.map((item, i) => (
              <button
                key={i}
                onClick={() => setActiveSocial(i)}
                className={`flex-1 h-10 flex items-center justify-center rounded-lg border transition-colors ${activeSocial === i ? 'bg-conduit text-white border-conduit' : 'border-conduit/30 text-muted hover:bg-conduit/5'}`}
              >
                {item.icon}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={form.socialLinks[socialLinks[activeSocial].key as keyof typeof form.socialLinks]}
            onChange={e => setForm(p => ({ ...p, socialLinks: { ...p.socialLinks, [socialLinks[activeSocial].key]: e.target.value } }))}
            placeholder={`Enter your ${socialLinks[activeSocial].name} link`}
            className="h-11 rounded-xl px-4 w-full border border-conduit/30 bg-white/60 placeholder:text-gray-400 focus:outline-none focus:border-conduit/60 focus:ring-2 focus:ring-conduit/10 transition text-sm"
          />
        </div>
      )}

      <div className="flex gap-3 mt-6">
        {step > 0 && (
          <button onClick={() => setStep(s => s - 1)} className="flex-1 h-11 rounded-xl border border-conduit/30 text-conduit font-semibold hover:bg-conduit/5 transition-colors text-sm">
            Back
          </button>
        )}
        {step < steps.length - 1 ? (
          <button onClick={() => setStep(s => s + 1)} className="flex-1 h-11 bg-conduit text-white rounded-xl font-semibold hover:bg-black transition-colors text-sm flex items-center justify-center gap-2">
            Next <ChevronRight size={16} />
          </button>
        ) : (
          <button onClick={handleSubmit} className="flex-1 h-11 bg-conduit text-white rounded-xl font-semibold hover:bg-black transition-colors text-sm flex items-center justify-center gap-2">
            <Check size={16} /> Submit
          </button>
        )}
      </div>
    </Modal>
  )
}