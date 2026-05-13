
import { Digital } from "react-activity";
import { MdClose } from "react-icons/md";

export default function Modal({ title, onClose, children,loading, stableClick }: { title: string; onClose: () => void; children: React.ReactNode, loading?:boolean,stableClick?:boolean }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-conduit/20 backdrop-blur-sm px-4"
    onClick={()=>{ if (!stableClick) onClose() } } >

      <div className="bg-background max-h-[90%] relative w-full max-w-lg rounded-2xl shadow-2xl border border-muted/20 overflow-hidden flex flex-col"  onClick={e => e.stopPropagation()} >
        {
          loading && (
            <div className="absolute inset-0 z-50 flex justify-center items-center bg-softblue/70 backdrop-blur-xs rounded-2xl">
              <Digital size={30} color="#373f51" />
            </div>
          )
        }
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-muted/20">
          <p className="font-semibold text-lg text-conduit">{title}</p>
           <button onClick={onClose} className='text-2xl cursor-pointer bg-softblue hover:bg-gray-200 p-2 text-conduit rounded-full'>
                  <MdClose/>
              </button>
        </div>

        <div className="px-6 flex-1 overflow-y-auto py-5">{children}</div>
      </div>
    </div>
  )
}