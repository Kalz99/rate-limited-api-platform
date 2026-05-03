const jwt = require('jsonwebtoken');
const userRepository = require('./userRepository');


class UserController {
    /**
     * Get current user profile
     */
    getMe = async (req, res) => {
        try {
            const user = await userRepository.findByEmail(req.user.email);

            if (user) {
                return res.status(200).json({
                    success: true,
                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        plan: user.plan,
                        limit: user.limit,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt,
                        apiKey: user.apiKey
                    }
                });
            }

            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Failed to get user profile',
                error: error.message
            });
        }
    };


    getUsage = async (req, res) => {
        try {
            const user = await userRepository.findByEmail(req.user.email);

            if (user) {
                return res.status(200).json({
                    success: true,
                    user: {
                        username: user.username,
                        email: user.email,
                        plan: user.plan,
                        limit: user.limit,
                        dailyLimit: user.dailyLimit
                    }
                });
            }

            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Failed to get user profile',
                error: error.message
            });
        }
    };
}

module.exports = new UserController();