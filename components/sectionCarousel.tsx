import Link from 'next/link';
import React from 'react'

const carouseldata = ['Featured','Up & Coming','Salon','Personal Trainer','Plumber','Cleaner','Electrician','Carpenter','Landscaper','Tutor','Chef','Photographer','Massage Therapist','Mechanic','Painter','Handyman','Event Planner','Graphic Designer','Web Developer','Moving Services'
  ];

const SectionCarousel = () => {
  return (
    <div className='flex overflow-x-scroll pt-5 pb-3  text-sm text-gray-400 gap-3 hide-scrollbar relative flex-nowrap'>
        {carouseldata.map((item,index)=>{
            return(
                <Link key={index} href="/" className='w-72 p-2 sm:px-4 px-1 rounded-full hover:bg-gray-200 hover:text-foreground transition-all '>
                    <p className='w-full whitespace-nowrap'>{item}</p>
                </Link>
            )
        })}

    </div>
  )
}

export default SectionCarousel