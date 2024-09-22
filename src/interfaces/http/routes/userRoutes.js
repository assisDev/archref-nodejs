// src/interfaces/http/routes/userRoutes.js
const userSchema = require('../schemas/userSchema');

module.exports = [
  {
    method: 'post',
    path: '/users',
    validation: {
      headers: userSchema.headers,
      body: userSchema.createUser,
    },
    handler: 'userController.create',
  },
  {
    method: 'get',
    path: '/users/:id',
    validation: {
      headers: userSchema.headers,
      params: userSchema.getUser,
    },
    handler: 'userController.findOne',
  },
  {
    method: 'put',
    path: '/users/:id',
    validation: {
      headers: userSchema.headers,
      params: userSchema.getUser,
      body: userSchema.updateUser,
    },
    handler: 'userController.updateOne',
  },
  {
    method: 'delete',
    path: '/users/:id',
    validation: {
      headers: userSchema.headers,
      params: userSchema.getUser,
    },
    handler: 'userController.deleteOne',
  },
];
