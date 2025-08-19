'use client'
import React, { useEffect, useState } from 'react'
import WelcomeSlide from './createProfile/welcomeSlide';
import PasswordSlide from './createProfile/passwordSlide';
import PictureSlide from './createProfile/pictureSlide';
import LocationSlide from './createProfile/locationSlide';
import FinishSlide from '@/components/createProfile/finishSlide';
import { useDispatch,useSelector } from 'react-redux';
import { setLocation } from '@/state/locationalData/locationalDataSlice';
import { RootState } from '@/store'
import CloseSlide from './serviceComponents/closeSlide';
import CreateUser from './createProfile/createUser';
import axios from 'axios';
import Image from 'next/image';
import AccountSelectSlide from './createProfile/accountSelectSlide(';
import SkillSlide from './createProfile/skillSlide';
import LinkSlide from './createProfile/linkSlide';
 

export default function CreateAccount() {
    const dispatch = useDispatch()
    const LocationalRedux = useSelector((state:RootState)=>state.locationalData.data)
    const showSignUpRedux = useSelector((state:RootState)=>state.showSignUp.showSignUp)
    const profile = useSelector((state:RootState)=>state.user.user)
    const [newUser,setNewUser] = useState({
        email:'',
        firstname: "",
        lastname: "",
        password: "",
        passwordCheck: "",
        location:{
            district: "",
            state: "",
            country: "",
        },
        socialLinks:{
            facebook: "",
            instagram: "",
            twitter_x: "",
            linkedin: "",
            other: "",
        },
        isTalent: false,
        bio: "",
        skills:[] as string[],
        profileImage: null as File | null,
        profilePicUrl:"https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"
    })
    const [uploadingProfile,setUploadingProfile] = useState(false)
    const [slideIndex,setSlideIndex] = useState(0)
    const [isUser,setIsUser] = useState(false)

    //set the slideIndex to 5 by default if user already has an
    useEffect(()=>{
        if (profile && profile.isTalent==false){
        setIsUser(true)
        setSlideIndex(5)
    }
    },[profile])







    useEffect(()=>{
        async function getLocationalData(){
            
            try {
                if (LocationalRedux && LocationalRedux?.city && LocationalRedux.country_name && LocationalRedux.district){
                    setNewUser(prev=>({...prev, district:LocationalRedux.district, country:LocationalRedux.country_name, state:LocationalRedux.state_prov  }))
                    return 
                }
                else{
                    const response =await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.NEXT_PUBLIC_IP_GEOLOCATION_API_KEY}`)
                    if (response.status != 200 ) return
                    dispatch(setLocation(response.data))
                    setNewUser(prev=>({...prev, district:response.data.district, country:response.data.country_name, state:response.data.state_prov  }))
                }

            } 
            catch (error) {
                console.log(error)
            }
            
        }
        getLocationalData()
    },[LocationalRedux, dispatch])
   

  return (
    <div>
        {showSignUpRedux&&(
            <div className=' pointer-events-none bg-slate-500/50  h-screen w-full flex-col sm:flex-row  right-0 bottom-0 fixed flex justify-center items-center'>

                <div className='bg-white h-[85%] sm:h-3/4 relative rounded-3xl w-[90%] sm:w-2/3 z-20 pointer-events-auto shadow-md'>
                    
                    <CloseSlide/>
                    
                    <div className='h-full w-full flex justify-center items-center'>
                        <div className='h-full w-full'>

                            {/* first carousel item */}
                            {
                                slideIndex==0?
                                (<WelcomeSlide setSlideIndex={setSlideIndex} slideIndex={slideIndex} newUser={newUser} setNewUser={setNewUser}/>):
                                slideIndex==1?
                                (   
                                    <PasswordSlide setSlideIndex={setSlideIndex} slideIndex={slideIndex} newUser={newUser} setNewUser={setNewUser}/>  
                                ):
                                slideIndex==2?
                                (
                                    <PictureSlide setSlideIndex={setSlideIndex} slideIndex={slideIndex} newUser={newUser} setNewUser={setNewUser}/>
                                ):
                                slideIndex==3?
                                (
                                    <LocationSlide setSlideIndex={setSlideIndex} slideIndex={slideIndex} newUser={newUser} setNewUser={setNewUser}/>
                                ):
                                slideIndex==4?
                                (
                                    <AccountSelectSlide setSlideIndex={setSlideIndex} slideIndex={slideIndex} newUser={newUser} setNewUser={setNewUser}/>
                                ):
                                slideIndex==5?
                                (
                                    <SkillSlide setSlideIndex={setSlideIndex} isUser={isUser} slideIndex={slideIndex} newUser={newUser} setNewUser={setNewUser}/>
                                ):
                                slideIndex==6?
                                (
                                    <LinkSlide setSlideIndex={setSlideIndex} slideIndex={slideIndex}  newUser={newUser} setNewUser={setNewUser} />
                                ):
                                slideIndex==7?
                                (
                                    <CreateUser isUser={isUser} setSlideIndex ={setSlideIndex} setUploadingProfile={setUploadingProfile} slideIndex={slideIndex} newUser={newUser} />
                                )
                                :
                                (
                                    <FinishSlide newUser={newUser} />
                                )
                            }
                        </div>
                    </div>

                    {uploadingProfile&&(
                        <div className='w-full h-full top-0 left-0 absolute flex justify-center items-center bg-softblue/80 rounded-3xl'>
                            <div className='flex flex-col pt-32 gap-6 w-full h-full justify-center items-center'>
                                    <Image src={'/icons/loading.gif'} alt='loading gif' width={50} height={50} />
                                    <p>Creating Profile</p>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        )}
        

    </div>

  )
}