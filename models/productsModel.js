const connection = require('./connection');

const create = async ({ name, quantity }) => {
  const [result] = await connection
    .execute(
      'INSERT INTO `products` (`name`, `quantity`) VALUES (?, ?)',
      [name, quantity],
    );

  return {
    id: result.insertId,
  };
};

const getAll = async () => {
  const [allProducts] = await connection
    .execute('SELECT * FROM `products`');

    return allProducts;
};

module.exports = {
  create,
  getAll,
};