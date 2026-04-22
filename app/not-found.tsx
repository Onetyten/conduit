"use client"
import Link from 'next/link'
import { ArrowLeft, Unplug } from 'lucide-react'
import Image from 'next/image'
import Logo from '@/public/Images/Logo.png'
import geometric from '@/public/Images/Geometric.png'
import { useRouter } from 'next/navigation'


export default function NotFound() {
  const router = useRouter()

  return (
    <div className='flex flex-col relative p-4 min-h-screen'>
      <div className='absolute inset-0 z-0 flex justify-center items-center'>
        <h1 className='text-[50vw] mb-[10%] text-red-600/5 opacity-70 font-semibold tracking-tight'>
          404
        </h1>
      </div>

      <div className='flex z-20 relative justify-between w-full text-sm '>
        <div className='flex gap-1 items-center '>
          <Image src={Logo} alt='logo' className='w-6 object-contain'/>
          <p className='font-orbitron font-black text-conduit text-xl sm:text-2xl'>
            Conduit .
          </p>
        </div>
      </div>
      <div className='w-full relative flex-1 mt-6 sm:mt-0 pb-10 flex items-center justify-center px-6 sm:px-[10%]'>

        <div className='flex flex-col items-center justify-center gap-8 max-w-2xl mx-auto text-center'>
          <div>
            <Unplug className='size-64 text-softblue'/>
          </div>

          <h1 className='text-2xl sm:text-3xl md:text-4xl text-muted font-semibold tracking-tight'>
          Page not found
          </h1>

          <Link href='/' className='hover:bg-conduit cursor-pointer bg-black text-lg relative flex justify-center items-center text-white w-xs max-w-[90%] py-4 h-auto overflow-hidden rounded-xl'>
            <Image src={geometric} alt='' className='absolute opacity-45 -left-10 object-contain'/>
            <p className='flex gap-2 items-center'>
                Home
            </p>
          </Link>

          <button onClick={() => router.back()} className='text-md cursor-pointer text-muted-foreground hover:text-conduit transition-colors duration-200 flex items-center gap-1 group' >
            <ArrowLeft className='size-5 group-hover:-translate-x-0.5 transition-transform' />
            Back to previous page
          </button>
        </div>
      </div>
    </div>
    
  )
}