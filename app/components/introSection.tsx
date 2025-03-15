import React from 'react'
import HeaderSlide from './headerSlide'

const IntroSection = () => {
  return (
    <div className='w-full flex justify-center gap-3 items-center py-10'>
        <div className=' py-10 gap-4 flex flex-col w-md'>
            <h1 className='text-3xl font-medium'>Skills on Demand</h1>
            <p className='text-sm text-gray-500'>Conduit is revolutionizing service hiring, creating a seamless marketplace for connecting clients with skilled professionals.  </p>

            <div className='text-sm flex gap-3'>
                <form className='text-background bg-foreground w-fit px-5 py-2 rounded-full'>
                    <button>
                        Hire service
                    </button>
                </form>
                <form className='text-foreground border-[1px] border-foreground w-fit px-5 py-2 rounded-full'>
                    <button>
                        Get Hired
                    </button>
                </form>
            </div>

        </div>
        <div className='w-md'>
            <HeaderSlide/>


        </div>
    </div>
  )
}

export default IntroSection