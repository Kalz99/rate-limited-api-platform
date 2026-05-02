const express = require('express');
const router = express.Router();

const apiKeyMiddleware = require('../../middleware/apiKeyMiddleware');
const rateLimitMiddleware = require('../../middleware/rateLimitMiddleware');
const apiController = require('../api/apiController');



router.post('/email/validate', apiKeyMiddleware, rateLimitMiddleware, apiController.validateEmail);
router.post('/password/check', apiKeyMiddleware, rateLimitMiddleware, apiController.checkPassword);
router.post('/ip/info', apiKeyMiddleware, rateLimitMiddleware, apiController.getIP);


module.exports = router;