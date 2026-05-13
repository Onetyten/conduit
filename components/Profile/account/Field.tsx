import { useState } from "react";
import { Eye, EyeOff, KeyRound } from "lucide-react"


export default function Field({ label, value, onChange, placeholder,error, type = 'text',style }: {
  label?: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string,style?:string,error?:string
}) {
  const [secureEntry,setSecureEntry] = useState(false)
  return (
    <div className={`flex ${style} flex-col gap-1.5 w-full`}>
      {label&& <label className="text-sm font-medium text-muted">{label}</label>}
      <div className="w-full gap-1 flex flex-col relative">
        <input
          type={type==="password"?secureEntry?'text':'password':type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className={`h-11 rounded-xl px-4 w-full border focus:border-conduit/60  border-conduit/30 bg-white/60 placeholder:text-gray-400 transition text-sm`}
        />
        {
          error&&(
            <p className="text-xs text-red-600">{error}</p>
          )
        }
        {type=="password" && (
          <div className="absolute right-0 top-1/2 -translate-1/2" onClick={()=>setSecureEntry(!secureEntry)}>
            {secureEntry?<EyeOff/>:<Eye></Eye>}
          </div>
        )}
      </div>
      
    </div>
  )
}

