const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () =>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>console.log("db connection is successfull"))
    .catch((error)=>{
        console.log("issue in DB connection");
        console.log(error.message);
        process.exit(1);
    });
}



