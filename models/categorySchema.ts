import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        default:"Other",
        trim:true,
        unique:true,
    },
    iconUrl:{
        type:String,
        trim:true
    }
},{
    timestamps:true
})
const Categories = mongoose.models.Categories || mongoose.model("Categories",categorySchema)
export default Categories

