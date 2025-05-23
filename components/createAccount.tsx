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
import CreateUser from './createProfile/createUser';

 

export default function CreateAccount() {
    const showSignUpRedux = useSelector((state:RootState)=>state.showSignUp.showSignUp)
    const [email, setEmail] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [password,setPassword]= useState("")
    const [city,setCity]= useState("")
    const [country,setCountry]= useState("")
    const [state,setState]= useState("")
    const [profilePic,setProfilePic] = useState("https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png")
    const [slideIndex,setSlideIndex] = useState(0)
    const [passwordCheck,setPasswordCheck] = useState('')

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
                                (<WelcomeSlide email={email} setEmail={setEmail} setSlideIndex={setSlideIndex} firstname={firstname} setFirstname={setFirstname} lastname={lastname} setLastname={setLastname} slideIndex={slideIndex} />):
                                slideIndex==1?
                                (   
                                    <PasswordSlide password = {password} setPassword={setPassword} setSlideIndex={setSlideIndex} slideIndex={slideIndex} passwordCheck={passwordCheck} setPasswordCheck={setPasswordCheck}/>  
                                ):
                                slideIndex==2?
                                (
                                    <PictureSlide setSlideIndex={setSlideIndex} slideIndex={slideIndex} profilePic={profilePic} setProfilePic={setProfilePic}/>
                                ):
                                slideIndex==3?
                                (
                                    <LocationSlide city={city} setCity={setCity} country={country} setCountry = {setCountry} state={state} setState = {setState} setSlideIndex={setSlideIndex} slideIndex={slideIndex}/>
                                ):
                                slideIndex==4?
                                (
                                    <CreateUser setSlideIndex ={setSlideIndex} slideIndex={slideIndex} email={email} firstname={firstname} lastname={lastname} password={password} city={city} country={country} state={state} profilePic={profilePic}/>
                                )
                                :
                                (
                                    <FinishSlide firstname={firstname}/>
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