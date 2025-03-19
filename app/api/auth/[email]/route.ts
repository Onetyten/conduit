import mongoConnect from "@/lib/utils/connectDB"
import Profile from "@/models/profileSchema"
import { NextResponse } from "next/server"

interface Params{
    email:string
}
export async function GET(request:Request ,{params}:{params:Params}) {
    const {email} = params
    try {
        await mongoConnect()
        const user  = await Profile.findOne({email})
        if (!user){
            return NextResponse.json({message:'This profile dosent exist'})
        }
        return NextResponse.json({message:'Profile retrieved successfully',user})
    } catch (error) {
        console.error("Error getting profile",error)    
        return NextResponse.json({error:'internal server error'},{status:500})
    }
    
}