const connection = require('./connection');

const ERROR_BD_CONNECTION = 'Erro ao conectar no Banco de Dados!';

const createNewSalesId = async () => {
  try {
  const [newId] = await connection
    .execute('INSERT  INTO `sales` (`date`) VALUES (CURRENT_TIMESTAMP)');
  return newId.insertId;
} catch (error) {
  return { message: ERROR_BD_CONNECTION };
}
};

const create = async (newSale, newSaleId) => {
  try {
  const saleItems = newSale.map(({ productId, quantity }) => [newSaleId, productId, quantity]);

    await connection
      .query('INSERT INTO `sales_products` (`sale_id`, `product_id`, `quantity`) VALUES ?',
        [saleItems]);

    const [getSales] = await connection
    .execute('SELECT `product_id`, `quantity` FROM `sales_products` WHERE `sale_id` = ?',
    [newSaleId]);
    return getSales;
  } catch (error) {
    return { message: ERROR_BD_CONNECTION };
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
    return { message: ERROR_BD_CONNECTION };
  }
};

const getSaleById = async (id) => {
  try {
  const [getSales] = await connection
    .execute(`SELECT
    sa.date AS date,
    sp.product_id AS product_id,
    sp.quantity AS quantity
    FROM sales_products AS sp
    INNER JOIN sales AS sa 
    ON sp.sale_id = sa.id
    WHERE sp.sale_id = ?`,
    [id]);
    if (!getSales[0]) return { message: 'Sale not found' };
    return getSales;
  } catch (error) {
    return { message: ERROR_BD_CONNECTION };
  }
};

const getProductById = async (saleId, saleToBeUpdate) => {
  try {
    const { productId } = saleToBeUpdate[0];
    const [getSaleUpdated] = await connection
    .execute(`SELECT
    \`product_id\`,
    \`quantity\`
    FROM \`sales_products\` 
    WHERE \`sale_id\` = ? AND \`product_id\` = ?`,
    [saleId, productId]);
    if (!getSaleUpdated[0]) return { message: 'Sale not found' };
    return getSaleUpdated;
  } catch (error) {
    return { message: ERROR_BD_CONNECTION };
  }
};

const update = async (saleId, saleToBeUpdate) => {
  const { productId, quantity } = saleToBeUpdate[0];
  try {
    await connection
    .execute('UPDATE `sales_products` SET `quantity` = ? WHERE `sale_id` = ? AND `product_id` = ?',
    [quantity, saleId, productId]);
    return null;
  } catch (error) {
    return { message: ERROR_BD_CONNECTION };
  }
};

const remove = async (id) => {
  try {
  await connection
    .execute('DELETE FROM `sales_products` WHERE `sale_id` = ?', [id]);
    return null;
  } catch (error) {
    return { message: ERROR_BD_CONNECTION };
  }
};

module.exports = {
  createNewSalesId,
  create,
  getAll,
  getSaleById,
  getProductById,
  update,
  remove,
};