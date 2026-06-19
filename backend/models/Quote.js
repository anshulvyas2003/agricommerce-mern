const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema(
  {
    productId: String,
    name: String,
    email: String,
    quantity: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Quote", quoteSchema);