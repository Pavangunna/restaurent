import axios from "axios";

const API_URL = "https://restaurent-hytl.onrender.com/";

export const getItems = async () => {
  const res = await axios.get(`${API_URL}/api/items`);
  return res.data;
};
export const addItem = async (itemData) => {
  const res = await axios.post("http://localhost:5000/api/items/add", itemData);
  return res.data;
};
export const placeOrder = async (order) => {
  const res = await axios.post(`${API_URL}/api/orders/place`, order);
  return res.data;
};

export const getDailyReport = async () => {
  const res = await axios.get(`${API_URL}/api/orders/report`);
  console.log(res)
  return res.data;
};





  
