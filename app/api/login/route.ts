/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoConnect from "@/lib/utils/connectDB";
import Profile from "@/models/profileSchema";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'


export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
        }

        await mongoConnect();
        const user = await Profile.findOne({ email: email.toLowerCase() });

        if (!user) {
            return NextResponse.json({ message: "Account does not exist, create account", success: false }, { status: 401 });
        }
        
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return NextResponse.json({ message: "Invalid credentials", success: false }, { status: 401 });
        }
       
        const {password:_, ...userWithoutPassword} = user.toObject();
        return NextResponse.json({ message: 'Profile retrieved successfully', success: true, user: userWithoutPassword },{status:200});
    } catch (error) {
        console.error("Error during login:", error);
        return NextResponse.json({ message: "Internal server error", success: false }, { status: 500 });
    }
}