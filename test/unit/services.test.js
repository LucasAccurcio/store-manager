const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../models/productsModel');
const productsService = require('../../services/productsService');

describe('Camada Service', () => {
  describe('Valida a função "isValid"', () => {
    describe('quando os dados estão corretos retornando um booleano com valor "true"', () => {
      const payloadProduct = {
        name: 'Martelo',
        quantity: 10,
      }

      it('"name" é uma strig e "quantity" um number com dados', () => {
        const { name, quantity } = payloadProduct;
        const response = productsService.isValid(name, quantity);

        expect(response).to.be.a('boolean');
        expect(response).to.be.equal(true);
      });
    });

    describe('quando os dados estão incorretos retornando um booleano com valor "false"', () => {
      
      it('"name" vazio', () => {
        const payloadProduct = {
          name: '',
          quantity: 10,
        }

        const { name, quantity } = payloadProduct;
        const response = productsService.isValid(name, quantity);

        expect(response).to.be.a('boolean');
        expect(response).to.be.equal(false);
      });

      it('"name" não é uma string', () => {
        const payloadProduct = {
          name: true,
          quantity: 10,
        }

        const { name, quantity } = payloadProduct;
        const response = productsService.isValid(name, quantity);

        expect(response).to.be.a('boolean');
        expect(response).to.be.equal(false);
      });

      it('"quantity" vazio', () => {
        const payloadProduct = {
          name: 'Martelo',
          quantity: null,
        }

        const { name, quantity } = payloadProduct;
        const response = productsService.isValid(name, quantity);

        expect(response).to.be.a('boolean');
        expect(response).to.be.equal(false);
      });

      it('"quantity" não é um "number"', () => {
        const payloadProduct = {
          name: 'Martelo',
          quantity: '10',
        }

        const { name, quantity } = payloadProduct;
        const response = productsService.isValid(name, quantity);

        expect(response).to.be.a('boolean');
        expect(response).to.be.equal(false);
      });
    });
  });

  describe('POST-Insere um novo produto no BD', () => {  
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

  describe('GET-Solicita os dados de produtos do BD', () => {  
    describe('quando o retorno é um sucesso', () => {
      const payloadProduct = [
        {
          id: 1,
          name: "Martelo de Thor",
          quantity: 10,
        },
        {
          id: 2,
          name: "Traje de encolhimento",
          quantity: 20,
        },
        {
          id: 3,
          name: "Escudo do Capitão América",
          quantity: 30,
        }
      ];

      before(() => {
        sinon.stub(productsModel, 'getAll')
          .resolves(payloadProduct);
      });

      // Restauraremos a função `getAll` original após os testes.
      after(() => {
        productsModel.getAll.restore();
      });

      it('retorna um array', async () => {
        const response = await productsService.getAll();

        expect(response).to.be.an('array');
      });

      it('retorna os dados gravados no BD', async () => {
        const response = await productsService.getAll();

        expect(response).to.be.equal(payloadProduct);
      });
    });

    describe('quanto o retorno é vazio', () => {
      payloadProduct = null;
      before(() => {
        sinon.stub(productsModel, 'getAll')
          .resolves(payloadProduct);
      });

      // Restauraremos a função `getAll` original após os testes.
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
});