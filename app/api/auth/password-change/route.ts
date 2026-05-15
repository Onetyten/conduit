import Profile from '@/models/profileSchema'
import Token from '@/models/tokenSchema'
import Joi from 'joi'
import jwt from "jsonwebtoken"
import { NextResponse } from 'next/server'
import bcrypt from "bcrypt"
import mongoConnect from '@/lib/utils/connectDB'


const passwordValidateSchema = Joi.object({
    password: Joi.string().min(8).max(100).required().messages({
        'string.min': 'Password must be at least 8 characters',
        'string.max': 'Password cannot exceed 100 characters',
        'string.empty': 'Password is required',
        'any.required': 'Password is required'
    })
})


export async function POST(req:Request){
    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) return NextResponse.json({ message: "Internal server error", success: false }, { status: 500 });

    try {
        await mongoConnect()
        const body = await req.json()
        const {error,value} = passwordValidateSchema.validate(body)
        if (error) return NextResponse.json({message:error.message},{status:400})
        const {password}  = value
        const token = req.headers.get("authorization")?.split(' ')[1]
        if (!token) return NextResponse.json({message:"User is not authorised"},{status:401})
        let payload: {id:string, userId:string}
        try {
            payload = jwt.verify(token, jwtSecret) as {id:string, userId:string}
        } catch {
            return NextResponse.json({message:"Your OTP has expired, please request a new code"},{status:401})
        }


        const user = await Profile.findById(payload.userId).populate('serviceCount')
        if (!user) return NextResponse.json({message:"User does not exist"},{status:404})
        const otp = await Token.findOne({_id:payload.id,userId:payload.userId})
        if (!otp) return NextResponse.json({message:"Invalid token"},{status:404})
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        user.password = hashedPassword
        await user.save()
        await Token.deleteOne({_id: payload.id})
        const newPayload = {
            id:user._id
        }
        const newToken = jwt.sign(newPayload,jwtSecret)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {password:_, ...userWithoutPassword} = user.toObject();

        

        return NextResponse.json({message:"password changed successfully", success: true, user: userWithoutPassword, token:newToken},{status:200})

        
    }
    catch (error) {
        console.error("Error while changing password:", error);
        return NextResponse.json({ message: "Internal server error", success: false }, { status: 500 });  
    }
}