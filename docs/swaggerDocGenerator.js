const { parseJoiSchema } = require('./parseJoiSchema'); // Certifique-se de que o caminho está correto

const pathToSwagger = (route) => {
  return route.path.replace(/:(\w+)/g, '{$1}'); // Converte parâmetros de rota para o formato Swagger
};

const generateSwagger = (routes, options) => {
  const paths = {};

  routes.forEach((route) => {
    const path = pathToSwagger(route); // Converte parâmetros de rota para Swagger

    if (!paths[path]) {
      paths[path] = {};
    }

    const method = route.method.toLowerCase(); // Exemplo: GET, POST
    paths[path][method] = {
      tags: [options.title],
      summary: route.description || `Endpoint ${method.toUpperCase()} ${path}`,
      consumes: ['application/json'],
      produces: ['application/json'],
      parameters: [],
      responses: {
        200: { description: 'Sucesso' },
        400: { description: 'Requisição inválida' },
        500: { description: 'Erro no servidor' }
      }
    };

    // Se houver validação de headers
    if (route.validation && route.validation.headers) {
      const { swagger: headersSwagger } = parseJoiSchema(route.validation.headers);
      if (headersSwagger) {
        Object.keys(headersSwagger.properties).forEach((header) => {
          paths[path][method].parameters.push({
            name: header,
            in: 'header',
            required: headersSwagger.required && headersSwagger.required.includes(header),
            schema: headersSwagger.properties[header],
          });
        });
      }
    }

    // Se houver body
    if (route.validation && route.validation.body) {
      const { swagger: bodySwagger } = parseJoiSchema(route.validation.body);
      if (bodySwagger) {
        paths[path][method].requestBody = {
          content: {
            'application/json': {
              schema: bodySwagger
            }
          },
          required: true,
        };
      }
    }

    // Se houver params
    if (route.validation && route.validation.params) {
      const { swagger: paramsSwagger } = parseJoiSchema(route.validation.params);
      if (paramsSwagger) {
        Object.keys(paramsSwagger.properties).forEach((paramName) => {
          paths[path][method].parameters.push({
            name: paramName,
            in: 'path',
            required: true,
            schema: paramsSwagger.properties[paramName],
          });
        });
      }
    }
  });

  return {
    openapi: '3.0.0',
    info: {
      title: options.title,
      version: options.version,
      description: options.description
    },
    paths,
    servers: [
      {
        url: `http://${options.host || 'localhost:3000'}${options.basePath || ''}`
      }
    ]
  };
};

module.exports = { generateSwagger };
