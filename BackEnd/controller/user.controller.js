
import { v2 as cloudinary } from 'cloudinary';
import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import createTokenSaveCookies from "../jwt/AuthToken.js"



export const register= async (req,res)=>{

   try {

   if (!req.files||Object.keys(req.files).length===0) {
      return res.status(400).json({message:"user photo is required"})
   }
   const {photo}=req.files
   const allowedFormats=["image/jpg","image/png","image/jpeg","image/webp"]
   if (!allowedFormats.includes(photo.mimetype)) {
      return res.status(400).json({message:"file must be in jpg and png format"})
   }
   const {email,name,password,phone,education,role}=req.body
   if (!email|| !name || !password  || !phone || !education || !role||!photo) {
     
    return res.status(400).json({message:"all fields are required"})
   }
    
    const user=await User.findOne({email})
    if (user) {
        return res.status(400).json({message:"user allready rugistered with this email"})
        
    }


   const cloudinaryResponse=await cloudinary.uploader.upload(
      photo.tempFilePath
   )
   if (!cloudinaryResponse||cloudinaryResponse.error) 
      {
      console.log(cloudinaryResponse.error);
      
   };
    const hashedpassword=await bcrypt.hash(password,10)  
    const newUser= new User({email,name,password:hashedpassword,phone,education,role,photo:{
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.url
    }});

   await newUser.save()
     if(newUser){
        const token= await createTokenSaveCookies(newUser._id,res)
        console.log("register",token);
        
        res.status(201).json({message:"user registered successsfully",newUser,token:token})


     }}
     catch (error) {
      // Catch any errors that occur during the registration process and respond with a 500 status
      console.error("Error during registration:", error);
      return res.status(500).json({ message: "An error occurred during registration", error });
  }
}


export const login=async(req,res)=>{
   const {email,password,role}=req.body
   try {
      if(!email||!password||!role){
         return res.status(400).json({message:"please fill required fields"})

      }
      const user = await User.findOne({ email }).select("+password")
      if(!user.password){
         return res.status(400).json({message:"user password is missing"})
      }
      const isMatch=await bcrypt.compare(password, user.password)
         if (!user||!isMatch) {
            return res.status(400).json({message:"invalid email or password"})
              
         }
         
         if(user.role!==role){
            return res.status(400).json({message:`given role ${role} not found`})
         }


     const token= await createTokenSaveCookies(user._id,res)  
     console.log("login",token);
     
     res.status(200).json({message:"user logged in successfully",user:{
          _id:user._id,
          name:user.name,
          email:user.email,
          role:user.role,

     },
     token:token,
   })
      


      
   } catch (error) {
      console.log(error);
      return res.status(500).json({error:"internal server error"})
      
      
   }
}

export const logout=(req,res)=>{
  try {
   res.clearCookie("jwt",{httpOnly:true})
   res.status(200).json({message:"user logged out successfully"})
   
  } catch (error) {
   return res.status(500).json({error:"internal server error"})
   
   
  }
}
export const getMyProfile=async(req,res)=>{
   const user=req.user;
   res.status(200).json(user)

}

export const getAdmins=async(req,res)=>{
   const admins=await User.find({role:"admin"})
   res.status(200).json(admins)

}