import mongoConnect from '../../../lib/utils/connectDB'
 export async function GET(request) {
  try {
    await mongoConnect()
    return Response.json({message:"Database connected"})
  } catch (error) {
    console.error("Database not connected",error)
    return Response.json({message:"Database error"},{status:500})
  }
  
 }