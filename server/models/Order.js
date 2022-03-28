const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  product_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
