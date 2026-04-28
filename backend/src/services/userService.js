const userRepository = require('../repositories/userRepository');

class UserService {
  /**
   * Register a user using the repository
   * @param {Object} userData 
   */
  async register(userData) {
    try {
      // In a real app, you'd hash the password here before saving
      return await userRepository.create(userData);
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

      // In a real app, you'd compare the hashed password here
      // For now, we assume success if a user is found (placeholder logic)
      return user;
    } catch (error) {
      throw new Error(`Service Error: ${error.message}`);
    }
  }
}

module.exports = new UserService();
