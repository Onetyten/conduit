import mongoConnect from "@/lib/utils/connectDB"
import Profile from "@/models/profileSchema"
import { NextResponse } from "next/server"




export async function GET(request:Request) {
    await mongoConnect()
    const {searchParams} = new URL(request.url)
    const limit = Number(searchParams.get("limit")) || 10

    try {
        const randomProfiles = await Profile.aggregate([
            {$match:{isTalent:true}},
            {$sample:{size:limit}}
        ])

        if (randomProfiles.length===0){
            return NextResponse.json({message:"no service provider found"},{status:404})
        }

        return NextResponse.json({message:"profiles fetched successfully",data:randomProfiles},{status:200})
    }

    catch (error) {
        return NextResponse.json({message:"internal server error",error:error instanceof Error? error.message : String(error)}, {status:500})
    }
}