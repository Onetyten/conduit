import mongoConnect from "@/lib/utils/connectDB";
import Profile from "@/models/profileSchema";
import fs from 'fs'
import { NextResponse } from "next/server";



export async function POST() {
  try {
    
    await mongoConnect()
    await Profile.deleteMany()
    const profiles = await JSON.parse(fs.readFileSync('jsons/profiles.json','utf-8'))
    console.log("All Profiles:", profiles);
    await Profile.insertMany(profiles)
    return NextResponse.json({message:'Profile seeded successsfully',TalentIds:profiles})
  } catch (error) {
    console.error("error seeding profiles",error)
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return NextResponse.json({message:errorMessage},{status:500})
  }
  
}