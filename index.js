require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const middlewares = require('./controllers/middlewares');
const salesController = require('./controllers/salesController');
const routes = require('./controllers/routes');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', routes.validateProduct, routes.createProduct);
app.get('/products', routes.getAllProducts);
app.get('/products/:id', routes.getProductById);
app.put('/products/:id', routes.validateProduct, routes.updateProduct);
app.delete('/products/:id', routes.removeProduct);
app.use('/sales', salesController.sales);

app.use(middlewares.joiError);
app.use(middlewares.domainError);
app.use(middlewares.error);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});

module.exports = app;