const sinon = require('sinon');
const { expect } = require('chai');

const productsController = require('../../controllers/productsController');
const productsService = require('../../services/productsService');

describe('###Camada Controller - Testando validações com JOI', () => {
  describe('quando o payload informado é válido', () => {
    const payload = {
      name: 'Martelo do Thor',
      quantity: 10,
    };

    it('é chamado a função "validateProductSchema" sem retorno de erro', () => {
        const response = productsController.validateProductSchema(payload);

      expect(response).to.be.equal(null);
    });
  });
});
