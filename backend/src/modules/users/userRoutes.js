const express = require('express');
const router = express.Router();

const userController = require('./userController');
const authMiddleware = require('../../middleware/authMiddleware');


router.get('/me', authMiddleware, userController.getMe);
router.get('/usage', authMiddleware, userController.getUsage);
router.post('/regenerate-api-key', authMiddleware, userController.regenerateApiKey);
router.get('/usage/history', authMiddleware, userController.getUsageHistory);

module.exports = router;