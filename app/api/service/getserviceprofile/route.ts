import { NextResponse } from "next/server";
import mongoConnect from "@/lib/utils/connectDB";
import Profile from "@/models/profileSchema";


export async function POST(request: Request){
    const {user_id} =  await request.json()
    try {
        await mongoConnect()
        const userdata  = await Profile.findById(user_id)
        if(!userdata){
            return NextResponse.json({message:"No user using this ID, somethings wrong" },{status:404})
        }
        return NextResponse.json({message:"User retrieved successfully",user:userdata},{status:200})
        
    } catch (error) {
        console.error(error)
        if (error instanceof Error){
            return NextResponse.json({message:error.message},{status:500})
        }
        else{
            return NextResponse.json({ message: String(error) }, { status: 500 })
        }
     
    }


}