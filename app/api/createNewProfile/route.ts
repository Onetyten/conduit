import mongoConnect from "@/lib/utils/connectDB";
import Profile from "@/models/profileSchema";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'


export async function POST(request:Request){
    const {firstName,lastName,password,email,profilePicture,city,state,country} = await request.json()
    try {
        await mongoConnect()
        const existingAccount = await Profile.findOne({email})
        if (existingAccount){

            return NextResponse.json({message:"Email is already taken"},{status:400})
        }
        else{
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password,salt)

            const newProfile  = await new Profile({
                "firstName": firstName,
                "lastName": lastName,
                "email": email.toLowerCase(),
                "password": hashedPassword,
                "profilePicture": profilePicture,
                "isTalent": false,
                "location": {
                    "city": city,
                    "state": state,
                    "country": country
                },
                "totalSpent": 0
    
                })
    
            const createdProfile = await newProfile.save()
            // this is to delete the profile during testing to avoid unnecessaty database cluttering
            await Profile.findByIdAndDelete(createdProfile._id)
            
            return NextResponse.json({message:"User created successfully",userdata:createdProfile},{status:200})

        }
        


    } catch (error) {
        return NextResponse.json({ message: String(error) }, { status: 500 })
    }
}