import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const placeOrder = async (orderDetails) => {
  const response = await axios.post(`${API_URL}/orders`, orderDetails);
  return response.data;
};
