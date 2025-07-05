/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoConnect from "@/lib/utils/connectDB";
import Profile from "@/models/profileSchema";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'


interface Params {
    email: string;
}

export async function POST(request: Request, context: { params: Params }) {
    const { email } = context.params;
    const { password } = await request.json(); // Ensure proper async parsing

    try {
        await mongoConnect();
        const user = await Profile.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: "This profile doesn't exist",success:false }, { status: 404 });
        }
        
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return NextResponse.json({ message: "Invalid password",success:false }, { status: 401 });
        }
       
        const {password:_, ...userwithoutPassword} = user.toObject()
        return NextResponse.json({message:'profile retrieved successfully',success:true,user:userwithoutPassword})
    } 
    
    catch (error) {
        console.error("Error getting profile", error);
        return NextResponse.json({ error: "Internal server error",success:false }, { status: 500 });
    }
}
