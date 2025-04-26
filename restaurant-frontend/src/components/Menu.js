import React, { useState, useEffect } from "react";
import { getItems } from "../api/api";
import { motion } from "framer-motion";

const Menu = ({ onSelectItem, refresh }) => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMenu();
  }, [refresh]); // 🔄 Re-fetch menu when refresh changes

  const fetchMenu = async () => {
    try {
      const data = await getItems();
      setItems(data);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  // 🔍 Search Filter
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div className="p-6 bg-white dark:bg-darkCard rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">📜 Menu</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="🔍 Search for food..."
        className="w-full px-4 py-2 mb-4 border rounded-lg dark:bg-gray-800 dark:text-white"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Menu List */}
      <div className="grid grid-cols-2 gap-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <motion.div
              key={item._id}
              className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg shadow cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800"
              whileHover={{ scale: 1.05 }}
              onClick={() => onSelectItem(item)}
            >
              <h3 className="font-bold">{item.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">₹{item.price}</p>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No items found</p>
        )}
      </div>
    </motion.div>
  );
};

export default Menu;
