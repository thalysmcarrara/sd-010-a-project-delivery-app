const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const services = require('../service');

// const secret = 'senha_dificil';
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const login = await services.login(email, password);
    
    const privateKey = await fs.readFile('jwt.evaluation.key', 'utf8');
    console.log(privateKey, 'controller');
    const payload = { login };

    const jwtConfig = { algorithm: 'HS256', expiresIn: '12h' };

    const token = jwt.sign(payload, privateKey, jwtConfig);

    if (login.message) {
      return res.status(login.code).json({ message: login.message });
    }
    
    return res.status(200).json({ token });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

module.exports = loginUser;
