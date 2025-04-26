const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

// Add an item
router.post("/add", async (req, res) => {
  try {
    const { name, price } = req.body;
    const newItem = new Item({ name, price });
    await newItem.save();
    res.json({ message: "Item added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { search } = req.query;
    let items;

    if (search) {
      items = await Item.find({ name: { $regex: search, $options: "i" } });
    } else {
      items = await Item.find();
    }

    res.json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

module.exports = router;

module.exports = router;
