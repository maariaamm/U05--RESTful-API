const CarAd = require('../models/CarAdModel');
const User = require('../models/Usermodel');
const mongoose = require('mongoose');


// Fetch all Car Ads
const getCarAds = async (req, res) => {
    try {
        const carAds = await CarAd.find().populate('user');  
        res.status(200).json(carAds);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong, please try again later!', error });
    }
};

// Fetch Car Ad by Id
const getCarAdById = async (req, res) => {
    try {
        const carAd = await CarAd.findById(req.params.id).populate('user');
        if (!carAd) {
            return res.status(404).json({ message: 'Car ad not found' });
        }
        res.json(carAd);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong, please try again later!', error });
    }
};

// Create new Car Ad
const createCarAd = async (req, res) => {
    try {
        const imageUrl = req.file
        ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
        : req.body.imageUrl || null;
      
      const carAdData = {
        ...req.body,
        imageUrl,
      };
  
      const newCarAd = new CarAd(carAdData);
      const savedAd = await newCarAd.save();
  
      res.status(201).json(savedAd);
    } catch (error) {
      res.status(500).json({
        message: 'Something went wrong while creating ad.. please try again later!',
        error
      });
    }
  };

// Update Car Ad
const updateCarAd = async (req, res) => {
    try {
        const updatedCarAd = await CarAd.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (!updatedCarAd) {
            return res.status(404).json({ message: 'Car ad not found' });
        }

        res.json(updatedCarAd);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete Car Ad
const deleteCarAd = async (req, res) => {
    try {
        const deletedCarAd = await CarAd.findByIdAndDelete(req.params.id);
        if (!deletedCarAd) {
            return res.status(404).json({ message: 'Car ad not found' });
        }
        res.json({ message: 'Car ad deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong, please try again later!', error });
    }
};

module.exports = {
    getCarAds,
    getCarAdById,
    createCarAd,
    updateCarAd,
    deleteCarAd
};