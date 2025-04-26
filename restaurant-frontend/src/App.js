import React, { useState } from "react";
import Menu from "./components/Menu";
import Order from "./components/Order";
import AddItem from "./components/AddItem";
import DailyReport from "./components/DailyReport";
import DarkModeToggle from "./components/DarkModeToggle";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { motion } from "framer-motion";

function App() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [refreshMenu, setRefreshMenu] = useState(false);

  // 🛒 Add Item to Order
  const handleSelectItem = (item) => {
    setSelectedItems((prev) => [...prev, item]);
  };

  // ❌ Remove Item from Order
  const handleRemoveItem = (id) => {
    setSelectedItems((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-darkBg text-gray-900 dark:text-white flex flex-col items-center p-6">
      <ToastContainer />
      <div className="flex w-full max-w-4xl justify-between items-center">
        <h1 className="text-3xl font-bold">🍽️ Restaurant Ordering System</h1>
        <DarkModeToggle />
      </div>
      <motion.div className="w-full max-w-3xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <AddItem onItemAdded={() => setRefreshMenu(!refreshMenu)} />
        <Menu onSelectItem={handleSelectItem} refresh={refreshMenu} />
        <Order selectedItems={selectedItems} onRemoveItem={handleRemoveItem} />
        <DailyReport />
      </motion.div>
    </div>
  );
}

export default App;
