const mongoose = require('mongoose');
const loadConfig = require('../../../config/config'); // Carregar as configurações (local ou produção)

// Carregar as configurações do banco de dados
const config = loadConfig();
const { username, password, mongodbHost, database, options } = config.db;

// Montar a URI de conexão dinamicamente
const mongoUri = `mongodb://${username}:${password}@${mongodbHost.join(',')}/${database}?authSource=${options.authSource}`;

// Função para conectar ao MongoDB
const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoUri); // Sem passar as opções obsoletas
    console.log('Conectado ao MongoDB com sucesso');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1); // Termina o processo em caso de erro de conexão
  }
};

module.exports = connectToDatabase;
