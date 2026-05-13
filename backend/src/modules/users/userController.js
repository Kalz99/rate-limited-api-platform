const userService = require('./userService');

class UserController {
    /**
     * Get current user profile
     */
    getMe = async (req, res) => {
        try {
            const user = await userService.getUserProfile(req.user.email);

            if (user) {
                return res.status(200).json({
                    success: true,
                    user: user
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
            const usage = await userService.getUserUsage(req.user.email);

            if (usage) {
                return res.status(200).json({
                    success: true,
                    user: usage
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

    regenerateApiKey = async (req, res) => {
        try {
            const newApiKey = await userService.regenerateApiKey(req.user.email);
            return res.status(200).json({
                success: true,
                apiKey: newApiKey
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Failed to regenerate API key',
                error: error.message
            });
        }
    };

    getUsageHistory = async (req, res, next) => {
        try {
            const days = parseInt(req.query.days);

            const data = await userService.getUsageHistory(req.user, days);

            res.json({
                success: true,
                data
            });

        } catch (err) {
            next(err);
        }
    };

    getUsageToday = async (req, res, next) => {
        try {
            const data = await userService.getUsageToday(req.user);

            res.json({
                success: true,
                data
            });

        } catch (err) {
            next(err);
        }
    };
}

module.exports = new UserController();
