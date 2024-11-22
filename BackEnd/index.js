import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'

import fileUpload from 'express-fileupload'
import { v2 as cloudinary } from 'cloudinary';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path'


import userRouter from './routes/user.route.js'
import blogRouter from './routes/blog.route.js'

const app = express()


dotenv.config()


const port= process.env.PORT

//middle ware
app.use(express.json()) // to receive the data in json format
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));// to receive form data
app.use(cors({
   origin:process.env.FRONTEND_URL,
   credentials: true,
   methods:["GET","POST","DELETE","PUT"],

}));
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp",

})
)
const url=process.env.URL
// console.log(url);


//database code
try {
    mongoose.connect(url)
    console.log("connected to mongodb");
    
    
} catch (error) {
    console.log(error);
    
    
}

app.use("/api/users",userRouter)
app.use("/api/blogs",blogRouter)

//cloudinary setup code

// Configuration

if(process.env.NODE_ENV === "production")
    {
        const dirPath= path.resolve()
    
        app.use(express.static("./FrontEnd/dist"))
        app.get("*",(req,res)=>{
            res.sendFile(path.resolve(dirPath,"./Frontend/dist","index.html"))
        })
    }

cloudinary.config({ 
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME , 
    api_key: process.env.CLOUDINARY_API_KEY , 
    api_secret: process.env.CLOUDINARY_API_SECRET  // Click 'View API Keys' above to copy your API secret
});



app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`)
})