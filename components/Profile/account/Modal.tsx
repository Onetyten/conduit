import { X } from "lucide-react";

export default function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-conduit/20 backdrop-blur-sm px-4" onClick={onClose} >
      <div className="bg-background w-full max-w-lg rounded-2xl shadow-2xl border border-muted/20 overflow-hidden"  onClick={e => e.stopPropagation()} >
        <div className="flex items-center justify-between px-6 py-4 border-b border-muted/20">
          <p className="font-semibold text-lg text-conduit">{title}</p>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-conduit/10 transition-colors">
            <X size={18} className="text-muted" />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  )
}