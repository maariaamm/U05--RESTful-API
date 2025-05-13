const express = require('express');
const mongoose = require('mongoose');
const UserRoutes = require('./routes/UserRoutes');
const CarAdRoutes = require('./routes/CarAdRoutes');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
})
.then(() => console.log(' Succesfully connected to MongoDB '))
.catch(err => console.error(' Error connecting to MongoDB', err));


const app = express();
const PORT = 3000;
 
app.use(express.json()); 


app.get("/", (req, res) => {
    res.send("User API is live!");
});

app.use('/api/users', UserRoutes);

app.use('/api/carAds', CarAdRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});