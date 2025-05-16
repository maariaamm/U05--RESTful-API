const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const UserRoutes = require('./routes/UserRoutes');
const CarAdRoutes = require('./routes/CarAdRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', UserRoutes);
app.use('/api/carAds', CarAdRoutes);

app.get('/', (req, res) => {
  res.send('API is live!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
