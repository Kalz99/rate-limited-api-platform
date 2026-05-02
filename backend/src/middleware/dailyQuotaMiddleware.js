const quotaService = require('../modules/api/quotaService');

/**
 * Middleware to check and consume daily quota.
 * Expects req.user to be populated by apiKeyMiddleware.
 */
const dailyQuota = async (req, res, next) => {
    try {
        // req.user is already the full database record from apiKeyMiddleware
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized: User context missing"
            });
        }

        const allowed = await quotaService.checkAndConsume(req.user);

        if (!allowed) {
            return res.status(429).json({
                success: false,
                message: "Daily quota exceeded for your plan"
            });
        }

        next();
    } catch (err) {
        next(err);
    }
};

module.exports = dailyQuota;