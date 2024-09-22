// /services/userService.js
const userRepository = require('../../domain/repositories/userRepository');

const createUser = async (userData) => {
  // Aqui poderia haver alguma lógica de negócio antes de criar o usuário
  const newUser = await userRepository.create(userData);
  return newUser;
};

const findUserById = async (userId) => {
  const user = await userRepository.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

const updateUser = async (userId, updateData) => {
  const updatedUser = await userRepository.updateById(userId, updateData);
  if (!updatedUser) {
    throw new Error('User not found or not updated');
  }
  return updatedUser;
};

const deleteUser = async (userId) => {
  const deletedUser = await userRepository.deleteById(userId);
  if (!deletedUser) {
    throw new Error('User not found or already deleted');
  }
  return deletedUser;
};

module.exports = {
  createUser,
  findUserById,
  updateUser,
  deleteUser,
};
