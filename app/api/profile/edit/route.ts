import mongoConnect from "@/lib/utils/connectDB";
import Profile from "@/models/profileSchema";
import { NextResponse } from "next/server";
import getUserFromRequest from "@/lib/getUserFromRequest";


export async function PATCH(request:Request){
    
    try {
        await mongoConnect()
        const userEdit = await request.json()
        const userId = getUserFromRequest(request)
        if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

        if (!userEdit || Object.keys(userEdit).length===0) return NextResponse.json({message:"Bad request, data not added"},{status:401})

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, __v, password, createdAt, ...secureEdit } = userEdit

        const patchedUser = await Profile.findByIdAndUpdate(userId,{$set:secureEdit},{new:true,runValidators:true})
        const {password:_, ...userWithoutPassword} = patchedUser.toObject();

        if (!patchedUser) return NextResponse.json({ message: 'User not found' }, { status: 404 })
        console.log(patchedUser)

        return NextResponse.json({message:'Profile edited successfully',user:userWithoutPassword},{status:200})

    }
    catch (error) {
        console.error(error)
        return NextResponse.json({ message: 'Failed to update profile due to an internal server error' }, { status: 500 }) 
    }
    
    

}