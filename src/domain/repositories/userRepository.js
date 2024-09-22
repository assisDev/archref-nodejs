// src/domain/repositories/userRepository.js
module.exports = ({ User }) => ({
  create: async (userData) => {
    return new User(userData).save();
  },

  findById: async (id) => {
    return User.findById(id);
  },

  updateById: async (id, userData) => {
    return User.findByIdAndUpdate(id, userData, { new: true });
  },

  deleteById: async (id) => {
    return User.findByIdAndDelete(id);
  }
});
