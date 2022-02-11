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

/*     describe('Testando a rota POST /products', () => {
      describe('quando é inserido com sucesso', () => {
        const response = {};
        const request = {};
    
        before(() => {
          request.body = { name: "Martelo de Thor", quantity: 10 };
    
          response.status = sinon.stub()
            .returns(response);
          response.send = sinon.stub()
            .returns();
          sinon.stub(productService, 'create')
            .resolves(true);
        });

        after(() => {
          productService.create.restore();
        });
    
        it('é chamado o status com o código 201', async () => {
          await routes.createProduct(rescue((request, response)));
    
          expect(response.status.calledWith(201)).to.be.equal(true);
        });
    
      });
    }); */

/*     describe('Pega todos os produtos cadastrados', () => {
      const response = {};
      const request = {};
  
      const payloadProduct = [{
        name: 'Example Product', quantity: 1,
      },
      { name: 'Example Product 2', quantity: 2 }
      ]
  
      beforeEach(() => {
        sinon.stub(productService, 'getAll').returns(payloadProduct)
        response.status = sinon.stub()
          .returns(response);
        response.send = sinon.stub()
          .returns();
        response.json = sinon.stub().returns(JSON.stringify(payloadProduct))
      });
  
      afterEach(() => {
        productService.getAll.restore();
      });
  
      it('Retorna todos os produtos', async () => {
        const result = routes.getAllProducts(request, response)
        expect(response.status.calledWith(200)).to.be.equal(true);
        expect(result).to.be.equal(JSON.stringify(payloadProduct));
      });
    }); */
  });
});
