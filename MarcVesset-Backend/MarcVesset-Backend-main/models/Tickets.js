const mongoose = require("mongoose");
require("dotenv").config();

const ticketSchema = new mongoose.Schema({
    // match_id:{
    //     type:String,
    //     required:true,
    // },
    // team1Name:{
    //     type:String,
    //     required:true,
    // },
    teamNames:{
       type:String,
       required:true,
    },
    // image:{
    //    type:String,
    // },
    Date:{
        type:String,
        required:true,
        default:Date.now(),
    },
    time:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
//     ticketTakenByUser:[
//     {
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"User",
//     }
// ],

});

module.exports = mongoose.model("Tickets" , ticketSchema);