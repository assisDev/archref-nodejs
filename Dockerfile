# Usa a imagem oficial do Node.js como base
FROM node:20-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copia o arquivo de package.json e package-lock.json antes de copiar o resto do código
COPY package*.json ./

# Instala as dependências do projeto
RUN npm ci --production

# Copia o código fonte da aplicação para o contêiner
COPY . .

# Variáveis de ambiente para o Node.js (opcional, você pode configurá-las no Docker Swarm também)
# Define o ambiente como "production"
ENV NODE_ENV=production

# Exponha a porta em que o app vai rodar (3000, por exemplo)
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
