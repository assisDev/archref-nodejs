const Joi = require('joi');

const headers = Joi.object({
  'x-api-key': Joi.string().required().description('Chave da API para autenticação'),
}).unknown(true);

const createUser = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(18).max(100).required(),
});

const getUser = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

module.exports = {
  headers,
  createUser,
  getUser,
};
