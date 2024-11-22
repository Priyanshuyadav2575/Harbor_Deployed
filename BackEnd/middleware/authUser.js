import { User } from "../models/user.model.js"
import jwt from "jsonwebtoken"
// authentication middleware
export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        console.log("Received token:", token); // Log the received token
        
        if (!token) {
            return res.status(401).json({ error: "User is not authenticated" });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.userId);
        
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error occurred in authentication middleware:", + error);
        return res.status(401).json({ error: "User is not authenticated" });
    }
};


//authorization
export const isAdmin=(...roles)=>{
    return(req,res,next)=>{
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: `user with given role ${req.user.role} not allowed` });


            
        }
        next();


    }

}