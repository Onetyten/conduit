export default function Field({ label, value, onChange, placeholder, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-medium text-muted">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-11 rounded-xl px-4 w-full border border-conduit/30 bg-white/60 placeholder:text-gray-400 focus:outline-none focus:border-conduit/60 focus:ring-2 focus:ring-conduit/10 transition text-sm"
      />
    </div>
  )
}
