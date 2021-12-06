import api from './api';

const postSale = async (saleData) => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  console.log('tokr:', token);
  try {
    const res = await api.post('/sales', saleData, { headers: { Authorization: token } });
    return res.data;
  } catch (error) {
    return error.response;
  }
};

export default postSale;
