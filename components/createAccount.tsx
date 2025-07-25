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
import { toast } from 'react-toastify';

 

export default function CreateAccount() {
    const dispatch = useDispatch()
    const LocationalRedux = useSelector((state:RootState)=>state.locationalData.data)
    const showSignUpRedux = useSelector((state:RootState)=>state.showSignUp.showSignUp)
    const [email, setEmail] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [password,setPassword]= useState("")
    const [passwordCheck,setPasswordCheck] = useState('')
    const [district,setDistrict]= useState("")
    const [country,setCountry]= useState("")
    const [state,setState]= useState("")
    const [uploadingProfile,setUploadingProfile] = useState(false)
    const [profileImage,setProfileImage] = useState<File | null>(null)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ profilePicUrl,setProfilePicUrl] = useState("https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png")
    const [slideIndex,setSlideIndex] = useState(0)


    async function CreateAccount(e:React.FormEvent<HTMLFormElement>){

        e.preventDefault();
        setUploadingProfile(true)
        const userData = new FormData()
        userData.append('firstName',firstname)
        userData.append('lastName',lastname)
        userData.append('email',email)
        userData.append('password',password)
        userData.append('state',state)
        userData.append('district',district)
        userData.append('country',country)
        if (profileImage) userData.append('profileImage',profileImage)

        try {
            const response = await axios.post(`/api/createNewProfile`,userData)
            if (response.status != 200) return
            setSlideIndex(slideIndex+1)
            setUploadingProfile(false)
            toast.success("Account created successfully, signin")

        }
        catch {
             toast("A error occured while creating your profile")
             setUploadingProfile(false)

        }
        
    } 


    useEffect(()=>{
        async function getLocationalData(){
            
            try {
                if (LocationalRedux && LocationalRedux?.city && LocationalRedux.country_name && LocationalRedux.district){
                    setDistrict(LocationalRedux.district)
                    setCountry(LocationalRedux.country_name)
                    setState(LocationalRedux.state_prov)
                    return 
                }
                else{
                    const response =await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.NEXT_PUBLIC_IP_GEOLOCATION_API_KEY}`)
                    if (response.status != 200 ) return
                    dispatch(setLocation(response.data))
                    setDistrict(response.data.district)
                    setCountry(response.data.country_name)
                    setState(response.data.state_prov)
                }

            } 
            catch (error) {
                console.log(error)
            }
            
        }
        getLocationalData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
   



  return (
    <div>
        {showSignUpRedux&&(
            <div className=' pointer-events-none bg-slate-500/50  h-screen w-full flex-col sm:flex-row  right-0 bottom-0 fixed flex justify-center items-center'>

                <div className='bg-white h-[85%] sm:h-3/4 relative rounded-3xl w-[90%] sm:w-2/3 z-20 pointer-events-auto shadow-md'>
                    
                    <CloseSlide/>
                    
                    <div className='h-full w-full flex justify-center items-center'>
                        <form onSubmit={CreateAccount} className='h-full w-full'>

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
                                    <PictureSlide setSlideIndex={setSlideIndex} slideIndex={slideIndex} profilePicUrl = {profilePicUrl} setProfileImage = {setProfileImage}/>
                                ):
                                slideIndex==3?
                                (
                                    <LocationSlide district={district} setDistrict={setDistrict} country={country} setCountry = {setCountry} state={state} setState = {setState} setSlideIndex={setSlideIndex} slideIndex={slideIndex}/>
                                ):
                                slideIndex==4?
                                (
                                    <CreateUser setSlideIndex ={setSlideIndex} slideIndex={slideIndex} />
                                )
                                :
                                (
                                    <FinishSlide firstname = {firstname} />

                                )
                            }






                        </form>
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