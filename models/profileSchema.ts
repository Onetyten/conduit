import mongoose from "mongoose";
const profileSchema  = new mongoose.Schema({
    firstName:{type:String},
    lastName:{type:String},
    password:{type:String},
    email:{type:String,
        unique:true,
        trim:true,
        lowercase:true
    },
    profilePicture:{type:String, default:'https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png'},
    bio:{type:String},
    isTalent:{type:Boolean},
    skills:[{type:String}],
    serviceCategories: [{ type: String }],
    hourlyRate:{type:Number},
    portfolio:{type:String},
    companyName: { type: String },
    companyDescription: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    location:{
        city:{type:String},
        state:{type:String},
        country:{type:String}
    },
    totalSpent:{type:Number,default:0},
    

})
const Profile = mongoose.models.Profile || mongoose.model('Profile',profileSchema)
export default Profile