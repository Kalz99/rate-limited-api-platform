
const redis = require('../config/redis');

const rateLimit = async (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    const limit = req.user.limit; // from DB
    const key = `rate:${apiKey}`;

    let requests = await redis.get(key);

    if (!requests) {
        await redis.set(key, 1, { EX: 60 }); // 60 sec window
        return next();
    }

    if (parseInt(requests) >= limit) {
        return res.status(429).json({
            message: "Rate limit exceeded"
        });
    }

    await redis.incr(key);

    next();
};

module.exports = rateLimit;