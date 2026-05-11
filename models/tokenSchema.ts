import mongoose, { Schema } from "mongoose";

const tokenSchema = new mongoose.Schema({
    userId:{type:Schema.Types.ObjectId,ref:"Profile",required:true},
    code:{type:String, required:true},
    attempts:{type:Number,default:0},
    expiresAt:{type:Date, required:true},
    used:{type:Boolean,default:false}
})

tokenSchema.index({expiresAt:1},{expireAfterSeconds: 0})

const Token = mongoose.models.Tokens || mongoose.model("Tokens",tokenSchema)
export default Token