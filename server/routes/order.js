const express = require("express");
const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");
const fetchUser = require("../middleware/fetchUser");
const router = express.Router();

// ROUTE 1: Get user's orders using: GET "/api/order/getall" - Login required
router.get("/getall", fetchUser, async (req, res) => {
  try {
    let userOrders = await Order.find({ user_id: req.user.id });
    res.json(userOrders);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

// ROUTE 2: Create order using: POST "/api/order/create" - Login required
router.post("/create", fetchUser, async (req, res) => {
  try {
    req.body.productIds.forEach(async (productId) => {
      await Order.create({
        product_id: productId,
        user_id: req.user.id,
        date: new Date(),
      });
    });

    res.send("success");
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
