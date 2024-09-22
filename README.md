# Archref Node.js

## Visão Geral

**Archref** é uma aplicação **Node.js** modular, escalável e altamente configurável, que segue as melhores práticas de **Clean Architecture**, **SOLID**, e **Injeção de Dependência** utilizando o **Awilix**. O projeto utiliza **MongoDB** como banco de dados e **RabbitMQ** como sistema de mensageria, com suporte para **Swagger Autogen** para a geração automática de documentação da API.

### Principais Tecnologias:

- **Node.js** (v20.16.0)
- **Express.js** para o servidor HTTP
- **MongoDB** como banco de dados NoSQL
- **Mongoose** como ORM para MongoDB
- **Awilix** para injeção de dependência
- **Joi** para validação de schemas
- **Swagger** para documentação automática da API
- **Docker** e **Docker Compose** para o ambiente de contêineres
- **RabbitMQ** para mensagens AMQP (opcional, para expansão futura)

## Estrutura do Projeto

```bash
/config
  ├── local.json                   # Configurações de ambiente local
  ├── env.json                     # Configurações de produção (placeholders com $vault)
  └── config.js                    # Script para carregar as configurações corretas

/src
  /application
    /services
      └── userService.js            # Serviço de lógica de negócios de usuários
  
  /container
    └── container.js               # Configuração de Injeção de Dependência (Awilix)

  /domain
    /repositories
      └── userRepository.js         # Repositório de usuários (interage com o banco via Mongoose)

  /infra
    /db
      ├── db.js                     # Script de conexão ao MongoDB
      └── models
          └── User.js               # Modelo Mongoose do usuário

  /interfaces
    /http
      /controllers
        └── userController.js       # Controlador de requisições HTTP de usuários
      /routes
        └── userRoutes.js           # Definição das rotas HTTP de usuários
      /schemas
        └── userSchema.js           # Schemas Joi para validação das rotas

  /middlewares
    ├── asyncMiddleware.js          # Middleware para lidar com erros assíncronos
    └── validationMiddleware.js     # Middleware de validação para schemas Joi

  /docs
    ├── generateSwagger.js          # Geração automática de documentação Swagger
    ├── parseJoiSchema.js           # Conversão de schemas Joi para Swagger
    └── swaggerDocGenerator.js      # Geração de documentação Swagger a partir das rotas
    └── swagger.json                # Documentação Swagger gerada

app.js                              # Arquivo principal para inicialização do servidor e conexão com o MongoDB
docker-compose.yml                  # Docker Compose para MongoDB, Mongo Express, e RabbitMQ
Dockerfile                          # Dockerfile para rodar a aplicação
package.json                        # Dependências e scripts NPM
```

## Funcionalidades

### 1. **Injeção de Dependência com Awilix**
- Todo o projeto segue o princípio de **Injeção de Dependência**, onde os serviços, repositórios e controladores são resolvidos automaticamente com **Awilix**. Isso melhora a modularidade e facilita testes e manutenção.

### 2. **Documentação Automática da API com Swagger**
- A documentação da API é gerada automaticamente a partir dos **schemas Joi**. O arquivo **swagger.json** é gerado dinamicamente e pode ser visualizado através do **Swagger UI**.

### 3. **Validação de Dados com Joi**
- Todas as entradas da API (headers, body, params) são validadas utilizando **Joi**, garantindo que os dados estejam no formato esperado antes de serem processados.

### 4. **MongoDB e Mongoose**
- **Mongoose** é utilizado como ORM para interagir com o banco de dados **MongoDB**. O esquema de usuários é definido no arquivo `User.js`, e as operações de CRUD são realizadas pelo `userRepository.js`.

### 5. **Arquitetura Limpa e Escalável**
- O projeto segue uma arquitetura limpa (Clean Architecture), separando camadas de domínio, aplicação, infraestrutura e interfaces. Isso permite fácil escalabilidade e extensão, como a adição de **RabbitMQ** para mensageria.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (v20 ou superior)
- **Docker** e **Docker Compose**
- **MongoDB** localmente ou usando Docker
- **RabbitMQ** (opcional, para mensageria)

## Instalação

1. **Clonar o repositório**:

```bash
git clone https://github.com/seu-usuario/archref.git
cd archref
```

2. **Instalar dependências**:

```bash
npm install
```

3. **Configurar variáveis de ambiente**:

- As configurações para ambiente local estão em **`config/local.json`**.
- Para ambiente de produção, as variáveis dinâmicas podem ser configuradas no **`env.json`**.

4. **Configurar Docker** (opcional):

O projeto utiliza **MongoDB**, **Mongo Express** e **RabbitMQ** via Docker. Se você quiser rodar esses serviços em contêineres:

```bash
docker-compose up -d
```

Isso iniciará o MongoDB, o Mongo Express (interface gráfica) e o RabbitMQ.

## Rodando o Projeto

### Ambiente de Desenvolvimento

Para rodar o servidor no ambiente de desenvolvimento:

```bash
npm run dev
```

Isso vai iniciar o servidor na porta 3000 e gerar o arquivo **swagger.json** automaticamente para a documentação da API.

### Acessando a Documentação Swagger

Após iniciar o servidor, a documentação da API pode ser acessada em:

```
http://localhost:3000/api/docs
```

### Ambiente de Produção

Para rodar o servidor no ambiente de produção:

```bash
NODE_ENV=production npm start
```

## Estrutura das Rotas

### POST `/users`
- **Descrição**: Cria um novo usuário.
- **Validação**: 
  - Headers: `x-api-key` (obrigatório)
  - Body: `name`, `email`, `age` (todos obrigatórios)
  
### GET `/users/:id`
- **Descrição**: Busca um usuário por ID.
- **Validação**: 
  - Headers: `x-api-key` (obrigatório)
  - Params: `id` (obrigatório, 24 caracteres)

### PUT `/users/:id`
- **Descrição**: Atualiza um usuário.
- **Validação**:
  - Headers: `x-api-key` (obrigatório)
  - Params: `id` (obrigatório)
  - Body: `name`, `email`, `age` (opcionais)

### DELETE `/users/:id`
- **Descrição**: Remove um usuário.
- **Validação**:
  - Headers: `x-api-key` (obrigatório)
  - Params: `id` (obrigatório)

## Testes

Você pode adicionar testes automatizados usando ferramentas como **Mocha**, **Chai** ou **Jest**. Testes unitários devem ser escritos para os serviços, controladores e repositórios.

## Melhorias Futuras

- **Mensageria com RabbitMQ**: Implementar handlers AMQP para processar mensagens de filas no futuro.
- **Cache**: Implementar caching para otimizar as operações de leitura de dados.
- **Testes Automatizados**: Adicionar uma estrutura de testes automatizados para garantir a qualidade do código.

## Contribuição

Se quiser contribuir para o projeto:

1. Faça um fork do repositório.
2. Crie uma nova branch (`git checkout -b feature/nova-feature`).
3. Commit suas alterações (`git commit -m 'Add some feature'`).
4. Dê um push na branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.