
import { v2 as cloudinary } from 'cloudinary';
import { Blog } from "../models/blog.model.js"
import mongoose from 'mongoose';

export const createBlog= async (req,res)=>{

    try {
 
    if (!req.files||Object.keys(req.files).length===0) {
       return res.status(400).json({message:"Blog Image is required"})
    }
    const {blogImage}=req.files
    const allowedFormats=["image/jpg","image/png","image/jpeg","image/webp"]
    if (!allowedFormats.includes(blogImage.mimetype)) {
       return res.status(400).json({message:"file must be in jpg and png format"})
    }
    const {tittle,catagory,about}=req.body
    if (!tittle|| !catagory || !about) {
      
     return res.status(400).json({message:"tittle,catagory and about are required"})
    }
     
    
 
    const adminName=req?.user?.name;
    const adminPhoto=req?.user?.photo?.url;
    const createdBy=req?.user?._id;

    const cloudinaryResponse=await cloudinary.uploader.upload(
       blogImage.tempFilePath
    )
    if (!cloudinaryResponse||cloudinaryResponse.error) 
       {
       console.log(cloudinaryResponse.error);
       
    };
     
     const blogData={tittle,about,catagory,adminName,adminPhoto,createdBy,
        blogImage:{
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.url

     }};
 
    const blog=await Blog.create(blogData);

      
        
         
         res.status(201).json({message:"Blog created successfully",blog})
 
   
    }
      catch (error) {
       // Catch any errors that occur during the registration process and respond with a 500 status
       console.log(error);
       
       return res.status(500).json({ message: "should contain at least 200 characters", error });
   }
 }
 export const deleteBlog = async (req, res) => {
   const { id } = req.params;
   
   // Check if `id` is a valid MongoDB ObjectId
   if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid blog ID format" });
   }

   try {
      const blog = await Blog.findById(id);
      
      if (!blog) {
         return res.status(400).json({ message: "Blog not found" });
      }

      await blog.deleteOne();
      return res.status(200).json({ message: "Blog deleted successfully" });
   } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error", error });
   }
};


export const getAllBlogs=async(req,res)=>{
   const allBlogs= await Blog.find()
   res.status(200).json(allBlogs)
}


export const getSingleBlog=async(req,res)=>{
   const {id}=req.params
   if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid blog ID format" })

      }
   const blog= await Blog.findById(id)
   if (!blog) {
      return res.status(400).json({ message: "Blog not found" });

      
   }
   res.status(200).json(blog)
}

export const getmyBlogs =async(req,res)=>{
   const createdBy=req.user._id;
   const myBlogs=await Blog.find({createdBy})
   res.status(200).json(myBlogs)
}

export const updateBlog = async (req, res) => {
   const { id } = req.params;
   
   // Check if `id` is a valid MongoDB ObjectId
   if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid blog ID" });
   }

   try {
      // Attempt to update the blog
      const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
      
      if (!updatedBlog) {
         return res.status(400).json({ message: "Blog not found" });
      }

      res.status(200).json(updatedBlog);
   } catch (error) {
      console.log("Update error:", error); // Log any potential errors
      res.status(500).json({ message: "Internal server error", error });
   }
};

