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
      const [getSales] = await connection
    .execute('SELECT `product_id`, `quantity` FROM `sales_products` WHERE `sale_id` = ?',
    [newSaleId]);
    return getSales;
  } catch (error) {
    return { message: 'Erro ao conectar no Banco de Dados!' };
  }
};

const getAll = async () => {
  try {
    const [allSales] = await connection
      .execute(`SELECT 
      sp.sale_id AS \`saleId\`,
      sa.date AS \`date\`,
      sp.product_id AS \`product_id\`,
      sp.quantity AS \`quantity\`
      FROM \`sales_products\` AS sp
      INNER JOIN \`sales\` AS sa 
      ON sp.sale_id = sa.id`);
      return allSales;
  } catch (error) {
    return { message: 'Erro ao conectar no Banco de Dados!' };
  }
};

const getById = async (id) => {
  try {
  const [getSales] = await connection
    .execute(`SELECT 
    sa.date AS \`date\`,
    sp.product_id AS \`product_id\`,
    sp.quantity AS \`quantity\`
    FROM \`sales_products\` AS sp
    INNER JOIN \`sales\` AS sa 
    ON sp.sale_id = sa.id
    WHERE sp.sale_id = ?`,
    [id]);
    if (!getSales[0]) return { message: 'Sale not found' };
    return getSales;
  } catch (error) {
    return { message: 'Erro ao conectar no Banco de Dados!' };
  }
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
  getAll,
  getById,
  // update,
  // remove,
};