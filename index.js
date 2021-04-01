//servidor e rotas
const express = require('express');
const {v4: uuid} = require('uuid');

const app = express();

app.listen(2000, () => {
    console.log('Servidor Rodando...');
});