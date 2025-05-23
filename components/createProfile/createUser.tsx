import React from 'react'
import NavigationButton from '../NavigationButton'

interface propTypes{
    setSlideIndex: React.Dispatch<React.SetStateAction<number>>
    slideIndex:number
    email:string
    firstname :string
    lastname :string
    password :string
    city :string
    country :string
    state :string
    profilePic :string
}




export default function CreateUser(props:propTypes) {
    const {setSlideIndex,slideIndex,firstname,email,lastname,password,city,country,state,profilePic} = props

    function Prev() {
        setSlideIndex(slideIndex-1)
    }

    async function CreateAccount(){
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/createNewProfile`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({firstName:firstname,lastName:lastname,password:password,email:email,profilePicture:profilePic,city:city,state:state,country:country})
        })
        

        if (!response.ok){
            const errorBody  = await response.json() 
            console.log(errorBody)
        }

        else{
            const responsedata  = await response.json()
            console.log(responsedata.userdata)
            setSlideIndex(slideIndex+1)
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
