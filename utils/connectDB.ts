import mongoose from 'mongoose'
const MONGO_URL = process.env.MONGO_URL

if(!MONGO_URL){
    throw new Error("No Database url available")
}

let cached = global.mongoose;