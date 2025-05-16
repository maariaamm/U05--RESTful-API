const express = require('express');
const router = express.Router();
const CarAdController = require('../controllers/CarAdController');


// Endpoints

router.get('/', CarAdController.getCarAds);

router.get('/:id', CarAdController.getCarAdById);

router.post('/', CarAdController.createCarAd);

router.put('/:id', CarAdController.updateCarAd);

router.delete('/:id', CarAdController.deleteCarAd);

module.exports = router;
