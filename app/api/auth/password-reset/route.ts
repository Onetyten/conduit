import getUserFromRequest from "@/lib/getUserFromRequest";
import mongoConnect from "@/lib/utils/connectDB";
import Profile from "@/models/profileSchema";
import { NextResponse } from "next/server";
import { getRandomValues } from "crypto";
import bcrypt from 'bcrypt'
import Token from "@/models/tokenSchema";

function generateOTP(){
    const code = new Uint32Array(1)
    getRandomValues(code)
    return (code[0]%1000000).toString().padStart(6,'0')
    
}


export async function POST(req:Request){
    const {password} = await req.json()
    if (!password) return NextResponse.json({message:"Password not provided"},{status:400})

    try{
        const userId = await getUserFromRequest(req)
        if (!userId) return NextResponse.json({message:"User not authorized"},{status:400})

        await mongoConnect()

        const userExists = await Profile.findById(userId)
        if (!userExists) return NextResponse.json({message:"User does not exist"},{status:404})
        
        const passwordCheck = await bcrypt.compare(password, userExists.password)

        if (!passwordCheck) return NextResponse.json({message:"Invalid credentials"},{status:400})

        const code = generateOTP()
        const expiresAt = Date.now()+10*60
        const OTP = await Token.create({ userId, code, expiresAt})

        await OTP.save()


        
        
        
        
        
    }
    catch{

    }

}