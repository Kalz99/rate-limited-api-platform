const apiService = require('./apiService');
const redis = require('../../config/redis');

const validateEmail = async (req, res, next) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const cacheKey = `email:${email}`;


        const cachedData = await redis.get(cacheKey);

        if (cachedData) {
            console.log("CACHE");

            return res.json({
                success: true,
                source: "cache",
                data: JSON.parse(cachedData)
            });
        }


        console.log("SERVER");

        const result = apiService.validateEmail(email);


        await redis.set(cacheKey, JSON.stringify(result), { EX: 60 });

        res.json({
            success: true,
            source: "server",
            data: result
        });

    } catch (err) {
        next(err);
    }
};

const checkPassword = async (req, res, next) => {
    try {
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }
        const cacheKey = `password:${password}`;

        const cachedData = await redis.get(cacheKey);

        if (cachedData) {
            console.log("CACHE");

            return res.json({
                success: true,
                source: "cache",
                data: JSON.parse(cachedData)
            });
        }
        const result = apiService.checkPassword(password);

        await redis.set(cacheKey, JSON.stringify(result), { EX: 60 });

        res.json({
            success: true,
            source: "server",
            data: result
        });


    } catch (err) {
        next(err);
    }
};

const getIP = async (req, res, next) => {
    try {
        const { ip } = req.query;


        const cacheKey = `ip:${ip}`;
        const cachedData = await redis.get(cacheKey);

        if (cachedData) {
            console.log("CACHE");

            return res.json({
                success: true,
                source: "cache",
                data: JSON.parse(cachedData)
            });
        }

        const result = apiService.getIPInfo(ip || req.ip);
        await redis.set(cacheKey, JSON.stringify(result), { EX: 60 });

        res.json({
            success: true,
            source: "server",
            data: result
        });

    } catch (err) {
        next(err);
    }
};

module.exports = {
    validateEmail,
    checkPassword,
    getIP
};