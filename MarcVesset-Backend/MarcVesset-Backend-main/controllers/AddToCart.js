const Cart = require("../models/Cart");
const User = require("../models/User");
const Merchandise = require("../models/Merchandise");
const Tickets = require("../models/Tickets")
require("dotenv").config();

exports.pushGoods = async(req, res)=>{
  try {
    // console.log("yes");
    const customer_id = req.user.id;

    const { goods_id } = req.body;
    // console.log(goods_id);

    const updatedCart = await User.findByIdAndUpdate(
      { _id: customer_id },
      {
        $push: { cart: goods_id },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Item successfully added to your cart",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to add items in your cart",
    });
  }
};

exports.pullGoods = async (req, res) => {
  try {
    const customer_id = req.user.id;

    const { goods_id } = req.body;

    const updatedCart = await User.findByIdAndUpdate(
      { _id: customer_id },
      {
        $pull: { cart: goods_id },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Item successfully removed from your cart",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to remove items from your cart",
    });
  }
};

exports.showAllGoods = async(req,res)=>{
  // console.log("ye lo")
  try{
    const userId = req.user.id;

    const userDetails = await User.findById(userId);
    // console.log("detail" , userDetails)
    const cartItems = userDetails.cart;
    const allGoods=[];
    for (let i = 0; i < cartItems.length; i++) {
      console.log("items\n", cartItems[i]);

      try {
        const merchandiseDetails = await Merchandise.findById(cartItems[i]);
        // console.log("Merchandise Details", merchandiseDetails);

        if (merchandiseDetails) {
          allGoods.push(merchandiseDetails);
        }

        const ticketDetails = await Tickets.findById(cartItems[i]);
        // console.log("Ticket Details", ticketDetails);

        if (ticketDetails) {
          allGoods.push(ticketDetails);
        }
      } catch (error) {
        console.error("Error");
      }
    }
    console.log("user", userDetails);
    
    if (!userDetails || !userDetails.cart) {
      return res.status(400).json({
        success: false,
        message: "Goods are not available",
      });
    }

    
    // const userDetails = await User.findById(userId);
    // const allGoods = userDetails.cart
    
    // .populate("cart");
    // .exec();
    // console.log("user" , userDetails);
    // if(!allGoods){
    //   return res.status(400).json({
    //     success:false,
    //     message:"Goods are not available",
    //   });
    // }

    return res.status(200).json({
      success:true,
      message:"All carts are here",
      allGoods
    });
  }
  catch(error){
     return res.status(500).json({
      success:false,
      message:"Cannot able to fetch cart",
      error:error.message
     })
  }
}