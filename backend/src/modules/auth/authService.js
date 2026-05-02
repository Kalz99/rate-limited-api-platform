const bcrypt = require('bcryptjs');
const userRepository = require('../users/userRepository');
const crypto = require('crypto');
class UserService {
  /**
   * Register a user using the repository
   * @param {string} username 
   * @param {string} email 
   * @param {string} password 
   */
  async register(username, email, password, plan) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const apiKey = crypto.randomBytes(15).toString('hex');
      let limit;
      switch (plan.toLowerCase()) {
        case 'free':
          limit = 10;
          break;
        case 'pro':
          limit = 500;
          break;
      }

      const user = {
        PK: `USER#${email}`,
        SK: "PROFILE",
        username: username,
        email: email,
        password: hashedPassword,
        apiKey: apiKey,
        plan: plan.toLowerCase(),
        limit: limit,
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
