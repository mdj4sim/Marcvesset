const mongoose = require("mongoose");
require("dotenv").config();

const merchandiseSchema = new mongoose.Schema({
    merchandiseName:{
        type:String,
        required:true,
    },
    // merchandiseImage:{
    //     type:String,
    //     required:true,
    // },
    merchandisePrice:{
        type:Number,
        required:true,
    },
    // merchandiseDescription:{
    //     type:String,
    // },
    // merchandiseTakenByUser:{
    //     type:mongoose.Schema.Types.ObjectId,
    //      ref:"User",
    // },

});

module.exports = mongoose.model("Merchandise" , merchandiseSchema);