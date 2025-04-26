import React, { useState } from "react";
import { placeOrder } from "../api/api";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { BillDownloadButton } from "./Bill";

const Order = ({ selectedItems, onRemoveItem }) => {
  const [customerName, setCustomerName] = useState("");
  const [quantities, setQuantities] = useState({});
  const [orderDetails, setOrderDetails] = useState(null); // Store placed order

  // Handle Quantity Change
  const handleQuantityChange = (id, quantity) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: quantity,
    }));
  };

  // Calculate Total Price
  const totalPrice = selectedItems.reduce((total, item) => {
    const quantity = quantities[item._id] || 1;
    return total + item.price * quantity;
  }, 0);

  // 🛒 Place Order
  const handleOrder = async () => {
    if (!customerName.trim()) {
      toast.error("Please enter customer name!");
      return;
    }

    if (selectedItems.length === 0) {
      toast.error("No items selected!");
      return;
    }

    const orderData = {
      customerName,
      items: selectedItems.map((item) => ({
        itemId: item._id,
        name: item.name,
        quantity: quantities[item._id] || 1,
        price: item.price,
      })),
      totalPrice,
    };

    try {
      await placeOrder(orderData);
      toast.success("Order placed successfully!");

      // Store order details for PDF
      setOrderDetails(orderData);

      setCustomerName("");
      setQuantities({});
    } catch (error) {
      toast.error("Error placing order!");
      console.error(error);
    }
  };

  return (
    <motion.div className="p-6 bg-white dark:bg-darkCard rounded-lg shadow-lg mt-6">
      <h2 className="text-2xl font-bold mb-4">🛒 Your Order</h2>

      <input
        type="text"
        placeholder="👤 Enter Customer Name"
        className="w-full px-4 py-2 mb-4 border rounded-lg dark:bg-gray-800 dark:text-white"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />

      {selectedItems.length > 0 ? (
        <ul>
          {selectedItems.map((item) => (
            <li key={item._id} className="flex justify-between items-center p-2 border-b">
              <span>{item.name}</span>
              <input
                type="number"
                min="1"
                value={quantities[item._id] || 1}
                onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                className="w-16 text-center border rounded"
              />
              <span>₹{(quantities[item._id] || 1) * item.price}</span>
              <button
                onClick={() => onRemoveItem(item._id)}
                className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No items added.</p>
      )}

      <h3 className="text-xl font-bold mt-4">Total: ₹{totalPrice}</h3>

      <button
        onClick={handleOrder}
        className="w-full bg-green-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-green-700"
      >
        ✅ Place Order
      </button>

      {/* 📄 Show Bill Download Button After Order is Placed */}
      {orderDetails && <BillDownloadButton order={orderDetails} />}
    </motion.div>
  );
};

export default Order;
