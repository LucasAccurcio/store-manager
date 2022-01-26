require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const middlewares = require('./controllers/middlewares');
const productController = require('./controllers/productsController');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(bodyParser.json());

app.use('/', productController);

app.use(middlewares.joiError);
app.use(middlewares.domainError);
app.use(middlewares.error);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});
