const express = require("express");
const { body, validationResult } = require("express-validator");
const Product = require("../models/Product");
const User = require("../models/User");
const fetchUser = require("../middleware/fetchUser");
const router = express.Router();

// ROUTE 1: Get all products using: GET "/api/product/getall". No login required
router.get("/getall", async (req, res) => {
  try {
    let products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

// ROUTE 2: Get products in user's cart using: GET "/api/product/getcart". Login required
router.get("/getcart", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    let userCart = await User.findById(userId).select("cart");

    let cartProducts = await Product.find({ _id: { $in: userCart.cart } });

    res.json(cartProducts);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

// ROUTE 3: Add products to cart using: POST "/api/product/addtocart" - Login required
router.post("/addtocart", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    let user = await User.findById(userId);

    user.cart.push(req.body.product_id);

    await User.updateOne({ _id: userId }, { cart: user.cart });

    res.send("success");
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

// ROUTE 4: Remove product from cart using: POST "/api/product/removefromcart" - Login required
router.post("/removefromcart", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    let user = await User.findById(userId);

    let newCart = user.cart.filter((item) => {
      return req.body.product_id != item;
    });

    await User.updateOne({ _id: userId }, { cart: newCart });

    res.send("success");
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

// TEMP ROUTE
router.post(
  "/add",
  [
    body("title", "Enter product title").isLength({ min: 5 }),
    body("price", "Enter price of the product").isNumeric(),
    body("description", "Enter product's description").isString(),
    body("category", "Enter product's category").isString(),
    body("image", "Enter product's image link").isURL(),
  ],
  async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const data = req.body;

    try {
      let product = await Product.create({
        title: data.title,
        price: data.price,
        description: data.description,
        category: data.category,
        image: data.image,
        rating: {
          rate: data.rating.rate,
          count: data.rating.count,
        },
      });

      success = true;
      res.json({ success: success });
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }
);

module.exports = router;
