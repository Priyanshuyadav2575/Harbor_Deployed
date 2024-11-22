import mongoose, { Types } from "mongoose";


const blogSchema=new mongoose.Schema({
    tittle:{
        type:String,
        required:true
    },
   
    
   
    blogImage:{
        
            public_id:{
                type:String,
                required:true


            },
            url:{
                type:String,
                required:true

            },
        
       
    },
    catagory:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true,
        
    },
    adminName:{
        type:String,
       
    },
       
    adminPhoto:{
        type:String,
       

    },
    createdBy:{
        type:mongoose.Schema.ObjectId,
       ref:"user"
    }

    
})

export const Blog=mongoose.model("Blog",blogSchema)