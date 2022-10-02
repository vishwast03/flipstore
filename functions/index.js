const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay");
// const sha256 = require("js-sha256").sha256;
require("dotenv").config();

const app = express();
admin.initializeApp();

app.use(cors({ origin: true }));
app.use(express.json());

app.post("/orders", async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
    };

    const order = await instance.orders.create(options);

    if (!order) return res.status(500).send("Some error occured");

    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/success", async (req, res) => {
  try {
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      userId,
      products,
    } = req.body;

    // const generated_signature = sha256.hmac(
    //   orderCreationId + "|" + razorpayPaymentId,
    //   process.env.RAZORPAY_SECRET
    // );

    // if (generated_signature !== razorpaySignature) {
    //   return res.status(400).json({ msg: "Transaction not legit!" });
    // }

    products.forEach(async (product) => {
      const orderDetails = {
        order_id: razorpayOrderId,
        payment_id: razorpayPaymentId,
        user_id: userId,
        product: product,
        timestamp: new Date().getTime(),
      };

      await admin.firestore().collection("orders").add(orderDetails);
    });

    res.json({
      success: true,
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

exports.api = functions.https.onRequest(app);
