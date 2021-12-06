import api from './api';

const getAllUsers = async () => {
  try {
    const res = await api.get('/user');
    return res.data;
  } catch (error) {
    return error.response;
  }
};

export default getAllUsers;
