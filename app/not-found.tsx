"use client"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Unplug } from 'lucide-react'
import Image from 'next/image'
import Logo from '@/public/Images/Logo.png'
import geometric from '@/public/Images/Geometric.png'
import { useRouter } from 'next/navigation'


export default function NotFound() {
  const router = useRouter()

  return (
    <div className='flex flex-col p-4 min-h-screen'>

      <div className='flex justify-between w-full text-sm '>
        <div className='flex gap-1 items-center '>
          <Image src={Logo} alt='logo' className='w-6 object-contain'/>
          <p className='font-orbitron font-black text-conduit text-xl sm:text-2xl'>
            Conduit .
          </p>
        </div>
        <div>
          <h1 className='text-4xl text-red-600 font-semibold tracking-tight'>
            404
          </h1>
        </div>
      </div>
      <div className='w-full flex-1 mt-6 sm:mt-0 pb-10 flex items-center justify-center px-6 sm:px-[10%]'>

        <div className='flex flex-col items-center justify-center gap-8 max-w-2xl mx-auto text-center'>
          <div>
            <Unplug className='size-64 text-softblue'/>
          </div>

          <h1 className='text-2xl sm:text-3xl md:text-4xl text-muted font-semibold tracking-tight'>
          Page not found
          </h1>

          <Button className='hover:bg-conduit bg-black text-lg relative text-white w-xs max-w-[90%] py-4 h-auto overflow-hidden rounded-xl'>
            <Image src={geometric} alt='' className='absolute -left-10 object-contain'/>
            <Link href='/' className='flex gap-2 items-center'>
                Home
            </Link>
          </Button>

          <button onClick={() => router.back()} className='text-md text-muted-foreground hover:text-conduit transition-colors duration-200 flex items-center gap-1 group' >
            <ArrowLeft className='size-5 group-hover:-translate-x-0.5 transition-transform' />
            Back to previous page
          </button>
        </div>
      </div>
    </div>
    
  )
}