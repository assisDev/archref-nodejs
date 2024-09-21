# Usar uma imagem base oficial do Node.js
FROM node:16

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copiar o package.json e package-lock.json para instalar as dependências
COPY package*.json ./

# Instalar as dependências da aplicação
RUN npm install

# Copiar o restante dos arquivos da aplicação para o contêiner
COPY . .

# Expor a porta que o aplicativo usará
EXPOSE 3000

# Definir a variável de ambiente NODE_ENV como produção
ENV NODE_ENV production

# Comando para rodar a aplicação
CMD [ "npm", "start" ]