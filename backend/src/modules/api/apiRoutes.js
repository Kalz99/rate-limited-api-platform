const express = require('express');
const router = express.Router();

const apiKeyMiddleware = require('../../middleware/apiKeyMiddleware');
const rateLimitMiddleware = require('../../middleware/rateLimitMiddleware');
const apiController = require('../api/apiController');
const dailyQuotaMiddleware = require('../../middleware/dailyQuotaMiddleware');



router.post('/email/validate', apiKeyMiddleware, rateLimitMiddleware, dailyQuotaMiddleware, apiController.validateEmail);
router.post('/password/check', apiKeyMiddleware, rateLimitMiddleware, dailyQuotaMiddleware, apiController.checkPassword);
router.post('/ip/info', apiKeyMiddleware, rateLimitMiddleware, dailyQuotaMiddleware, apiController.getIP);


module.exports = router;