const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/userRepository');

class UserService {
  /**
   * Register a user using the repository
   * @param {string} username 
   * @param {string} email 
   * @param {string} password 
   */
  async register(username, email, password) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const userId = Date.now().toString();
      const user = {
        id: userId,
        PK: `USER#${userId}`,
        SK: "PROFILE",
        username: username,
        email: email,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      return await userRepository.createUser(user);
    } catch (error) {
      throw new Error(`Service Error: ${error.message}`);
    }
  }

  /**
   * Login a user using the repository
   * @param {string} email 
   * @param {string} password 
   */
  async login(email, password) {
    try {
      const user = await userRepository.findByEmail(email);

      if (!user) {
        return null;
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return null;
      }

      return user;
    } catch (error) {
      throw new Error(`Service Error: ${error.message}`);
    }
  }
}

module.exports = new UserService();
