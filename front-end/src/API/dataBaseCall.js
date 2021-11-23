import md5 from 'md5';

const axios = require('axios').default;

const BASE_URL = process.env.REACT_APP_BASE_BACK_URL_POINT || 'http://localhost:3001';

export async function loginApi(email, password) {
  try {
    const login = (await axios.post(
      `${BASE_URL}/users/login`,
      { email, password: md5(password) },
      { responseType: 'json' },
    ));
    return login.data;
  } catch ({ response }) {
    throw response.data.message;
  }
}

export async function getSeler(user) {
  try {
    const allSellers = (await axios.get(
      `${BASE_URL}/users/sellers`,
      { headers: { Authorization: user } },
      { responseType: 'json' },
    ));
    return allSellers.data;
  } catch ({ response }) {
    throw response.data.message;
  }
}