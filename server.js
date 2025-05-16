const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const UserRoutes = require('./routes/UserRoutes');
const CarAdRoutes = require('./routes/CarAdRoutes');
const cors = require('cors');


mongoose.connect(process.env.MONGODB_URI, {
})

.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("User API is live!");
});

app.use('/api/users', UserRoutes);
app.use('/api/carAds', CarAdRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
