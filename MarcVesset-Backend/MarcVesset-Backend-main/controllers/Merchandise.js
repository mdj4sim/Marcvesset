const Merchandise = require("../models/Merchandise");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
require("dotenv").config();

exports.createMerchandise = async(req,res)=>{
       try{
        //    const {merchandiseName,merchandisePrice} = req.body;
           const merchandiseName = req.body.name;
           const merchandisePrice = req.body.price;
           const userId = req.user.id;

           console.log(req.body, userId)
            
           if(!merchandiseName || !merchandisePrice){
            console.log("Inside check")
              return res.status(400).json({
                success:false,
                message:"All fields are required",
              });
           }

           console.log("Hello")
            
           const newMerchandise = await Merchandise.create({
                 merchandiseName,
                 merchandisePrice,
           });


        //    update to User Schema
           await User.findByIdAndUpdate(userId,
                                       {
                                        $push:{
                                            orders:newMerchandise._id,
                                        }
                                       },
                                       {new:true}
           );
        
           return res.status(200).json({
            success:true,
            message:"Merchandise created successfully",
            data:newMerchandise,
           });
           
       }
       catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
       }
};

exports.deleteMerchandise = async(req,res)=>{
        try{
            // fetch merchandiseid
            const {merchandiseId} = req.body;
            // use find by id and delete the merchandise id 
            await Merchandise.findByIdAndDelete(merchandiseId);
            // also delete the id of merchandise from user schema
            await User.updateMany({orders:merchandiseId},
                {
                    $pull:{
                        orders:merchandiseId,
                    }
                },{new:true}
            );
            // return res
            return res.status(200).json({
                success:true,
                message:"Successfully deleted merchandise",
            })
        }
        catch(error){
           console.log(error);
           return res.status(500).json({
            success:false,
            message:"Failed to delete the merchandise",
            error:error.message,
           });
        }
};

exports.updateMerchandise = async(req,res)=>{
    try{
        // fetch data
        const {merchandiseName,merchandiseDescription,merchandisePrice,merchandiseId} = req.body;

        // fetch image data
        const merchandiseimage = req.files.Image;

        // upload image to cloudinary
        const uploadImage = await uploadImageToCloudinary(merchandiseimage,process.env.FOLDER_NAME);
    
        // update data in merchandise schema
           const merchandise = await Merchandise.findByIdAndUpdate(merchandiseId , 
                                                            {
                                                                merchandiseName,
                                                                merchandiseDescription,
                                                                merchandisePrice,
                                                                merchandiseImage:uploadImage.secure_url
                                                            },
                                                            {new:true}
                                                                 
           );
        // return res
        return res.status(200).json({
            success:true,
            message:"Updation is successfull",
            merchandise
        });
    }
    catch(error){
         console.log(error);
         return res.status(500).json({
            success:false,
            message:"Failed to update data",
            error:error.message
         });
    }
};

exports.showAllMerchandise = async(req,res)=>{
    try{
    // const userId = req.user.id;

    const AllMerchandise = await Merchandise.find({},{
                          merchandiseName:true,
                          merchandisePrice:true,
                        //   merchandiseDescription:true           
    })
    // .populate("merchandiseTakenByUser")
    // .exec();

    // return res
    return res.status(200).json({
        success:true,
        message:"All merchandise fetched successfully",
        data:AllMerchandise
    });
  }
  catch(error){
      console.log(error);
      return res.status(500).json({
        success:false,
        message:"Failed to fetched data",
        message:error.message
    });
  }
};