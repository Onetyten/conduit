import mongoConnect from "@/lib/utils/connectDB";
import Profile from "@/models/profileSchema";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import { DEFAULT_PROFILE_IMAGE } from "@/lib/constants";



// eslint-disable-next-line @typescript-eslint/no-explicit-any
function safeParse<T = any>(value: FormDataEntryValue | null, fallback: T): T {
  if (typeof value === "string") {
    try {
      return JSON.parse(value) as T;
    } catch {
      return fallback;
    }
  }
  return fallback;
}

interface phoneNumberType{
    code:string,
    num:string,
}

export async function POST(request:Request){
    const userData = await request.formData()
    const firstName = userData.get('firstName') as string | null
    const lastName = userData.get('lastName') as string | null
    const email = userData.get('email') as string | null
    const phoneNumber = safeParse<phoneNumberType>(userData.get('phoneNumber'), { code: '', num: '' })
    const isTalent = userData.get('isTalent') === "true"
    const bio = userData.get('bio') as string | null
    const socialLinks = safeParse(userData.get("socialLinks"), {})
    const location = safeParse(userData.get("location"), {})
    const skills = safeParse<string[]>(userData.get("skills"), [])
    const password = userData.get('password') as string | null
    const profileImage = userData.get('profileImage') as File | null


    // set cloudinary config
    const cloudinaryConfig = cloudinary.config({
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
        let profileImageURL = DEFAULT_PROFILE_IMAGE

        if (profileImage){
            if (!cloudinaryConfig.cloud_name || !cloudinaryConfig.api_key || !cloudinaryConfig.api_secret) return
            if (!(profileImage instanceof Blob)){
                console.log("Invalid image format") 
                return 
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

        const newProfile  = await new Profile({ firstName, lastName, bio, socialLinks, skills, isTalent, location, email: email.toLowerCase(), password: hashedPassword,phoneNumber, "profilePicture": profileImageURL})

        const createdProfile = await newProfile.save()
        return NextResponse.json({message:"User created successfully",data:createdProfile},{status:200})


    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: 'Failed to create profile due to an internal server error' }, { status: 500 })
    }
}