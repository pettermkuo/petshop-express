//módulo próprio
const moment = require('moment');
const fs = require('fs');
const fileName = './bancoDados.json';

let file = fs.readFileSync(fileName, 'utf-8');
file = JSON.parse(file);

const petshop = {
    atualizarBanco: () => {
        console.log('writing to ' + fileName);
        fs.writeFileSync(fileName, JSON.stringify(file, null, 2), 'utf-8');
    },
    listarPets: () => {
        let textoListaPets = "PETSHOP \n";

        file.dados.forEach((pet) =>{
            textoListaPets += (`${pet.nome}, ${pet.idade} anos, ${pet.tipo}, ${pet.raca}, ${(pet.vacinado) ? 'vacinado': 'não vacinado'}\n`);
    
            pet.servicos.forEach((servico) => {
                textoListaPets += (`${servico.nome} ${servico.data}\n`);
            })
        })

        return textoListaPets;
    },
    buscarPet: (nomePet) => {

        let petEncontrado = file.dados.find((pet) => {
            return pet.nome == nomePet;
        });
    
        return petEncontrado ? petEncontrado : `Nenhum pet encontrado com nome ${nomePet}`;
    },
    vacinarPet: pet => {
        if(!pet.vacinado){
            pet.vacinado = true;
            console.log(`${pet.nome} foi vacinado com sucesso!`);
        }else{
            console.log(`Ops, ${pet.nome} já está vacinado!`);
        }
    },
    campanhaVacina: () => {
        console.log("Iniciando campanha vacinação!");
        let qtdvacinados = 0;
        file.dados = file.dados.map((pet) => {
            vacinarPet(pet);
            qtdvacinados++;
        })
        console.log(`${cont} pets foram vaciados nessa campanha!`);
    },
    novocliente: (novo) => {
        file.dados.push(novo);
    },    
    darBanhoPet: pet => {
        pet.servicos.push({
            nome: 'banho', 
            data: moment().format('DD-MM-YYYY')
        });
        atualizarBanco();
        console.log(`${pet.nome} está de banho tomado!`);
    },
    tosarPet: pet => {
        pet.servicos.push({
            nome: 'tosa',
            data: moment().format('DD-MM-YYYY')
        });
        atualizarBanco();
        console.log(`${pet.nome} está com cabelinho na régua :)`);
    },
    apararUnhasPet: pet => {
        pet.servicos.push({
            nome: 'corte de unhas',
            data: moment().format('DD-MM-YYYY')
        });
        atualizarBanco();
        console.log(`${pet.nome} está de unhas aparadas!`);
    },
    atenderCliente: (nome,servicos) => {
        let index = retornaIndex(nome);
        if(index == -1)  {
            console.log("Nome de pet inválido.");
        }else{
            let {tutor} = file.dados[index]
            console.log(`Bem vindo ${tutor}!`);
            servicos(file.dados[index]);
            console.log(`Volte sempre ${tutor}!`);
        } 
    },
    filtrarPet: raca => {
        const encontrados = file.dados.filter(function(comparado){
            return comparado.raca == raca;
        })
        console.log(`${encontrados}`);
    },
    clientePremium: pet => {
        let qtdservicos =  pet.servicos.length;
    
        if(servicos >= 5)
        {
            console.log("Presente!");
        }else{
            console.log("Ainda não!")
        }
    },
}

module.exports = petshop;