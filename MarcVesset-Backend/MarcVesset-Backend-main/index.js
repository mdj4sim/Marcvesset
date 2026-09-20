const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const ticketsPaymentRoutes = require("./routes/ticketsPayment");
// const merchandisePaymentRoutes = require("./routes/merchandisePayment");
// const payment = require("./routes/ticketsPayment");
const ticketsRoutes = require("./routes/Tickets");
const ordersRoutes = require("./routes/Orders");
const cartRoutes = require("./routes/Carts");
const contactusRoutes = require("./routes/ContactUs");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const{cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
require("dotenv").config();


const PORT = process.env.PORT||6000;

database.connect();
cloudinaryConnect();

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = ['http://localhost:5173'];

// CORS middleware options
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));



app.use("/api/v1/auth" , userRoutes);
app.use("/api/v1/PaymentT" , ticketsPaymentRoutes);
// app.use("/api/v1/PaymentM" , merchandisePaymentRoutes);
app.use("/api/v1/Tickets" , ticketsRoutes);
app.use("/api/v1/Merchandise" , ordersRoutes);
app.use("/api/v1/contactUs" , contactusRoutes);
app.use("/api/v1/cart" , cartRoutes);

// def route
app.get("/getData" , (req,res)=>{
    return res.json({
        success:true,
        message:"your server is up and running.....",
    })
})

app.listen(PORT, ()=>{
    console.log(`App is listening at ${PORT}`);
});

