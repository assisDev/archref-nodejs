// src/interfaces/http/controllers/userController.js
module.exports = ({ userService }) => ({
  create: async (req, res) => {
    try {
      const newUser = await userService.createUser(req.body);
      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  findOne: async (req, res) => {
    try {
      const user = await userService.findUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  updateOne: async (req, res) => { 
    try {
      const updatedUser = await userService.updateUser(req.params.id, req.body);
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  deleteOne: async (req, res) => {
    try {
      const deletedUser = await userService.deleteUser(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
});
