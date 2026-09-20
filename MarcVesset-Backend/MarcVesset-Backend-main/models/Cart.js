const mongoose = require("mongoose");
const Merchandise = require("./Merchandise");
require("dotenv").config();

const cartSchema = new mongoose.Schema({

    ticketId:[
        {
         type:mongoose.Schema.Types.ObjectId,
         ref:"Ticket",
        }
    ],

    MerchandiseId:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Merchandise",
        }
    ],

    quantity:{
        type:Number,
        required:true,
        default:1
    }

});

module.exports = mongoose.model("Cart" , cartSchema);