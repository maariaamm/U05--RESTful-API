const mongoose = require('mongoose');
const User = require('../models/Usermodel');  
require('dotenv').config();  
const bcrypt = require('bcryptjs'); 

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log(' Connected to MongoDB'))
.catch(err => console.error(' Error connecting to MongoDB:', err));

const express = require('express');
const UserRoutes = require('./routes/UserRoutes');
const CarAdRoutes = require('./routes/CarAdRoutes');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {})
.then(() => console.log(' Successfully connected to MongoDB '))
.catch(err => console.error(' Error connecting to MongoDB', err));

const app = express();

// Här ska vi använda process.env.PORT
const PORT = process.env.PORT || 3000;  // Om process.env.PORT inte finns, använd 3000 som fallback
 
app.use(express.json()); 

app.get("/", (req, res) => {
    res.send("User API is live!");
});

app.use('/api/users', UserRoutes);
app.use('/api/carAds', CarAdRoutes);

// Servern ska lyssna på den port som Render ger
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
