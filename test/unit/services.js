const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../models/productsModel');
const productsService = require('../../services/productsService');

describe('### Camada Service ###', () => {
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

  describe('POST-Insere um novo produto no BD', () => {
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

  describe('GET- "GetAll" - Solicita os dados de produtos do BD', () => {
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

  describe('GET- "GetById" - Solicita os dados de produtos do BD', () => {
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
});