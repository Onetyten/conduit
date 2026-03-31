import mongoConnect from "@/lib/utils/connectDB";
import { NextResponse } from "next/server";
import getUserFromRequest from "@/lib/getUserFromRequest";
import { updateViews } from "@/services/updateViews.services";


export async function PATCH(request:Request) {
    const {id} = await request.json()
    await mongoConnect()

    try {
        const userId = getUserFromRequest(request)
        if(!id){
            return NextResponse.json({message:'missing id'},{status:404})
        }
        if(!userId){
            return NextResponse.json({message:'user not logged in '},{status:404})
        }
        const viewCount = await updateViews(id,userId)
        if (viewCount === null || viewCount === undefined){
            return NextResponse.json({ message: "Failed to update views", error: "Invalid input" },
            { status: 404 })
        }

        return NextResponse.json({message:`views updated successfully. Total views: ${viewCount}`,viewCount, serviceId:id},{status:200})
    }

    catch (error) {
        return NextResponse.json({error:`{internal server error ${error}}`}, {status:500})
    }

    
}