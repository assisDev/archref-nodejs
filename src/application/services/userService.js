// src/application/services/userService.js
module.exports = ({ userRepository }) => ({
  createUser: async (userData) => {
    return userRepository.create(userData);
  },

  findUserById: async (id) => {
    return userRepository.findById(id);
  },

  updateUser: async (id, userData) => {
    return userRepository.updateById(id, userData);
  },

  deleteUser: async (id) => {
    return userRepository.deleteById(id);
  }
});
