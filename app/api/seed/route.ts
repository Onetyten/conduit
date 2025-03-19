import mongoConnect from "@/lib/utils/connectDB";
import Profile from "@/models/profileSchema";
import fs from 'fs'
import { NextResponse } from "next/server";



export async function GET() {
  try {
    await mongoConnect()
    const profiles =await JSON.parse(fs.readFileSync('client.json','utf-8'))
    for (const profileData of profiles){
      const profile = new Profile({...profileData,})
      await profile.save()
    }
    return NextResponse.json({message:'Profile seeded successsfully '})
    
  } catch (error) {
    console.error("error seeding profiles",error)
    return NextResponse.json({message:error.message},{status:500})
  }
  
}