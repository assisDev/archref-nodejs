// src/interfaces/htpp/schemas/userSchema.js
const joi = require('joi');

const headers = joi.object({
  'x-api-key': joi.string().required().description('Chave da API para autenticação'),
}).unknown(true);

const createUser = joi.object({
  name: joi.string().min(3).max(30).required(),
  email: joi.string().email().required(),
  age: joi.number().integer().min(18).max(100).required(),
});

const getUser = joi.object({
  id: joi.string().hex().length(24).required(),
});

module.exports = {
  headers,
  createUser,
  getUser,
};
