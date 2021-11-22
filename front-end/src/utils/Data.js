import axios from 'axios';

const fetchAllProducts = async () => {
  const response = await fetch('http://localhost:3001/products');
  const result = await response.json();
  return result;
};

export const getSellers = async () => {
  const { data } = await axios.get('http://localhost:3001/users?role=seller');
  return data;
};

export const validateToken = async (token) => {
  const res = await fetch('http://localhost:3001/validToken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  const result = await res.json();

  return result;
};

export default fetchAllProducts;