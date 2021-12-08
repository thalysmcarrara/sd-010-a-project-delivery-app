const lib = require('./lib');

const find = async (table, params) => {
//    console.log('find: table:', table);
//    console.log('find: params:', params);
    const result = await lib[table].findAll({ raw: true, where: params });
    return result;
};

module.exports = find;