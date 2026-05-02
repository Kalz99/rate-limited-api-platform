const quotaRepository = require('./quotaRepository');

class QuotaService {
    async checkAndConsume(user) {
        const today = new Date().toISOString().split('T')[0];

        const usage = await quotaRepository.getUsage(user.PK, today);

        const limit = user.dailyLimit;

        if (usage >= limit) {
            return false;
        }

        await quotaRepository.incrementUsage(user.PK, today);

        return true;
    }
}

module.exports = new QuotaService();