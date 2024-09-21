const fs = require('fs');
const path = require('path');

// Função para substituir variáveis no arquivo env.json usando as variáveis de ambiente
const replaceEnvVariables = (config) => {
  const configString = JSON.stringify(config);
  const replacedString = configString.replace(/\$vault\.(\w+)/g, (_, key) => {
    return process.env[key] || '';  // Substitui pela variável de ambiente real ou uma string vazia
  });
  return JSON.parse(replacedString);
};

// Função para carregar o arquivo de configuração correto (local.json ou env.json)
const loadConfig = () => {
  const env = process.env.NODE_ENV || 'local'; // Verifica o ambiente (local ou produção)

  // Corrigindo o caminho para o arquivo de configuração
  let configPath;
  if (env === 'local') {
    configPath = path.join(__dirname, 'local.json'); // Corrigir para buscar diretamente em config/local.json
  } else {
    configPath = path.join(__dirname, 'env.json');   // Corrigir para buscar diretamente em config/env.json
  }

  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

  // Se não for local, substituir as variáveis do env.json
  if (env !== 'local') {
    return replaceEnvVariables(config);
  }

  return config; // Retorna o config se for local.json
};

module.exports = loadConfig;
