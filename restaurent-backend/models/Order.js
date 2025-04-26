const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  items: [
    {
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
  totalPrice: { type: Number, required: true }
},
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
