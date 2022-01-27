const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../models/connection');
const productsModel = require('../../models/productsModel');

describe('###Camada Model - Insere um novo produto no BD', () => {
  const payloadProduct = {
    name: "Jóia do infinito",
    quantity: 100,
  }
  before(async () => {
    const execute = [{
        id: 4,
        name: "Jóia do infinito",
        quantity: 100,
      }]; // retorno esperado nesse teste

    sinon.stub(connection, 'execute').resolves(execute);
  });

  // Restauraremos a função `execute` original após os testes.
  after(async () => {
    connection.execute.restore();
  });

  describe('POST-quando é inserido com sucesso', () => {

    it('retorna um objeto', async () => {
      const response = await productsModel.create(payloadProduct);

      expect(response).to.be.a('object')
    });

    it('tal objeto possui o "id" do novo produto inserido', async () => {
      const response = await productsModel.create(payloadProduct);

      expect(response).to.have.a.property('id')
    });
  });

  describe('GET-quando é recebido todos os dados', () => {
    
    it('retorna um objeto', async () => {
      const response = await productsModel.getAll();

      expect(response).to.be.a('object');
    });

    it('tal objeto possui o "id" do novo produto inserido', async () => {
      const response = await productsModel.getAll();
      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('name');
      expect(response).to.have.a.property('quantity');
    });
  });

});