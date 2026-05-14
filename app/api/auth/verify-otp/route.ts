import getUserFromRequest from "@/lib/getUserFromRequest"
import Token from "@/models/tokenSchema"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import mongoConnect from "@/lib/utils/connectDB"



export async function POST(req:Request) {
    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret){
        return NextResponse.json({ message: "Internal server error", success: false }, { status: 500 });
    }
    try {
        await mongoConnect()
        const {code} = await req.json()
        if (!code) return NextResponse.json({message:"Please try again"},{status:400})
        const userId = getUserFromRequest(req)
        if (!userId) return NextResponse.json({message:"User not authorized, please login"},{status:401})
        
        const OTPExists = await Token.findOne({userId,code})
        if (!OTPExists) return NextResponse.json({message:"The code entered was incorrect, please try again"},{status:400})
        
        if (Date.now() > OTPExists.expiresAt) return NextResponse.json({message:"The code entered has expired, please request another code"},{status:400})

        if (OTPExists.used===true) return NextResponse.json({message:"The code entered has been used, please request another code"},{status:400})
       
        const payload = {
            id:OTPExists._id,
            userId
        }
        
        const resetToken = jwt.sign(payload,jwtSecret,{expiresIn:'10m'})

        OTPExists.used = true
        OTPExists.deleteAt = null
        
        await OTPExists.save()
        return NextResponse.json({message:"verification successful",token:resetToken},{status:200})
    }

    catch (error) {
        console.error("Error during otp verification:", error);
        return NextResponse.json({ message: "Internal server error", success: false }, { status: 500 });  
    }
    
}