const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

// auth
exports.auth = async(req,res,next) =>{
    try{

      console.log(req.body, " in auth")
      const token = req.body.token;

       if(!token){
        console.log("yes")
         return res.status(400).json({
            success:false,
            message:"token is missing",
         });
       }
       
       console.log("Here")

        // verify the token
        try{
        const decode = jwt.verify(token,process.env.SECRET_KEY);
        console.log(decode);
        req.user = decode;
        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:"Issue is invalid",
            });
        }
        next();
    }
    catch(error){
          return res.status(401).json({
            success:false,
            message:"Something went wrong ",
          });
    }
}

// isAdmin
exports.isAdmin = async(req,res,next)=>{
    try{
        if(req.user.accountType !== "Admin"){
          return res.status(401).json({
            success:false,
            message:"This is protected route for Admin only",
          })
        }
        next();
    }
    catch(error){
         return res.status(500).json({
            success:false,
            message:"User role cannot be verify, please try again",
         });
    }
};

// isUser
exports.isUser = async(req,res,next)=>{
    try{
      if(req.user.accountType !== "User"){
        return res.status(401).json({
            success:false,
            message:"This is the protected route for User",
        });
      }
      next();
    }
    catch(error){
      return res.status(500).json({
        success:false,
        message:"User role cannot be verify, please try again",
      });
    }
};