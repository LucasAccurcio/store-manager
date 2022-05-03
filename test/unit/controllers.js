const rescue = require('express-rescue');
const sinon = require('sinon');
const { expect } = require('chai');

const routes = require('../../controllers/routes');
const productService = require('../../services/productsService');

describe('--------------- Camada Controller ---------------', () => {
  describe('--------------- PRODUCTS ---------------', () => {
    describe('Testando validações com JOI', () => {
      describe('quando o payload informado é válido', () => {

        it('é chamado a função "validateProductSchema" sem retorno de erro', () => {
          const request = {
            name: 'Joia do poder',
            quantity: 1,
          };
          const res = {};
          const next = sinon.spy();
          routes.validateProduct(request, res, next);
          expect(next.calledOnce).to.be.true;
        });
      });
    });
  });
});
