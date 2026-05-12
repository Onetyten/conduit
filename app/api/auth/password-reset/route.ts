import getUserFromRequest from "@/lib/getUserFromRequest";
import mongoConnect from "@/lib/utils/connectDB";
import Profile from "@/models/profileSchema";
import { NextResponse } from "next/server";
import { getRandomValues } from "crypto";
import bcrypt from 'bcrypt'
import Token from "@/models/tokenSchema";
import {Resend} from "resend"
import ResetOTP from "@/components/email-template/ResetOTP";



function generateOTP(){
    const code = new Uint32Array(1)
    getRandomValues(code)
    return (code[0]%1000000).toString().padStart(6,'0')
    
}

const resend = new Resend(process.env.RESEND_API_KEY)



export async function POST(req:Request){
    const {password} = await req.json()
    if (!password) return NextResponse.json({message:"Password not provided"},{status:400})

    try{
        const {password} = await req.json()
        if (!password) return NextResponse.json({message:"Password not provided"},{status:400})
        const userId = getUserFromRequest(req)
        if (!userId) return NextResponse.json({message:"User not authorized, please login"},{status:401})

        await mongoConnect()

        const userExists = await Profile.findById(userId)
        if (!userExists) return NextResponse.json({message:"User does not exist"},{status:404})
        
        const passwordCheck = await bcrypt.compare(password, userExists.password)

        if (!passwordCheck) return NextResponse.json({message:"Invalid credentials"},{status:400})

        const code = generateOTP()
        const expiresAt = new Date(Date.now()+10*60*1000)
        const OTP = await Token.create({ userId, code, expiresAt})

        await OTP.save()

        const {error} = await resend.emails.send({
            from:'noreply@mail.onetyten.click',
            to:[userExists.email],
            subject:'Password Reset',
            react:ResetOTP({firstname:userExists.firstName,code})
        })

        if (error){
            return NextResponse.json({message:"Error while sending data",error},{status:500})
        }
        return NextResponse.json({message:"Please check you email for the reset code",data: { expiresAt: OTP.expiresAt }},{status:200})        
    }
    catch(error){
        console.error(error)
        return NextResponse.json({ message: 'Failed to create profile due to an internal server error' }, { status: 500 })
    }

}