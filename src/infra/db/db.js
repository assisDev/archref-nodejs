// src/infra/db/db.js
const mongoose = require('mongoose');
const loadConfig = require('../../../config/config');

const config = loadConfig();
const { username, password, mongodbHost, database, options } = config.db;

const mongoUri = `mongodb://${username}:${password}@${mongodbHost.join(',')}/${database}?authSource=${options.authSource}`;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoUri); 
    console.log('Conectado ao MongoDB com sucesso');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectToDatabase;
