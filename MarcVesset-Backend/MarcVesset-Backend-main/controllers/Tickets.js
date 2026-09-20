const Tickets = require("../models/Tickets");
const User  = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
require("dotenv").config();

exports.createTicket = async(req,res)=>{
    try{
    // const  {teamNames,  Date, time, price} = [...req.body];
    const { teamNames, Date, time, price, token } = req.body;

    // const userId = req.user.id;
    if( !teamNames|| !Date || !time || !price){
        return res.status(400).json({
            success:false,
            message:"All fields are mandotary",
        });
    }


    const newTicket = await Tickets.create({
        teamNames,
        Date,
        time,
        price,
    });

    const userId = req.body._id;
     
    await User.findByIdAndUpdate(userId,
        {
            $push:{
                tickets:newTicket._id,
            }
        },
        {new:true},
    );

    return res.status(200).json({
        success:true,
        message:"Ticket created successfully",
        data:newTicket
    });
   }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Some error while creating Ticket",
        });
     
   } 
}

exports.showAllTickets = async(req,res)=>{
    try{
    const allTickets = await Tickets.find({},{
                        //  team1Name:true,
                         teamNames:true,
                         price:true,
                         Date:true,
                         time:true,
     })
    //  .populate({
    //     path:"User",
    //     select:"name email",
    // })
    // exec();

     return res.status(200).json({
        success:true,
        message:"All courses fetched successfully",
        data:allTickets,
     });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error while fetching details",
            error:error.message,
        });
    }
}

exports.deleteTickets = async(req,res)=>{
    try{
        const {userId} = req.user.id;
        const {ticketId} = req.body;

        // delete the ticket by ticketId
        await Tickets.findByIdAndDelete(ticketId);

        // also delete id that store in User schema
        await User.findByIdAndDelete(userId,
                                   {
                                     $pull:{
                                        tickets:ticketId
                                     }
                                   },
                                   {new:true}
        );

        // return res
        return res.status(200).json({
            success:true,
            message:"Deletion of ticket successfully",
        });


    }
    catch(error){
          console.log(error);
          return res.status(500).json({
            success:false,
            message:"Some error while deleting the Tickets",
            error:error.message
          });
    }
}