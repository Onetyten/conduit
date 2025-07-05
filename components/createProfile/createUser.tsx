import React from 'react'
import NavigationButton from '../NavigationButton'
import axios from 'axios'

interface propTypes{
    setSlideIndex: React.Dispatch<React.SetStateAction<number>>
    setUploadingProfile:React.Dispatch<React.SetStateAction<boolean>>
    slideIndex:number
    firstname :string
    email :string
    lastname :string
    password :string
    district :string
    country :string
    state :string
    profileImage :File | null
}





export default function CreateUser(props:propTypes) {
    const {setSlideIndex,slideIndex,firstname,email,lastname,password,country,state,district,profileImage,setUploadingProfile} = props

    function Prev() {
        setSlideIndex(slideIndex-1)
    }

    async function CreateAccount(){
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

        console.log(userData)

        try {
            const response = await axios.post(`/api/createNewProfile`,userData)
            if (response.status != 200) return
            console.log(response)
            setSlideIndex(slideIndex+1)
            setUploadingProfile(false)

        }
        catch (error) {
             console.log(error)
             alert("A error occured while creating your profile")
             setUploadingProfile(false)

        }
        
    } 
  return (
    <div className='h-full w-full px-[10%]'>
        <div className='flex flex-col justify-center items-center w-full h-full gap-8'>
            <p className='lg:text-2xl text-lg  font-semibold '>Create your conduit profile</p>
            <button  onClick={CreateAccount}  className='rounded-lg bg-foreground text-background hover:bg-conduit p-2 px-8'>
                    Create Profile
            </button>
            <div className='flex gap-6'>
                <NavigationButton direction={0} Click={Prev}/>
                
            </div>
            
            
        </div>  
    </div>
  )
}
