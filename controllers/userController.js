// /controllers/userController.js
const userService = require('../services/userService');
const asyncMiddleware = require('../middlewares/asyncMiddleware');
const httpConstants = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
};

module.exports = {
  create: asyncMiddleware(async (req, res) => {
    const newUser = await userService.createUser(req.body);
    return res.status(httpConstants.CREATED).json(newUser);
  }),

  findOne: asyncMiddleware(async (req, res) => {
    const user = await userService.findUserById(req.params.id);
    return res.status(httpConstants.OK).json(user);
  }),

  updateOne: asyncMiddleware(async (req, res) => {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    return res.status(httpConstants.OK).json(updatedUser);
  }),

  deleteOne: asyncMiddleware(async (req, res) => {
    const deletedUser = await userService.deleteUser(req.params.id);
    return res.status(httpConstants.OK).json(deletedUser);
  }),
};
