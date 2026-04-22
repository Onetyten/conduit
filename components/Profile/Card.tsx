

export default function Card({ children, className = '',title }: { children: React.ReactNode; className?: string,title?:string }) {
  return (
    <div className={`bg-white/40 border-2 relative border-muted/20 rounded-2xl p-6 ${className}`}>

      {title && <p className={`text-sm ${title=="Caution"?"text-red-500":"text-conduit"} -top-2 bg-background px-4 font-semibold  uppercase tracking-widest mb-4 absolute`}>{title}</p> }

      {children}
    </div>
  )
}