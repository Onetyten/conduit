import mongoConnect from "@/lib/utils/connectDB";
import Profile from "@/models/profileSchema";
import fs from 'fs'
import { NextResponse } from "next/server";



export async function GET() {
  try {
    
    await mongoConnect()
    await Profile.deleteMany()
    const profiles = await JSON.parse(fs.readFileSync('jsons/client.json','utf-8'))
    const talentProfiles = await JSON.parse(fs.readFileSync('jsons/talent.json','utf-8'))
    const allProfiles = [...talentProfiles,...profiles]; 
    console.log("All Profiles:", allProfiles);
    // const talentIds = allProfiles.filter(profile=>profile.isTalent == true).map(profile=>profile._id.toString())

    await Profile.insertMany(allProfiles)
    
    return NextResponse.json({message:'Profile seeded successsfully',TalentIds:allProfiles})
    
  } catch (error) {
    console.error("error seeding profiles",error)
    return NextResponse.json({message:error.message},{status:500})
  }
  
}