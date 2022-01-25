require('dotenv').config();

const express = require('express');
// const bodyParser = require('body-parser');
// const rescue = require('express-rescue');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});
