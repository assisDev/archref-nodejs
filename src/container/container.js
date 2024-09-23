
const { createContainer, asFunction, asValue, Lifetime } = require('awilix');
const db = require('../infra/db/db');
const User = require('../infra/db/models/User');
const userController = require('../interfaces/http/controllers/userController');
const userRoutes = require('../interfaces/http/routes/userRoutes');
const userSchema = require('../interfaces/http/schemas/userSchema');

const container = createContainer({
  injectionMode: 'PROXY',
});

container.register({
  User: asValue(User),
  db: asFunction(db).singleton(),
  userController: asFunction(userController).singleton(),
  userRoutes: asFunction(userRoutes).singleton(),
  userSchema: asValue(userSchema),
});


container.loadModules(
  [
    'src/application/services/**/*.js', 
    'src/domain/repositories/**/*.js',  
    'src/interfaces/http/controllers/**/*.js', 
    'src/interfaces/http/middlewares/**/*.js', 
    'src/interfaces/amqp/handlers/**/*.js'     
  ],
  {
    formatName: 'camelCase',
    resolverOptions: {
      lifetime: Lifetime.SCOPED, 
    },
  }
);

module.exports = container;
