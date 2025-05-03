'use client'
import React, { useState } from 'react'
import WelcomeSlide from './createProfile/welcomeSlide';
import PasswordSlide from './createProfile/passwordSlide';
import PictureSlide from './createProfile/pictureSlide';
import LocationSlide from './createProfile/locationSlide';
import FinishSlide from '@/components/createProfile/finishSlide';
import { useSelector } from 'react-redux';
import { RootState } from '@/store'
import CloseSlide from './serviceComponents/closeSlide';

 

export default function CreateAccount() {
    const showSignUpRedux = useSelector((state:RootState)=>state.showSignUp.showSignUp)
    const [email, setEmail] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [password,setPassword]= useState("")
    const [city,setCity]= useState("")
    const [country,setCountry]= useState("")
    const [state,setState]= useState("")
    const [slideIndex,setSlideIndex] = useState(0)

    // function Submit(e:FormEvent) {
    //     e.preventDefault()
    //     console.log('Form submitted:', { firstname, lastname });
    // }

  return (
    <div>
        {showSignUpRedux&&(
            <div className=' pointer-events-none sm:bg-slate-500/50  h-screen w-full flex-col sm:flex-row  right-0 bottom-0 fixed flex justify-center items-center'>

                <div className='bg-white h-3/4 relative rounded-3xl w-2/3 z-20 pointer-events-auto shadow-md'>
                    
                    <CloseSlide/>
                    
                    <div className='h-full w-full flex justify-center items-center'>
                        <div className='h-full w-full'>

                            {/* first carousel item */}
                            {
                                slideIndex==0?
                                (<WelcomeSlide email={email} setEmail={setEmail} setSlideIndex={setSlideIndex} firstname={firstname} setFirstname={setFirstname} lastname={lastname} setLastname={setLastname}/>):
                                slideIndex==1?
                                (   
                                    <PasswordSlide password = {password} setPassword={setPassword} setSlideIndex={setSlideIndex}/>  
                                ):
                                slideIndex==2?
                                (
                                    <PictureSlide setSlideIndex={setSlideIndex}/>
                                ):
                                slideIndex==3?
                                (
                                    <LocationSlide city={city} setCity={setCity} country={country} setCountry = {setCountry} state={state} setState = {setState} setSlideIndex={setSlideIndex}/>
                                ):
                                (
                                    <FinishSlide setSlideIndex ={setSlideIndex}/>
                                )
                            }






                        </div>
                    </div>
                </div>
            </div>
        )}
        

    </div>

  )
}