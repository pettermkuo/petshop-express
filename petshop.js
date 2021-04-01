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
        file.dados.forEach((pet) =>{
            console.log(`${pet.nome}, ${pet.idade} anos, ${pet.tipo}, ${pet.raca}, ${(pet.vacinado) ? 'vacinado': 'não vacinado'}`);
    
            pet.servicos.forEach((servico) => {
                console.log(`${servico.nome} ${servico.data}`);
            })
        })
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
    novocliente: () => {
        let novo = {
            nome: 'Peixe',
            tipo: 'cavalo',
            idade: 5,
            raca: 'arabe',
            peso: 500,
            tutor: 'Silva',
            contato: '(81) 99876-9876',
            vacinado: false,
            servicos: []
        }
        file.dados.push(...novo);
        atualizarBanco();
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
    }
}

module.exports = petshop;