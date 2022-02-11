const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../models/productsModel');
const productsService = require('../../services/productsService');
const salesModel = require('../../models/salesModel');
const salesService = require('../../services/salesService');
const { sales } = require('../../controllers/salesController');

describe('--------------- Camada Service ---------------', () => {
  describe('--------------- Products ---------------', () => {
    describe('Valida a função "isValid"', () => {
      describe('quando os dados estão corretos retornando um booleano com valor "true"', () => {
        const payloadProduct = {
          name: 'Martelo',
          quantity: 10,
        }

        it('"quantity" é um number ', () => {
          const { quantity } = payloadProduct;
          const response = productsService.isValid(quantity);

          expect(response).to.be.a('boolean');
          expect(response).to.be.equal(true);
        });
      });

      describe('quando os dados estão incorretos retornando um booleano com valor "false"', () => {

        it('"Quantity" é um número em forma de "String"', () => {
          const payloadProduct = {
            name: 'Martelo',
            quantity: "10",
          }

          const { quantity } = payloadProduct;
          const response = productsService.isValid(quantity);

          expect(response).to.be.an('object');
          expect(response).to.have.a.property('code');
          expect(response).to.have.a.property('message');
        });
      });
    });

    describe('POST - Insere um novo produto no BD', () => {
      describe('quando o payload informado não é válido', () => {
        const payloadProduct = {};

        it('retorna um objeto', async () => {
          const response = await productsService.create(payloadProduct);
          expect(response).to.be.an('object');
        });

        it('o objeto contém as propriedades "code" e "message"', async () => {
          const response = await productsService.create(payloadProduct);

          expect(response).to.have.a.property('code');
          expect(response).to.have.a.property('message');
        });

      });

      describe('quando é inserido com sucesso', () => {
        const payloadProduct = {
          name: 'Martelo de Thor',
          quantity: 10,
        }

        before(() => {
          const execute = {
            id: 4,
            name: 'Martelo de Thor',
            quantity: 10,
          }

          sinon.stub(productsModel, 'create')
            .resolves(execute);
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

    describe('GET - "GetAll" - Solicita os dados de produtos do BD', () => {
      describe('quando o retorno é um sucesso', () => {
        const payloadProduct = {
          id: 1,
          name: "Martelo de Thor",
          quantity: 10,
        };
        before(() => {
          const execute = {
            id: 1,
            name: "Martelo de Thor",
            quantity: 10,
          };

          sinon.stub(productsModel, 'getAll')
            .resolves(execute);
        });

        after(() => {
          productsModel.getAll.restore();
        });

        it('retorna um array', async () => {
          const response = await productsService.getAll();

          expect(response).to.be.a('object');
        });

        it('retorna os dados gravados no BD', async () => {
          const response = await productsService.getAll();
          expect(response).to.have.a.property('id');
          expect(response).to.have.a.property('name');
          expect(response).to.have.a.property('quantity');
        });
      });

      describe('quanto o retorno é vazio', () => {
        payloadProduct = null;
        before(() => {
          sinon.stub(productsModel, 'getAll')
            .resolves(payloadProduct);
        });

        after(() => {
          productsModel.getAll.restore();
        });

        it('retorna um boolean', async () => {
          const response = await productsService.getAll();

          expect(response).to.be.a('boolean');
        });

        it('o boolean contém "false"', async () => {
          const response = await productsService.getAll();

          expect(response).to.be.equal(false);
        });
      });
    });

    describe('GET - "GetById" - Solicita os dados de produtos do BD', () => {
      describe('quando o retorno é um sucesso', () => {
        const id = 1;
        before(() => {
          const execute = {
            id: 1,
            name: "Martelo de Thor",
            quantity: 10,
          };

          sinon.stub(productsModel, 'getById')
            .resolves(execute);
        });

        after(() => {
          productsModel.getById.restore();
        });

        it('retorna um objeto', async () => {
          const response = await productsService.getById(id);

          expect(response).to.be.a('object');
        });

        it('retorna os dados gravados no BD', async () => {
          const response = await productsService.getById(id);
          expect(response).to.have.a.property('id');
          expect(response).to.have.a.property('name');
          expect(response).to.have.a.property('quantity');
        });
      });

      describe('quanto produto não existe', () => {
        const id = 5;
        before(() => {
          const execute = { message: "Product not found" };
          sinon.stub(productsModel, 'getById')
            .resolves(execute);
        });

        after(() => {
          productsModel.getById.restore();
        });

        it('retorna um objeto', async () => {
          const response = await productsService.getById(id);

          expect(response).to.be.a('object');
        });

        it('o boolean contém a mensagem "Product not found"', async () => {
          const response = await productsService.getById();

          expect(response.message).to.be.equal('Product not found');
        });
      });
    });

    describe('UPDATE - Envia novos dados para atualização do produto', () => {
      describe('quando o retorno é um sucesso', () => {
        const payload = {
          id: 1,
          name: 'Produto a ser alterado',
          quantity: 100,
        }
        before(() => {
          const payload = {
            id: 1,
            name: 'Produto a ser alterado',
            quantity: 100,
          };

          const execute = {
            id: 1,
            name: 'Jóia do poder',
            quantity: 1,
          };

          sinon.stub(productsModel, 'getById')
          .resolves(payload);

          sinon.stub(productsModel, 'update')
            .resolves(execute);
        });

        after(() => {
          productsModel.getById.restore();
          productsModel.update.restore();
        });

        it('retorna um objeto', async () => {
          const getProduct = await productsService.update(payload.id);
          const { id, name, quantity } = getProduct;
          const response = await productsService.update({ id, name, quantity });

          expect(response).to.be.a('object');
        });

        it('retorna os dados gravados no BD', async () => {
          const getProduct = await productsService.getById(payload.id);
          const { id, name, quantity } = getProduct;
          const response = await productsService.update({ id, name, quantity });
          expect(response).to.have.a.property('id');
          expect(response).to.have.a.property('name');
          expect(response).to.have.a.property('quantity');
        });
      });

      describe('quanto produto não existe', () => {
        const payload = {
          id: 1,
          name: 'Produto a ser alterado',
          quantity: 100,
        };
        before(() => {
          const execute = { message: 'Product not found' };

          sinon.stub(productsModel, 'getById')
          .resolves(execute);

          sinon.stub(productsModel, 'update')
            .resolves(execute);
        });

        after(() => {
          productsModel.getById.restore();
          productsModel.update.restore();
        });

        it('retorna um objeto', async () => {
          const response = await productsService.update(payload.id);

          expect(response).to.be.a('object');
        });

        it('o boolean contém a mensagem "Product not found"', async () => {
          const response = await productsService.update(payload.id);

          expect(response.message).to.be.equal('Product not found');
        });
      });
    });

    describe('DELETE - Deleta um produto de acordo com o id passado', () => {
      describe('quando o retorno é um sucesso', () => {
        const params = 1;

        before(() => {
          const payload = {
            id: 1,
            name: 'Jóia do poder',
            quantity: 1,
          };
          const execute = null;

          sinon.stub(productsModel, 'getById')
          .resolves(payload);
          sinon.stub(productsModel, 'remove')
            .resolves(execute);
        });

        after(() => {
          productsModel.getById.restore();
          productsModel.remove.restore();
        });

        it('retorna um objeto', async () => {
          const response = await productsService.remove(params);

          expect(response).to.be.an('object');
        });

        it('retorna "id, name e quantity" do produto deletado com sucesso', async () => {
          const response = await productsService.remove(params);

          expect(response).to.have.property('id');
          expect(response).to.have.property('name');
          expect(response).to.have.property('quantity');
        });
        
      });

      describe('quando o produto não é encontrado', () => {
        const params = 1;

        before(() => {
          const payload = {
            message: 'Product not found',
          };
          const execute = { message: 'Product not found'};

          sinon.stub(productsModel, 'getById')
          .resolves(payload);
          sinon.stub(productsModel, 'remove')
            .resolves(execute);
        });

        after(() => {
          productsModel.getById.restore();
          productsModel.remove.restore();
        });

        it('retorna um objeto', async () => {
          const response = await productsService.remove(params);

          expect(response).to.be.an('object');
        });

        it('com a proprieda "message"', async () => {
          const response = await productsService.remove(params);

          expect(response).to.have.property('message');
        });

        it('retorna uma mensagem "Product not found"', async () => {
          const response = await productsService.remove(params);

          expect(response.message).to.be.equal('Product not found');
        });
      });
    });
  });

  describe('--------------- Sales ---------------', () => {
    describe('POST - Insere uma nova venda no BD', () => {
      const products_BD = [
        { id: 1, name: 'Martelo de Thor', quantity: 8 },
        { id: 2, name: 'Traje de encolhimento', quantity: 20 },
        { id: 3, name: 'Escudo do Capitão América', quantity: 30 },
        { id: 4, name: 'Joia do infinito', quantity: 1 }
      ];

      describe('quando o produto informado não existe', () => {
        const payloadSales = [
          {
            productId: 100,
            quantity: 1,
          }
        ];

        it('retorna um objeto', async () => {
          const response = await salesService.create(payloadSales);
          expect(response).to.be.an('object');
        });

        it('o objeto contém a propriedade "message"', async () => {
          const response = await salesService.create(payloadSales);

          expect(response).to.have.a.property('message');
        });

        it('a mensagem contém a informação "There is a product not found"', async () => {
          const response = await salesService.create(payloadSales);

          expect(response.message).to.be.equal('There is a product not found');
        });

      });

      describe('quando não possui a quantidade informada em estoque', () => {
        const payloadSales = [
          {
            productId: 1,
            quantity: 100,
          }
        ];

        before(() => {
          sinon.stub(productsModel, 'getAll')
            .resolves(products_BD);
        });

        after(() => {
          productsModel.getAll.restore();
        });

        it('retorna um objeto', async () => {
          const response = await salesService.create(payloadSales);
          expect(response).to.be.an('object');
        });

        it('o objeto contém a propriedade "message"', async () => {
          const response = await salesService.create(payloadSales);

          expect(response).to.have.a.property('message');
        });

        it('a mensagem contém a informação "Such amount is not permitted to sell"', async () => {
          const response = await salesService.create(payloadSales);

          expect(response.message).to.be.equal('Such amount is not permitted to sell');
        });

      });

      describe('quando a venda é inserida com sucesso', () => {
        const payloadSales = [
          {
            productId: 1,
            quantity: 1,
          }
        ];

        before(() => {
          const executeCreateNewSaleId = 1;
          const executeCreate = [ { product_id: 1, quantity: 1 } ];

          sinon.stub(productsModel, 'getAll')
            .resolves(products_BD);
            sinon.stub(salesModel, 'createNewSalesId')
              .resolves(executeCreateNewSaleId);
              sinon.stub(salesModel, 'create')
                .resolves(executeCreate);
        });

        after(() => {
          productsModel.getAll.restore();
          salesModel.createNewSalesId.restore();
          salesModel.create.restore();
        });
 

        it('retorna um objeto', async () => {
          const response = await salesService.create(payloadSales);
          expect(response).to.be.an('object');
        });

        it('o objeto contém as propriedade "id, itemsSold"', async () => {
          const response = await salesService.create(payloadSales);

          expect(response).to.have.a.property('id');
          expect(response).to.have.a.property('itemsSold');
        });
      });
    });

    describe('GET - "GetAll" Solicita os dados de todas as vendas do BD', () => {
      describe('quando o retorno é um sucesso', () => {

        before(() => {
          const execute = [{
            saleId: 1,
            date: '2022-01-05T11:55:00.000Z',
            product_id: 2,
            quantity: 2
        }];

          sinon.stub(salesModel, 'getAll')
            .resolves(execute);
        });

        after(() => {
          salesModel.getAll.restore();
        });

        it('retorna um array', async () => {
          const response = await salesService.getAll();
          expect(response).to.be.an('array');
        });

        it('retorna os dados gravados no BD', async () => {
          const response = await salesService.getAll();
          expect(response[0]).to.have.a.property('saleId');
          expect(response[0]).to.have.a.property('date');
          expect(response[0]).to.have.a.property('quantity');
          expect(response[0]).to.have.a.property('product_id');
        });
      });
    })
  });

});
