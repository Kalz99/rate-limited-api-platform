const express = require('express');
const router = express.Router();

const userController = require('./userController');
const authMiddleware = require('../../middleware/authMiddleware');


router.get('/me', authMiddleware, userController.getMe);


module.exports = router;