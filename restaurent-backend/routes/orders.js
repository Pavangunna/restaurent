const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// 🛒 Place a New Order
router.post("/place", async (req, res) => {
  try {
    const { customerName, items ,totalPrice} = req.body;

    if (!customerName || !items || items.length === 0) {
      return res.status(400).json({ error: "Customer name and items are required" });
    }

    // Calculate total price
    // const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Create new order
    const newOrder = new Order({
      customerName,
      items,
      totalPrice,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Failed to place order" });
  }
});

module.exports = router;


router.get("/report", async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to start of the day

    const dailyOrders = await Order.find({
      createdAt: { $gte: today },
    });

    res.status(200).json(dailyOrders);
  } catch (error) {
    console.error("Error fetching daily report:", error);
    res.status(500).json({ error: "Failed to fetch daily report" });
  }
});


module.exports = router;
