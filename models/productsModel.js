const connection = require('./connection');

const create = async ({ name, quantity }) => {
  // Verifica se o nome já existe no BD
  const [findName] = await connection
    .execute(
      'SELECT LOCATE(?, `name`) FROM `products`',
      [name],
    );

  const checkFindName = findName.some((value) => value);
      console.log(checkFindName);
  if (checkFindName) return { message: 'Product already exists' };

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

module.exports = {
  create,
  getAll,
};