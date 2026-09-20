const { instance } = require("../config/razorpay");
const Tickets = require("../models/Tickets");
// const Merchandise = require("../models/Merchandise");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const { paymentSuccessEmail } = require("../templates/paymentSuccessEmail");

// payment capture controller
exports.capturePayment = async (req, res) => {
  const customer_id = req.user.id;

  const { productCart } = customer_id.cart;

  if (productCart.length === 0) {
    return res.status(401).json({
      success: false,
      message: "Your cart is empty",
    });
  }

  let total_amount = 0;

  for (const product_id of productCart) {
    let product;
    try {
      // find product by its id
      product = await User.findById(product_id);

      const findTicket = await Tickets.findById(product_id);

      if (!findTicket) {
        const findMerchandise = await Merchandise.findById(product_id);
        if (findMerchandise == undefined) {
          return res.status(401).json({
            success: false,
            message: "Items id unable to fetch",
          });
        } else {
          product = findMerchandise;
        }
      } else {
        product = findTicket;
      }

      // if the product is not found return an error
      if (!product) {
        return res.status(400).json({
          success: false,
          message: "Could not find the products",
        });
      }

      if (findTicket !== undefined) {
        total_amount += product.price;
      } else {
        total_amount += product.merchandisePrice;
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  const options = {
    amount: total_amount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  };

  try {
    // Initiate the payment using razorpay
    const paymentResponse = await instance.orders.create(options);
    res.json({
      success: true,
      data: paymentResponse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Could not initiate order",
    });
  }
};

// payment verification controller
exports.verifyPayment = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id;
  const razorpay_payment_id = req.body?.razorpay_payment_id;
  const razorpay_signature = req.body?.razorpay_signature;
  const cart = req.body?.cart;
  const userId = req.user.id;

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !cart ||
    !userId
  ) {
    return res.status(400).json({
      success: false,
      message: "Payment Failed",
    });
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    // calling
    await createPurchaseHistory(razorpay_order_id, userId);
    return res.status(200).json({
      success: true,
      message: "Payment Verified",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Payment failed",
  });
};

// send payment success email
exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body;

  const userId = req.user.id;

  if (!orderId || !paymentId || !amount || !userId) {
    return res.status(400).json({
      success: false,
      messaage: "Please provide all the details",
    });
  }

  try {
    const findCustomer = await User.findById(userId);

    await mailSender(
      findCustomer.email,
      "Payment Received",
      paymentSuccessEmail(
        `${findCustomer.name}`,
        amount / 100,
        orderId,
        paymentId
      )
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Could not send Email",
    });
  }
};