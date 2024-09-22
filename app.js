const express = require('express');
const connectToDatabase = require('./src/infra/db/db'); // Importa a conexão com MongoDB
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./src/docs/swagger.json');
const userRoutes = require('./src/interfaces/http/routes/userRoutes');
const validate = require('./src/middlewares/validationMiddleware');

// Inicialização do Express
const app = express();
app.use(express.json());
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Itera sobre as rotas e adiciona ao Express dinamicamente
userRoutes.forEach(route => {
  const middlewares = [];

  // Se houver validação, aplica o middleware
  if (route.validation) {
    middlewares.push(validate(route.validation));
  }

  // Adiciona as rotas ao Express
  app[route.method](route.path, ...middlewares, route.handler);
});

// Porta do servidor
const PORT = process.env.PORT || 3000;

// Função para iniciar o servidor
const startServer = async () => {
  // Conectar ao MongoDB
  await connectToDatabase();

  // Iniciar o servidor
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
};

// Iniciar o servidor
startServer();
