const connection = require('./connection');

const create = async ({ name, quantity }) => {
  // Verifica se o nome já existe no BD
  const [findName] = await connection
    .execute(
      'SELECT `name` FROM `products` WHERE `name` = ?',
      [name],
    );
    if (findName[0]) {
      return { message: 'Product already exists' };
    }

  const [result] = await connection
    .execute(
      'INSERT INTO `products` (`name`, `quantity`) VALUES (?, ?)',
      [name, quantity],
    );

  return {
    id: result.insertId,
    name,
    quantity,
  };
};

const getAll = async () => {
  const [allProducts] = await connection
    .execute('SELECT * FROM `products`');

    return allProducts;
};

const getById = async (id) => {
  const [getProduct] = await connection
    .execute('SELECT * FROM `products` WHERE `id` = ?',
    [id]);
    if (!getProduct[0]) return { message: 'Product not found' };

    return getProduct[0];
};

module.exports = {
  create,
  getAll,
  getById,
};