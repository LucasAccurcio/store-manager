const connection = require('./connection');

const createNewSalesId = async () => {
  const [newId] = await connection
    .execute('INSERT  INTO `sales` (`date`) VALUES (CURRENT_TIMESTAMP)');
  return newId.insertId;
};

const create = async (newSale, newSaleId) => {
  const saleItems = newSale.map(({ productId, quantity }) => [newSaleId, productId, quantity]);
  try {
    await connection
      .query(
        'INSERT INTO `sales_products` (`sale_id`, `product_id`, `quantity`) VALUES ?',
        [saleItems],
      );
        // TALVEZ O IDEAL SEJA CRIAR UMA NOVA FUNÇÃO PARA RECUPERAR UM ARRAY DE VENDAS DAQUELE SALE_ID ou **utilizar o getAllByID**
  } catch (error) {
    return { message: 'Erro ao conectar no Banco de Dados!' };
  }
};

/* const getAll = async () => {
  const [allProducts] = await connection
    .execute('SELECT * FROM `products`');

    return allProducts;
}; */

const getById = async (id) => {
  const [getSales] = await connection
    .execute('SELECT `product_id`, `quantity` FROM `sales_products` WHERE `sale_id` = ?',
    [id]);
    if (!getSales[0]) return { message: 'Sale not found' };
    return getSales;
};

/*
const update = async ({ id, name, quantity }) => {
  await connection
    .execute('UPDATE `products` SET `name` = ?, `quantity` = ? WHERE `id` = ?',
    [name, quantity, id]);
};

const remove = async (id) => {
  await connection
    .execute('DELETE FROM `products` WHERE id = ?', [id]);
}; */

module.exports = {
  createNewSalesId,
  create,
  // getAll,
  getById,
  // update,
  // remove,
};