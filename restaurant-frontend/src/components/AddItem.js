import React, { useState } from "react";
import { addItem } from "../api/api";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const AddItem = ({ onItemAdded }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // 📝 Handle Add Item
  const handleAddItem = async () => {
    if (!name.trim() || !price.trim()) {
      toast.error("Please enter name and price!");
      return;
    }

    const newItem = { name, price: parseFloat(price) };

    try {
      await addItem(newItem);
      toast.success("Item added successfully!");
      setName("");
      setPrice("");
      onItemAdded(); // Refresh menu items
    } catch (error) {
      toast.error("Error adding item!");
      console.error(error);
    }
  };

  return (
    <motion.div className="p-6 bg-white dark:bg-darkCard rounded-lg shadow-lg mt-6">
      <h2 className="text-2xl font-bold mb-4">➕ Add New Item</h2>

      {/* Item Name Input */}
      <input
        type="text"
        placeholder="🍔 Item Name"
        className="w-full px-4 py-2 mb-4 border rounded-lg dark:bg-gray-800 dark:text-white"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Item Price Input */}
      <input
        type="number"
        placeholder="💰 Price (₹)"
        className="w-full px-4 py-2 mb-4 border rounded-lg dark:bg-gray-800 dark:text-white"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      {/* Add Item Button */}
      <button
        onClick={handleAddItem}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        ✅ Add Item
      </button>
    </motion.div>
  );
};

export default AddItem;
