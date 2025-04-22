import jwt from "jsonwebtoken"
import { ENV_VARS } from "../config/envVars.js"

const protectAdmin = async (req,res,next)=>{
  try {
    const token = req.cookies["jwt-Clean"]

    if(!token){
      return res.status(401).json({success: false,message: "Unauthorized - No token provided"})
    }
    const decoded = jwt.verify(token,ENV_VARS.JWT_SECRET)

    if(!decoded){
      return res.status(401).json({success: false,message: "Unauthorized - Invalid token"})
    }

    const user = await User.findById(decoded.userId).select("-password")

    if(!user){
      return res.status(404).json({success: false,message: "User not found"})
    }

    req.user = user
    next()

  } catch (error) {
    console.log("Error in protectRoutes middleWare",error.message)
    res.status(500).json({success: false, message: "Internal server error"})
  }
}

export default protectRoutes