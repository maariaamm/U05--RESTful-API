const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Usermodel');

// register new user
const registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        // check if credintials already exist
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists.' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: role || 'user',
        });

        const savedUser = await newUser.save();

        // Create JWT-token
        const token = jwt.sign(
            { id: savedUser._id, username: savedUser.username },
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.status(201).json({
            message: 'User registered successfully!',
            token,  
        });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong, try again later!', error });
    }
};

// Log in
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

      
        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login successful!',
            token,  
        });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong, try again later!', error });
    }
};
        
module.exports = {
    registerUser,
    loginUser,
};
