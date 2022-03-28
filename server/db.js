require("dotenv").config();
const mongoose = require("mongoose");

const connectToMongo = () => {
  mongoose.connect(process.env.MONGO_URI, () => {
    console.log("Connection to Mongo established.");
  });
};

module.exports = connectToMongo;
