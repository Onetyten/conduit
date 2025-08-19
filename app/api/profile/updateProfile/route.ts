import mongoConnect from "@/lib/utils/connectDB";
import Profile from "@/models/profileSchema";
import { NextResponse } from "next/server";


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


export async function PATCH(request:Request){
    await mongoConnect()
    const userData = await request.formData()
    const _id = userData.get('_id') as string | null
    const firstName = userData.get('firstName') as string | null
    const lastName = userData.get('lastName') as string | null
    const isTalent = userData.get('isTalent') === "true"
    const bio = userData.get('bio') as string | null
    const socialLinks = safeParse(userData.get("socialLinks"), {})
    const location = safeParse(userData.get("location"), {})
    const skills = safeParse<string[]>(userData.get("skills"), [])
    const password = userData.get('password') as string | null
    
    try {
        const user = await Profile.findById(_id)  
        if (!user){
            return NextResponse.json({message:"profile update failed, user not found"},{status:404} )
        }
        if (firstName && firstName.length>0){
            user.firstName = firstName
        }
        if (lastName && lastName.length>0){
            user.lastName = lastName
        }
        if (password && password.length>0){
            user.password = password
        }
        if (bio && bio.length>0){
            user.bio = bio
        }
        if (socialLinks){
            user.socialLinks = socialLinks
        }
        if (location){
            user.location = location
        }
        if (skills){
            user.skills = skills
        }
        user.isTalent = isTalent
        
        const savedUser = await user.save()
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...safeUser } = savedUser.toObject();
        return NextResponse.json({message:'Profile edited successfully',data:safeUser},{status:200})



    }
    catch (error) {
        console.error(error)
        return NextResponse.json({ message: 'Failed to update profile due to an internal server error' }, { status: 500 }) 
    }
    
    

}