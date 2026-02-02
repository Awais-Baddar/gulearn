import jwt from 'jsonwebtoken'
import User from '../src/models/User.js'



export const protectRoute= async ( req , res, next)=>{


    try {
        const token=req.cookies.jwt;
        if(!token)
        {
            return res.status(401).json({message:"unauthirized - token not provided"})
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)

        if(!decoded)
            return res.status(401).json({message:"invalid token provided"})

        const user= await User.findById(decoded.userId).select("-password")
        
        if(!user)
            return res.status(401).json({message:"no such user"})
        req.user=user;
        next();
        
    } catch (error) {
        console.log("Error in Profec route middleware ",error)
            return res.status(500).json({message:"Internal Server Error"})

    }
}