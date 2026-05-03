const jwt = require('jsonwebtoken');
const userService = require('./authService');

class AuthController {
  /**
   * Register a new user
   */
  register = async (req, res) => {
    try {
      const { username, email, password, plan } = req.body;

      const newUser = await userService.register(username, email, password, plan);

      return res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user: { id: newUser.pk, username: newUser.username, email: newUser.email }
      });
    } catch (error) {
      if (error.name === "ConditionalCheckFailedException") {
        return res.status(400).json({
          success: false,
          message: "User already exists"
        });
      }
      return res.status(500).json({
        success: false,
        message: 'Registration failed',
        error: error.message
      });

    }
  };

  /**
   * Login user and return JWT
   */
  login = async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await userService.login(email, password);

      if (user) {
        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET || 'your_super_secret_key_here',
          { expiresIn: '1h' }
        );

        return res.status(200).json({
          success: true,
          token: token
        });
      }

      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Login failed',
        error: error.message
      });
    }
  };
}

module.exports = new AuthController();

