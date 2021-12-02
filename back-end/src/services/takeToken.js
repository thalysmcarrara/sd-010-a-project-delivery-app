require('dotenv').config();
const jwt = require('jsonwebtoken');
const path = require('path');

// const SECRET_KEY = process.env.SECRET || 'segredo';

const SECRET_KEY = require('fs')
  .readFileSync(
    path.join(__dirname, '..', '..', 'jwt.evaluation.key'),
    { encoding: 'utf-8' },
  ).trim();

const takeToken = (token) => {
    const { payload } = jwt.verify(token, SECRET_KEY);
    return payload;
};

module.exports = takeToken;