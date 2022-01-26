const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../models/productsModel');
const productsService = require('../../services/productsService');

describe('Camada Service - Insere um novo produto no BD', () => {
  describe('quando o payload informado não é válido', () => {
    const payloadProduct = {};

    it('retorna um boolean', async () => {
      const response = await productsService.create(payloadProduct);

      expect(response).to.be.a('boolean');
    });

    it('o boolean contém "false"', async () => {
      const response = await productsService.create(payloadProduct);

      expect(response).to.be.equal(false);
    });

  });

  describe('quando é inserido com sucesso', () => {
    const payloadProduct = {
      name: 'Martelo de Thor',
      quantity: 10,
    }

    before(() => {
      const ID_EXAMPLE = 1;

      sinon.stub(productsModel, 'create')
        .resolves({ id: ID_EXAMPLE });
    });

    // Restauraremos a função `create` original após os testes.
    after(() => {
      productsModel.create.restore();
    });

    it('retorna um objeto', async () => {
      const response = await productsService.create(payloadProduct);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui o "id" do novo produto inserido', async () => {
      const response = await productsService.create(payloadProduct);

      expect(response).to.have.a.property('id');
    });

  });
});