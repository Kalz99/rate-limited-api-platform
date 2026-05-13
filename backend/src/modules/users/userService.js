const userRepository = require('./userRepository');
const apiKeyService = require('../../services/apiKeyService');

class UserService {
    /**
     * Get user profile by email
     * @param {string} email 
     * @returns {Promise<Object>}
     */
    async getUserProfile(email) {
        try {
            const user = await userRepository.findByEmail(email);
            if (!user) {
                return null;
            }

            return {
                id: user.id,
                username: user.username,
                email: user.email,
                plan: user.plan,
                limit: user.limit,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                apiKey: user.apiKey
            };
        } catch (error) {
            throw new Error(`Service Error: ${error.message}`);
        }
    }

    async getUsageHistory(user, days) {
        const PK = `USER#${user.email}`;


        const items = await userRepository.getUsageRecords(PK);

        const usageMap = {};

        items.forEach(item => {
            const date = item.SK.split('#')[1];
            usageMap[date] = item.usage;
        });

        const history = [];

        for (let i = days - 1; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);

            const date = d.toISOString().split('T')[0];

            history.push({
                date,
                count: usageMap[date] || 0
            });
        }

        return history;
    }

    /**
     * Get user usage information by email
     * @param {string} email 
     * @returns {Promise<Object>}
     */
    async getUserUsage(email) {
        try {
            const user = await userRepository.findByEmail(email);
            if (!user) {
                return null;
            }

            return {
                username: user.username,
                email: user.email,
                plan: user.plan,
                limit: user.limit,
                dailyLimit: user.dailyLimit
            };
        } catch (error) {
            throw new Error(`Service Error: ${error.message}`);
        }
    }

    async regenerateApiKey(email) {
        try {
            const user = await userRepository.findByEmail(email);
            if (!user) {
                return null;
            }

            const newApiKey = apiKeyService.generateApiKey();
            const updatedUser = await userRepository.updateUser(email, { apiKey: newApiKey });

            return updatedUser.apiKey;
        } catch (error) {
            throw new Error(`Service Error: ${error.message}`);
        }
    }

    async getUsageToday(user) {
        try {
            const usage = await userRepository.getUsage(user.email, new Date().toISOString().split('T')[0]);
            return usage;
        } catch (error) {
            throw new Error(`Service Error: ${error.message}`);
        }
    }
}

module.exports = new UserService();
