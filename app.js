const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./src/docs/swagger.json');
const validate = require('./src/middlewares/validationMiddleware');
const connectToDatabase = require('./src/infra/db/db');
const { scopePerRequest } = require('awilix-express');
const container = require('./src/container/container');


const app = express();
app.use(express.json());
app.use(scopePerRequest(container));
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const userRoutes = container.resolve('userRoutes'); 
userRoutes.forEach((route) => {
  const middlewares = [];

  if (route.validation) {
    middlewares.push(validate(route.validation));
  }

  app[route.method](route.path, ...middlewares, route.handler);
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
};


startServer();
