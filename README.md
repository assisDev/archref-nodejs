# Archref Node.js

Este projeto **archref-nodejs** é uma aplicação backend construída com **Node.js** e **Express** que inclui suporte para conexão ao MongoDB, gerenciamento de usuários, validação de dados com **Joi**, documentação automática de API com **Swagger**, e integração com **RabbitMQ**. A aplicação utiliza o **Docker** para a configuração do ambiente de desenvolvimento e produção.

## Índice

1. [Tecnologias Utilizadas](#tecnologias-utilizadas)
2. [Estrutura do Projeto](#estrutura-do-projeto)
3. [Configurações de Ambiente](#configurações-de-ambiente)
4. [Instalação e Execução](#instalação-e-execução)
5. [Swagger: Documentação da API](#swagger-documentação-da-api)
6. [Depuração com Visual Studio Code](#depuração-com-visual-studio-code)
7. [Docker e Docker Compose](#docker-e-docker-compose)
8. [Rotas da API](#rotas-da-api)
9. [Testes](#testes)
10. [Contribuição](#contribuição)

## Tecnologias Utilizadas

- **Node.js**: Runtime de JavaScript no lado do servidor.
- **Express.js**: Framework minimalista para construção de APIs.
- **MongoDB e Mongoose**: Banco de dados NoSQL e ODM (Object Data Modeling).
- **Joi**: Validação de dados para JavaScript.
- **Swagger**: Geração automática de documentação para APIs REST.
- **RabbitMQ**: Broker de mensagens para filas de trabalho.
- **Docker**: Criação de contêineres para a aplicação e serviços como MongoDB e RabbitMQ.
- **Visual Studio Code**: Editor de código recomendado para desenvolvimento e depuração.

## Estrutura do Projeto

Abaixo está a estrutura de diretórios e arquivos do projeto, com uma breve explicação de cada parte:

```
/config
  ├── local.json           # Configurações de ambiente local
  ├── env.json             # Configurações de ambiente de produção com placeholders ($vault)
  ├── config.js            # Script para carregar as configurações corretas dependendo do ambiente
  └── db.js                # Script para conectar ao MongoDB usando as configurações carregadas

/controllers
  ├── userController.js     # Controlador para lidar com as requisições de usuários

/docs
  ├── generateSwagger.js    # Script para gerar a documentação Swagger
  └── swagger.json          # Arquivo JSON gerado com a documentação Swagger

/middlewares
  └── validationMiddleware.js # Middleware para validação de dados

/models
  ├── User.js               # Modelo do usuário (Mongoose)

/repositories
  ├── userRepository.js      # Repositório de usuários para interagir com o banco de dados

/routes
  ├── userRoutes.js          # Definição das rotas relacionadas aos usuários

/schemas
  ├── headersSchema.js       # Schemas Joi para validação dos headers
  ├── userBodySchema.js      # Schemas Joi para validação do corpo das requisições de usuários

/services
  ├── userService.js         # Serviço responsável pela lógica de negócios relacionada aos usuários

/vscode
  └── launch.json            # Configuração de depuração do Visual Studio Code

app.js                     # Arquivo principal para iniciar o servidor e configurar rotas
docker-compose.yml          # Arquivo Docker Compose para MongoDB, RabbitMQ, e mongo-express
Dockerfile                  # Dockerfile para construir o aplicativo (se necessário)
package.json                # Arquivo de dependências e scripts NPM
```

## Configurações de Ambiente

Existem dois arquivos principais para configurar o ambiente da aplicação:

- **`config/local.json`**: Configurações para ambiente de desenvolvimento local, contendo informações como porta e credenciais do MongoDB.
  
- **`config/env.json`**: Configurações para o ambiente de produção. Usa placeholders para variáveis sensíveis que serão preenchidas com variáveis de ambiente reais (gerenciadas, por exemplo, via Vault).

### Estrutura do `local.json`

```json
{
  "web": {
    "port": 3000
  },
  "db": {
    "username": "admin",
    "password": "p1c4d1nh0",
    "database": "db-local-npci-devsecops-fx-lookup-ms",
    "mongodbHost": ["127.0.0.1:27017"],
    "dialect": "mongodb",
    "logging": "",
    "options": {
      "authSource": "admin",
      "replicaSet": ""
    }
  }
}
```

### Estrutura do `env.json`

```json
{
  "web": {
    "port": "$vault.port"
  },
  "db": {
    "username": "$vault.dbUsername",
    "password": "$vault.dbPassword",
    "database": "$vault.databaseName",
    "mongodbHost": ["$vault.mongodbHost"],
    "dialect": "$vault.mongodbDialect",
    "logging": "",
    "options": {
      "authSource": "$vault.authSource",
      "replicaSet": "$vault.replicaSet"
    }
  }
}
```

## Instalação e Execução

### Pré-requisitos

- **Node.js** (versão 14.x ou superior)
- **Docker** (com Docker Compose)

### Passo 1: Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/archref-nodejs.git
cd archref-nodejs
```

### Passo 2: Instalar Dependências

```bash
npm install
```

### Passo 3: Executar com Docker

Para rodar o MongoDB, RabbitMQ e Mongo Express no Docker:

```bash
docker-compose up -d
```

### Passo 4: Rodar a Aplicação

```bash
npm start
```

### Passo 5: Acessar a Aplicação

- Acesse o Swagger para explorar a API: **[http://localhost:3000/api/docs](http://localhost:3000/api/docs)**
- Acesse o **mongo-express** (interface para gerenciar MongoDB): **[http://localhost:8081](http://localhost:8081)**

## Swagger: Documentação da API

A documentação da API é gerada automaticamente usando o **Swagger**. Você pode acessá-la via:

```bash
http://localhost:3000/api/docs
```

A documentação é gerada pelo arquivo **`docs/generateSwagger.js`**, que inspeciona as rotas e os schemas Joi definidos para cada endpoint.

## Depuração com Visual Studio Code

Para configurar a depuração no **Visual Studio Code**, foi incluído um arquivo **`launch.json`** na pasta **`.vscode/`**. 

### Para iniciar o debugger:

1. Abra o **Visual Studio Code**.
2. Pressione `F5` ou vá para o menu **Run > Start Debugging**.

O depurador estará configurado para rodar o projeto e conectar ao MongoDB.

## Docker e Docker Compose

O arquivo **`docker-compose.yml`** define três serviços principais:

1. **MongoDB**: Banco de dados NoSQL usado pela aplicação.
2. **mongo-express**: Interface web para gerenciar o MongoDB.
3. **RabbitMQ**: Serviço de filas de mensagens.

### Rodar todos os serviços:

```bash
docker-compose up -d
```

### Parar todos os serviços:

```bash
docker-compose down
```

## Rotas da API

### Rotas de Usuário

- **POST /users**: Cria um novo usuário.
- **GET /users/:id**: Busca um usuário por ID.
- **PUT /users/:id**: Atualiza as informações de um usuário.
- **DELETE /users/:id**: Remove um usuário.

### Exemplos de Validações com Joi

O projeto usa **Joi** para validar os dados de entrada nas rotas. As validações são definidas na pasta **`schemas`**:

- **`headersSchema.js`**: Valida os headers das requisições.
- **`userBodySchema.js`**: Valida o corpo das requisições para criação/atualização de usuários.

## Testes

Os testes devem ser escritos para verificar a lógica de negócios, a interação com o MongoDB e a integração com o RabbitMQ.

Para rodar os testes (caso configurados):

```bash
npm test
```

## Contribuição

Se você deseja contribuir para este projeto, siga os passos abaixo:

1. Faça um **fork** do repositório.
2. Crie um novo **branch**: `git checkout -b minha-feature`.
3. Faça suas alterações e adicione os **commits**: `git commit -m 'Minha nova feature'`.
4. Envie suas alterações: `git push origin minha-feature`.
5. Abra um **pull request** no GitHub.