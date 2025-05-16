const express = require('express');
const router = express.Router();
const CarAdController = require('../controllers/CarAdController');
const multer = require('multer');
const path = require('path');

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

// Endpoints

router.get('/', CarAdController.getCarAds);

router.get('/:id', CarAdController.getCarAdById);

router.post('/', CarAdController.createCarAd);

router.put('/:id', CarAdController.updateCarAd);

router.delete('/:id', CarAdController.deleteCarAd);

module.exports = router;
