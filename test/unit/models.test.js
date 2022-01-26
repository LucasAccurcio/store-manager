const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../models/connection');
const productsModel = require('../../models/productsModel');

describe('Insere um novo produto no BD', () => {
  const payloadProduct = {
    name: 'Martelo de Thor',
    quantity: 10,
  }

  before(async () => {
    const execute = [{ insertId: 1 }]; // retorno esperado nesse teste

    sinon.stub(connection, 'execute').resolves(execute);
  });

  // Restauraremos a função `execute` original após os testes.
  after(async () => {
    connection.execute.restore();
  });

  describe('quando é inserido com sucesso', () => {

    it('retorna um objeto', async () => {
      const response = await productsModel.create(payloadProduct);

      expect(response).to.be.a('object')
    });

    it('tal objeto possui o "id" do novo filme inserido', async () => {
      const response = await productsModel.create(payloadProduct);

      expect(response).to.have.a.property('id')
    });

  });
});