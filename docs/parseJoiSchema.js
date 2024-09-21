const j2s = require('joi-to-swagger');

// Função que converte um schema Joi em um schema Swagger
const parseJoiSchema = (schema) => {
  const { swagger } = j2s(schema);
  return { swagger };
};

module.exports = { parseJoiSchema };
