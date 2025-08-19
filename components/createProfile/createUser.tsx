import React from 'react'
import NavigationButton from '../NavigationButton'
import { NewUserType } from '@/lib/types'
import {toast} from 'react-toastify'
import axios from 'axios'

interface propTypes{
    setSlideIndex: React.Dispatch<React.SetStateAction<number>>
    setUploadingProfile:React.Dispatch<React.SetStateAction<boolean>>
    slideIndex:number
    newUser:NewUserType
    isUser:boolean
}







export default function CreateUser(props:propTypes) {
    
    const {setSlideIndex,slideIndex,newUser,setUploadingProfile,isUser} = props
    
    async function UpdateAccount(){
        // console.log(newUser)
        setUploadingProfile(true)
        // const userData = new FormData()
        // userData.append('firstName',newUser.firstname)
        // userData.append('lastName',newUser.lastname)
        // userData.append('email',newUser.email)
        // userData.append('isTalent',newUser.isTalent.toString())
        // userData.append('bio',newUser.bio)
        // userData.append('socialLinks',JSON.stringify(newUser.socialLinks))
        // userData.append('location',JSON.stringify(newUser.location))
        // userData.append('skills',JSON.stringify(newUser.skills))
        // userData.append('password',newUser.password)
        // if (newUser.profileImage) userData.append('profileImage',newUser.profileImage)
        try {
            // const response = await axios.post(`/api/createNewProfile`,userData)
            // if (response.status != 200) return
            // setSlideIndex(slideIndex+1)
            // setUploadingProfile(false)
            toast.success("Account Updated successfully")
        }
        catch {
            toast("A error occured while updating your profile")
        }
        finally{
            setUploadingProfile(false)
        }
        
    } 

    async function CreateAccount(){
        // console.log(newUser)
        setUploadingProfile(true)
        const userData = new FormData()
        userData.append('firstName',newUser.firstname)
        userData.append('lastName',newUser.lastname)
        userData.append('email',newUser.email)
        userData.append('isTalent',newUser.isTalent.toString())
        userData.append('bio',newUser.bio)
        userData.append('socialLinks',JSON.stringify(newUser.socialLinks))
        userData.append('location',JSON.stringify(newUser.location))
        userData.append('skills',JSON.stringify(newUser.skills))
        userData.append('password',newUser.password)

        if (newUser.profileImage) userData.append('profileImage',newUser.profileImage)
        try {
            const response = await axios.post(`/api/createNewProfile`,userData)
            if (response.status != 200) return
            setSlideIndex(slideIndex+1)
            setUploadingProfile(false)
            toast.success("Account created successfully, signin")
        }
        catch {
            toast("A error occured while creating your profile")
        }
        finally{
            setUploadingProfile(false)
        }
        
    } 

    async function AccountAction(){
        if (isUser)
        {
            UpdateAccount()
        }
        else
        {
            CreateAccount()
        }
    } 




    function Prev() {
        if (isUser){
            return setSlideIndex(slideIndex-1)
        }
        if (newUser.isTalent){
            setSlideIndex(slideIndex-1)
        }
        else{
            setSlideIndex(slideIndex-3)
        }

        console.log("is talent",newUser.isTalent)
    }

    
  return (
    <div className='h-full w-full px-[10%]'>
        <div className='flex flex-col justify-center items-center w-full h-full gap-8'>
            <p className='lg:text-2xl text-lg  font-semibold '>{isUser?"Start earning with Conduit ":"Create your conduit profile"}</p>
            <button onClick={AccountAction} className='text-sm sm:text-base rounded-lg bg-foreground text-background hover:bg-conduit p-2 px-8'>
                    {isUser?"Offer services":"Create profile"}
            </button>
            <div className='flex gap-6'>
                <NavigationButton direction={0} Click={Prev}/>
            </div>
            
            
        </div>  
    </div>
  )
}
