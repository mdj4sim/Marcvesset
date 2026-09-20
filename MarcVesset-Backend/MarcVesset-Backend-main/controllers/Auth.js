const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.signup = async(req,res)=>{
    try{
      console.log(req.body);

      const [name,email,password,confirmPassword,accountType] = [...req.body];

        if(!name || !email || !password || !accountType ||!confirmPassword){
          return res.status(400).json({
            success:false,
            message:"All fields are required",
          });
        }

        if(password !== confirmPassword){
          return res.status(400).json({
            success:false,
            message:"The confirmPassword not match"
          })
        }

        console.log("Yes")

        const existingUser = await User.findOne({email});

        console.log("Find ", existingUser)
        
        if(existingUser){
         return res.status(401).json({
            success:false,
            message:"user already exist",
         });
        }


        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password,10);
        }
        catch(error){
            console.log(error);
            return res.status(500).json({
              success:false,
              message:error.message,
            });
        }

        // create entry of user in database
        const user = await User.create({
            name,
            email,
            password:hashedPassword,
            accountType
        });



        return res.status(200).json({
            success:true,
            message:"user signup successfully",
            data:user,
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User cannot registered , please try again",
        })
    }
};

exports.login = async(req,res)=>{
    try{
       const [name,email,password] = req.body;
        // All validation
        if(!name||!email || !password){
          return res.status(402).json({
            success:false,
            message:"All fields are required",
          });
        }

        // check email

        const user = await User.findOne({email});
        if(!user){
          return res.status(402).json({
            success:false,
            message:"User not registered, GO first signup",
          });
        };

        console.log(user);
        
  
        const payload = {
            name:user.name,
            email:user.email,
            id:user._id,
            accountType:user.accountType,
        };

        if(await bcrypt.compare(password,user.password)){
             
            //   console.log(payload);
              const token = jwt.sign(payload,process.env.SECRET_KEY,{
                expiresIn:"2h",
              });
           
              user.token = token;
              user.password = undefined;

            //   create cookie
            const options = {
                expires: new Date(Date.now()+ 3*24*60*60*1000),
                httpOnly:true,
            }

            res.cookie("token" , token , options).status(200).json({
                success:true,
                token,
                user,
                message:"logged in successfully",
            });
        }
            else{
                return res.status(500).json({
                    success:false,
                    message:"password is incorrect",
                });
            }
    }
    catch(error){
       console.log(error);
       return res.status(500).json({
        success:false,
        message:"Login fail , please try again",
       });
    }
};