// src/container/container.js
const { createContainer, asFunction, asValue, Lifetime } = require('awilix');
const db = require('../infra/db/db');
const User = require('../infra/db/models/User');
const userController = require('../interfaces/http/controllers/userController'); // Adicionando aqui

// Criando o container de DI
const container = createContainer({
  injectionMode: 'PROXY',
});

// Registrando o modelo Mongoose como valor
container.register({
  User: asValue(User),
  db: asFunction(db).singleton(), // Conexão com o banco de dados (singleton)
  userController: asFunction(userController).singleton(), // Registrando o controlador aqui
});

// Carregando módulos automaticamente
container.loadModules(
  [
    'src/application/services/**/*.js', // Serviços
    'src/domain/repositories/**/*.js',  // Repositórios
    'src/interfaces/http/controllers/**/*.js', // Controladores HTTP
    'src/interfaces/http/middlewares/**/*.js', // Middlewares HTTP
    'src/interfaces/amqp/handlers/**/*.js'     // Handlers AMQP, se houver
  ],
  {
    formatName: 'camelCase',
    resolverOptions: {
      lifetime: Lifetime.SCOPED, // Define o lifetime dos módulos carregados
    },
  }
);

module.exports = container;
