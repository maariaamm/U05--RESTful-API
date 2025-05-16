const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const UserRoutes = require('./routes/UserRoutes');
const CarAdRoutes = require('./routes/CarAdRoutes');



mongoose.connect(process.env.MONGODB_URI, {
})

.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  const upload = multer({ storage });
  
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get("/", (req, res) => {
    res.send("User API is live!");
});

app.use('/api/users', UserRoutes);
app.use('/api/carAds', CarAdRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
