import mongoose, { Schema } from "mongoose";

const tokenSchema = new mongoose.Schema({
    userId:{type:Schema.Types.ObjectId,ref:"Profile",required:true},
    code:{type:String, required:true},
    expiresAt:{type:Date, required:true},
    used:{type:Boolean,default:false},
    deleteAt: { type: Date, default: null }
})

tokenSchema.index({deleteAt:1},{expireAfterSeconds: 0,sparse:true})

const Token = mongoose.models.Tokens || mongoose.model("Tokens",tokenSchema)
export default Token