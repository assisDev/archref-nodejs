// src/docs/generateSwagger.js
const routes = require('../interfaces/http/routes/userRoutes'); // Certifique-se de não usar destructuring
const { generateSwagger } = require('./SwaggerDocGenerator');
const { writeFileSync } = require('fs');
const path = require('path');

const generateOpenApiDoc = () => {
  const options = {
    title: 'API de Usuários',
    version: '1.0.0',
    description: 'Documentação da API gerada automaticamente',
    host: 'localhost:3000',
    basePath: '/'
  };
  const openapiDoc = generateSwagger(routes, options);

  const outputPath = path.join(__dirname, '../docs/swagger.json');
  writeFileSync(outputPath, JSON.stringify(openapiDoc, null, 2));
  console.log('Swagger JSON gerado com sucesso em:', outputPath);
};

generateOpenApiDoc();