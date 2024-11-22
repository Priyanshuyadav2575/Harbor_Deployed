import mongoose, { Types } from "mongoose";
import validator from "validator";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"please enter a valid email"]

    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    photo:{
        
            public_id:{
                type:String,
                required:true


            },
            url:{
                type:String,
                required:true

            },
        
       
    },
    education:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:["user","admin"]
    },
    password:{
        type:String,
        required:true,
        select:false,//hide password
        minlength:5
    },
    token:{
        type:String,

    },
    createdAt:{
        type:Date,
        default:Date.now,
    }

    
})

export const User=mongoose.model("user",userSchema)