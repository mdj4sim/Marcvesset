const mongoose = require("mongoose");
require("dotenv").config();

const userSchema = new mongoose.Schema({
    name:{
      type:String,
      required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    confirmPassword:{
        type:String,
    },
    token:{
        type:String,
    },
    accountType:{
        type:String,
        emum:["Admin","user"]
    },
    orders:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Merchandise",
        }
    ],
    tickets:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Tickets",
        }
    ],
    cart:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Cart",
        }
    ]
});

module.exports = mongoose.model("User",userSchema);