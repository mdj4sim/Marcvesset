const ContactUs = require("../models/ContactUs");


exports.contactUs = async(req,res)=>{
    try{
        // fetch data
        const {name , email , description} = req.body;
        
        // all validation
        if(!name || !email || !description){
           return res.status(400).json({
            success:false,
            message:"Please fill all details"
           });
        }

        // create entry of contact us in contact us schema
        const contactus = await ContactUs.create({name,
                                   email,
                                   description
        });

        // return res
        return res.status(200).json({
            success:true,
            message:"Submitted",
        });

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Some error while creating contactUs"
        });
    }
}