require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const middlewares = require('./controllers/middlewares');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsController.products);
app.use('/sales', salesController.sales);

app.use(middlewares.joiError);
app.use(middlewares.domainError);
app.use(middlewares.error);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});

module.exports = app;