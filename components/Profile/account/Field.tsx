import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"


export default function Field({ label, value, onChange, placeholder,error, type = 'text',style }: {
  label?: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string,style?:string,error?:string
}) {
  const [secureEntry,setSecureEntry] = useState(false)
  return (
    <div className={`flex ${style} flex-col gap-1.5 w-full`}>
      {label&& <label className="text-base font-semibold text-conduit">{label}</label>}
      <div className="w-full gap-1 flex flex-col">
        <div className="relative w-full">
            <input
                type={type === "password" ? secureEntry ? 'text' : 'password' : type}
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                className={`h-13.5 rounded-md px-4 w-full font-medium border focus:border-conduit focus:outline-0 border-conduit/30 bg-white/60 placeholder:text-gray-400 transition text-base`}
            />
            {type === "password" && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" onClick={() => setSecureEntry(!secureEntry)}>
                    {secureEntry ? <EyeOff size={18} /> : <Eye size={18} />}
                </div>
            )}
        </div>
        {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
      
    </div>
  )
}

