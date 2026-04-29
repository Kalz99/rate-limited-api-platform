const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const apiKeyMiddleware = require('../middleware/apiKeyMiddleware');

router.get('/stats', apiKeyMiddleware, (req, res) => {
    res.json({ message: "Success" });
});


module.exports = router;