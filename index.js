//servidor e rotas
const express = require('express');
const petshop = require('./petshop');
const {v4: uuid} = require('uuid');

const app = express();
app.use(express.json());

// app.get('/dados', (request, response) => {
//     return response.send(petshop.listarPets());
// })

app.get('/dados/:nome', (request, response) => {
    const params = request.params;

    return response.json(petshop.buscarPet(params.nome));
})

app.post('/dados', (request, response) => {
    const{nome,tipo,idade,raca,peso,tutor,contato,vacinado,servicos} = request.body;

    const novocliente = {nome,tipo,idade,raca,peso,tutor,contato,vacinado,servicos};

    petshop.novocliente(novocliente);

    petshop.atualizarBanco();

    return response.send(novocliente);
})

app.listen(3000, () => {
    console.log('Servidor Rodando...');
});

// console.log(petshop.listarPets());