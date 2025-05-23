const express = require('express');
const router = express.Router();
const CarAdController = require('../controllers/CarAdController');
const multer = require('multer');
const authenticateToken = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

// Public
router.get('/', CarAdController.getCarAds);
router.get('/:id', CarAdController.getCarAdById);

// Protected
router.post('/', authenticateToken, upload.single('imageUrl'), CarAdController.createCarAd);
router.put('/:id', authenticateToken, CarAdController.updateCarAd);
router.delete('/:id', authenticateToken, CarAdController.deleteCarAd);

module.exports = router;
