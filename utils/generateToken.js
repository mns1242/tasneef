import jwt from 'jsonwebtoken'
import { ENV_VARS } from '../config/envVars.js'

export const generateTokenAndSetCookie = (admin,res)=>{
  const token = jwt.sign(admin,ENV_VARS.JWT_SECRET,{expiresIn: "15d"})

  res.cookie("jwt-Clean",token,{
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in MS
    httpOnly: true, // prevent XSS attacks cross-site scripting attack
    sameSite: "strict", // CSRF attacks cross-site forgery attacks
    secure: ENV_VARS.NODE_ENV !== "development"
  })

  return token
}