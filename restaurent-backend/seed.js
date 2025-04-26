const mongoose = require("mongoose");
const Item = require("./models/Item");


mongoose
  .connect('mongodb+srv://bhaskarabbisetti9:abm13abm13@cluster0.sgdkk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(async () => {
    console.log("Connected to MongoDB. Seeding data...");

    // Delete existing items
    await Item.deleteMany();

    // Insert new items
    await Item.insertMany([
      { name: "🍕 Margherita Pizza", price: 200 },
      { name: "🍔 Cheeseburger", price: 150 },
      { name: "🥗 Caesar Salad", price: 120 },
      { name: "🍜 Chicken Noodles", price: 180 },
      { name: "🥤 Cold Coffee", price: 80 },
    ]);

    console.log("Data seeded successfully! ✅");
    mongoose.disconnect();
  })
  .catch((err) => console.log("MongoDB Connection Error:", err));
