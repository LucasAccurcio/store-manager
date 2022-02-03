/* const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../models/connection');
const productsModel = require('../../models/productsModel');
const salesModel = require('../../models/salesModel');

describe('### Camada Model ###', () => {
  describe('*** PRODUCTS ***', () => {
    describe('MÉTODO POST', () => {
      describe('Função "create" dados válidos', () => {
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

        describe('Quando é inserido com sucesso', () => {
          it('retorna um objeto', async () => {
            const response = await productsModel.create(payloadProduct);

            expect(response).to.be.a('object')
          });

          it('tal objeto possui o "id" do novo produto inserido', async () => {
            const response = await productsModel.create(payloadProduct);

            expect(response).to.have.a.property('id')
          });
        });
      });

      describe('Função "create" dados inválidos', () => {
        const payload = {
          name: "Jóia do infinito",
          quantity: 10,
        };

        before(async () => {
          const execute = [
            [{
              name: "Jóia do infinito",
              quantity: 10,
            }]
          ]; // retorno esperado nesse teste
          sinon.stub(connection, 'execute').resolves(execute);
        });
        // Restauraremos a função `execute` original após os testes.
        after(async () => {
          connection.execute.restore();
        });

        describe('Quando já existe o produto no banco de dados', () => {
          it('retorna um objeto', async () => {
            const response = await productsModel.create(payload);
            expect(response).to.be.a('object');
          });
          it('o retorno possui a propriedade message', async () => {
            const response = await productsModel.create(payload);
            expect(response).to.be.a.property('message');
          });
          it('a propriedade "message" contém o valor "Product already exists"', async () => {
            const { name, quantity } = payload;
            const response = await productsModel.create({ name, quantity });
            expect(response).to.be.a.property('message');
          });
        });
      });
    });

    describe('MÉTODO GET', () => {
      describe('Função "getAll"', () => {
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
        describe('Quando todos os dados é recebido', () => {
          
          it('retorna um objeto', async () => {
            const response = await productsModel.getAll();

            expect(response).to.be.a('object');
          });

          it('tal objeto possui o "id, name e quantity"', async () => {
            const response = await productsModel.getAll();
            expect(response).to.have.a.property('id');
            expect(response).to.have.a.property('name');
            expect(response).to.have.a.property('quantity');
          });
        });
      });

      describe('Função "getByID"', () => {
        describe('Quando existe um "id", os dados são recebidos', () => {
  
          before(async () => {
            const execute = [
              [{
                id: 4,
                name: "Jóia do infinito",
                quantity: 1,
              }],
              ['um objeto com um monte de informações que o MySQL manda'],
            ]; // retorno esperado nesse teste
  
            sinon.stub(connection, 'execute').resolves(execute);
          });
          // Restauraremos a função `execute` original após os testes.
          after(async () => {
            connection.execute.restore();
          });

          const id = 4;  

          it('retorna um objeto', async () => {
            const response = await productsModel.getById(id);
            expect(response).to.be.a('object');
          });

          it('tal objeto possui o "id, name e quantity" do novo produto inserido', async () => {
            const response = await productsModel.getById(id);
            expect(response).to.have.a.property('id');
            expect(response).to.have.a.property('name');
            expect(response).to.have.a.property('quantity');
          });
        });

        describe('Quando não existe o "id"', () => {
  
          before(async () => {
            const execute = [{ message: 'Product not found' }]; // retorno esperado nesse teste
  
            sinon.stub(connection, 'execute').resolves(execute);
          });
          // Restauraremos a função `execute` original após os testes.
          after(async () => {
            connection.execute.restore();
          });

          const id = 4;  

          it('recebe um objeto', async () => {
            const response = await productsModel.getById(id);
            expect(response).to.be.a('object');
          });

          it('recebe a mensagem "Product not found"', async () => {
            const response = await productsModel.getById(id);
            expect(response).to.have.a.property('message');
            expect(response.message).to.be.equals('Product not found');
          });
        });
      });

    });

    describe('MÉTODO PUT e DELETE', () => {
      before(async () => {
        const execute = [null]; // retorno esperado nesse teste

        sinon.stub(connection, 'execute').resolves(execute);
      });
      after(async () => {
        connection.execute.restore();
      });
      describe('Função "update"', () => {
        describe('Quando os dados são atualizados com sucesso', () => {
          const payload = {
            id: 1,
            name: 'Martelo de Thor',
            quantity: 5,
          }

          it('a função retorna "null" ao atualizar o objeto no banco de dados', async () => {
            const response = await productsModel.update(payload);
            expect(response).to.be.equal(null);
          });
        });
      });
      describe('Função "remove"', () => {
        describe('Quando os dados são removidos com sucesso', () => {
          const payload = {
            id: 1,
          }

          it('a função retorna "null" ao remover o objeto do banco de dados', async () => {
            const response = await productsModel.remove(payload);
            expect(response).to.be.equal(null);
          });
        });
      });
    });
  });

  describe('*** SALES ***', () => {

    describe('MÉTODO POST', () => {
      describe('Função "createNewSalesId"', () => {
        before(async () => {
          const execute = [{
            insertId: 1,
          }];

          sinon.stub(connection, 'execute').resolves(execute);
        });
        after(async () => {
          connection.execute.restore();
        });

        describe('Quando criado com sucesso', () => {
          it('retorna um "number"', async () => {
            const response = await salesModel.createNewSalesId();
            expect(response).to.be.a('number');
            expect(response).to.be.equal(1);
          });

          it('retorna o valor do novo "id"', async () => {
            const response = await salesModel.createNewSalesId();
            expect(response).to.be.equal(1);
          });
        });
      });

      describe('Função "create" dados válidos', () => {
        const payloadId = 1;
        const payloadProduct = [{
          productId: 2,
          quantity: 12,
        }];

        before(async () => {
          const execute = [{
            productId: 2,
            quantity: 12,
          }];
          sinon.stub(connection, 'query').resolves(execute);
          sinon.stub(connection, 'execute').resolves(execute);
        });

        after(async () => {
          connection.execute.restore();
        });

        describe('Quando é inserido com sucesso', () => {
          it('retorna um objeto', async () => {
            const response = await salesModel.create(payloadProduct, payloadId);

            expect(response).to.be.a('object')
          });

          it('tal objeto possui as propriedades "productId" e "quantity" do novo produto inserido', async () => {
            const response = await salesModel.create(payloadProduct, payloadId);
            expect(response).to.have.a.property('productId');
            expect(response).to.have.a.property('quantity');
          });

          
          it('quando a função não é chamada corretamente"', async () => {
            const response = await salesModel.create();
            expect(response).to.have.a.property('message');
            expect(response.message).to.be.equals('Erro ao conectar no Banco de Dados!');
          });
        });
      });
    });

    describe('MÉTODO GET', () => {
      describe('Função "getAll"', () => {
        before(async () => {
          const execute = [[
            {
              saleId: 1,
              date: "2021-09-09T04:54:29.000Z",
              product_id: 1,
              quantity: 2
            },
            {
              saleId: 1,
              date: "2021-09-09T04:54:54.000Z",
              product_id: 2,
              quantity: 2
            }
          ]];
          sinon.stub(connection, 'execute').resolves(execute);
        });

        after(async () => {
          connection.execute.restore();
        });
        describe('Quando todos os dados é recebido', () => {
          
          it('retorna um array com objetos', async () => {
            const response = await salesModel.getAll();
            expect(response).to.be.an('array');
          });

          it('tal objeto possui o "saleId, date, product_id e quantity" ', async () => {
            const response = await salesModel.getAll();
            expect(response[0]).to.have.a.property('saleId');
            expect(response[0]).to.have.a.property('date');
            expect(response[0]).to.have.a.property('product_id');
            expect(response[0]).to.have.a.property('quantity');
          });
        });
      });

      describe('Função "getSaleByID"', () => {
        describe('Quando existe um "id", os dados são recebidos', () => {
  
          before(async () => {
            const execute = [[
              {
                saleId: 1,
                date: "2021-09-09T04:54:29.000Z",
                product_id: 1,
                quantity: 2
              },
              {
                saleId: 1,
                date: "2021-09-09T04:54:54.000Z",
                product_id: 2,
                quantity: 2
              }
            ]];
            sinon.stub(connection, 'execute').resolves(execute);
          });

          after(async () => {
            connection.execute.restore();
          });

          const id = 4;  

          it('retorna um array com objeto', async () => {
            const response = await salesModel.getSaleById(id);
            expect(response).to.be.an('array');
          });

          it('tal objeto possui o "date, product_id e quantity" do novo produto inserido', async () => {
            const response = await salesModel.getSaleById(id);
            expect(response[0]).to.have.a.property('date');
            expect(response[0]).to.have.a.property('product_id');
            expect(response[0]).to.have.a.property('quantity');
          });
        });

        describe('Quando não existe o "id"', () => {
          before(async () => {
            const execute = [[]];
  
            sinon.stub(connection, 'execute').resolves(execute);
          });
          after(async () => {
            connection.execute.restore();
          });

          const id = 4;  

          it('recebe um objeto', async () => {
            const response = await salesModel.getSaleById(id);
            expect(response).to.be.a('object');
          });

          it('recebe a mensagem "Product not found"', async () => {
            const response = await salesModel.getSaleById(id);
            expect(response).to.have.a.property('message');
            expect(response.message).to.be.equals('Sale not found');
          });
        });
      });

      describe('Função "getProductByID"', () => {
        describe('Quando existe um "id", os dados são recebidos', () => {
          const payload = [{
            product_id: 1,
            quantity: 6
          }];
          before(async () => {
            const execute = [[
              {
                product_id: 1,
                quantity: 6
              }
            ]];
            sinon.stub(connection, 'execute').resolves(execute);
          });

          after(async () => {
            connection.execute.restore();
          });

          const id = 4;  

          it('retorna um array com objeto', async () => {
            const response = await salesModel.getProductById(id, payload);
            expect(response).to.be.an('array');
          });

          it('tal objeto possui o "product_id e quantity" do produto buscado', async () => {
            const response = await salesModel.getProductById(id, payload);
            expect(response[0]).to.have.a.property('product_id');
            expect(response[0]).to.have.a.property('quantity');
          });

          it('quando a função não é chamada corretamente"', async () => {
            const response = await salesModel.getProductById();
            expect(response).to.have.a.property('message');
            expect(response.message).to.be.equals('Erro ao conectar no Banco de Dados!');
          });
        });

        describe('Quando não existe o "id"', () => {
          const payload = [{
            product_id: 1,
            quantity: 6
          }];
          before(async () => {
            const execute = [[]];
            sinon.stub(connection, 'execute').resolves(execute);
          });

          after(async () => {
            connection.execute.restore();
          });

          const id = 10;  

          it('recebe um objeto', async () => {
            const response = await salesModel.getProductById(id, payload);
            expect(response).to.be.a('object');
          });

          it('recebe a mensagem "Product not found"', async () => {
            const response = await salesModel.getProductById(id, payload);
            expect(response).to.have.a.property('message');
            expect(response.message).to.be.equals('Sale not found');
          });

          it('quando a função não é chamada corretamente"', async () => {
            const response = await salesModel.getProductById(id);
            expect(response).to.have.a.property('message');
            expect(response.message).to.be.equals('Erro ao conectar no Banco de Dados!');
          });
        });
      });
    });

    describe('MÉTODO PUT e DELETE', () => {
      before(async () => {
        const execute = [null]; // retorno esperado nesse teste

        sinon.stub(connection, 'execute').resolves(execute);
      });
      after(async () => {
        connection.execute.restore();
      });
      describe('Função "update"', () => {
        describe('Quando os dados são atualizados com sucesso', () => {
          const payload = [{
            productId: 2,
            quantity: 5,
          }];

          it('a função retorna "null" ao atualizar o objeto no banco de dados', async () => {
            const saleId = 1;
            const response = await salesModel.update(saleId, payload);
            expect(response).to.be.equal(null);
          });
        });
      });
      describe('Função "remove"', () => {
        describe('Quando os dados são removidos com sucesso', () => {
          const payload = {
            id: 1,
          }

          it('a função retorna "null" ao remover o objeto do banco de dados', async () => {
            const response = await salesModel.remove(payload);
            expect(response).to.be.equal(null);
          });
        });
      });
    });
  });
}); */