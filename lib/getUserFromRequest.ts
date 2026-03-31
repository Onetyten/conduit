import jwt from "jsonwebtoken"

export default function getUserFromRequest(req:Request){
    try{
        const token = req.headers.get("authorization")?.split(' ')[1]
        if (!token) return null
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as {id:string}
        return payload.id
    }
    catch{
        return null
    }
}