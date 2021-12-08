const deleteElement = require('./delete');
const insert = require('./insert');
const update = require('./update');
const find = require('./find');
const takeToken = require('./takeToken');
// const getSaleById = require('../controllers/Sales/getSaleById');
const passwordToken = require('./tokenPassword');

module.exports = {
    update,
    deleteElement,
    insert,
    find,
    takeToken,
    passwordToken,    
};
