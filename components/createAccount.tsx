import React from 'react'
import { Carousel,CarouselContent,CarouselItem,CarouselNext,CarouselPrevious, } from './ui/carousel'

export default function CreateAccount() {
  return (
    <div className='pointer-events-none sm:bg-slate-500/50  h-screen w-full flex-col sm:flex-row  right-0 bottom-0 fixed flex justify-center items-center'>
        <div className='bg-white h-3/4 rounded-3xl w-2/3 pointer-events-auto shadow-md'>
            <Carousel className='h-full w-full flex justify-center items-ce'>
                <CarouselContent className='h-full w-full'>

                    {/* first carousel item */}
                    <CarouselItem className='h-full w-full'>
                        <div className='flex justify-center items-center w-full h-full'>
                            Name/email
                        </div>
                        
                    </CarouselItem>

                    <CarouselItem>
                        Password
                    </CarouselItem>

                    <CarouselItem>
                        Profile pic
                    </CarouselItem>
                    
                    <CarouselItem>
                        Location
                    </CarouselItem>


                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    </div>
  )
}
