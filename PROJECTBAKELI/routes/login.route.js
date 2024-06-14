const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Route for user login
router.post('/login', userController.loginUser);

module.exports = router;
