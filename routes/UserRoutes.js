const express = require('express');
const router = express.Router();
const User = require('../models/Usermodel');
const { registerUser, loginUser } = require('../controllers/UserController');


// Endpoint 
router.post('/register', registerUser);

// Endpoint 
router.post('/login', loginUser);

module.exports = router;