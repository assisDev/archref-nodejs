// /repositories/userRepository.js
const User = require('../../infra/db//models/User'); // Supondo que User seja o modelo Mongoose

const create = async (userData) => {
  return await User.create(userData);
};

const findById = async (userId) => {
  return await User.findById(userId);
};

const findAll = async () => {
  return await User.find({});
};

const updateById = async (userId, updateData) => {
  return await User.findByIdAndUpdate(userId, updateData, { new: true });
};

const deleteById = async (userId) => {
  return await User.findByIdAndDelete(userId);
};

module.exports = {
  create,
  findById,
  findAll,
  updateById,
  deleteById,
};
