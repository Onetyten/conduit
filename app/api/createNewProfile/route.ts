import mongoConnect from "@/lib/utils/connectDB";
import Profile from "@/models/profileSchema";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'



export async function POST(request:Request){
    const userData = await request.formData()
    const firstName = userData.get('firstName') as string | null
    const lastName = userData.get('lastName') as string | null
    const email = userData.get('email') as string | null
    const password = userData.get('password') as string | null
    const state = userData.get('state') as string | null
    const district = userData.get('district') as string | null
    const country = userData.get('country') as string | null
    const profileImage = userData.get('profileImage') as File | null


    // set cloudinary config
    cloudinary.config({
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
        api_key:process.env.CLOUDINARY_API_KEY,
        api_secret:process.env.CLOUDINARY_API_SECRET
    })

    try {
        if (!firstName || !lastName || !email || !password){
            return NextResponse.json({message:"Missing required user data"},{status:400})
        }
        await mongoConnect() 
        const existingAccount = await Profile.findOne({email})
        if (existingAccount){

            return NextResponse.json({message:"Email is already taken"},{status:400})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        let profileImageURL = 'https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png'

        if (profileImage){
            if (!(profileImage instanceof Blob)){
                return NextResponse.json({message:"Invalid image format"},{status:400})
            }
            const arrayBuffer = await profileImage.arrayBuffer()
            const buffer = Buffer.from(arrayBuffer)

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const uploadResult:any = await new Promise((resolve,reject)=>{
                const uploadStream = cloudinary.uploader.upload_stream(
                    {folder:"conduit_profiles"},
                    (error,result)=>{
                        if (error) return reject(error)
                        resolve(result)
                    }
                )
                uploadStream.end(buffer)
            })

            profileImageURL = uploadResult.secure_url

        }

        const newProfile  = await new Profile({
            "firstName": firstName,
            "lastName": lastName,
            "email": email.toLowerCase(),
            "password": hashedPassword,
            "profilePicture": profileImageURL,
            "isTalent": false,
            "location": {
                "district": district,
                "state": state,
                "country": country
            },
            "totalSpent": 0

            })

        const createdProfile = await newProfile.save()
        return NextResponse.json({message:"User created successfully",data:createdProfile},{status:200})


    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: 'Failed to create profile due to an internal server error' }, { status: 500 })
    }
}

