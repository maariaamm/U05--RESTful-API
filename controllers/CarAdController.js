const CarAd = require('../models/CarAdModel');
const User = require('../models/Usermodel');
const mongoose = require('mongoose');

// Fetch all Car Ads
const getCarAds = async (req, res) => {
    try {
        const carAds = await CarAd.find().populate('user');
        res.status(200).json(carAds);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

// Fetch Car Ad by Id
const getCarAdById = async (req, res) => {
    try {
        const carAd = await CarAd.findById(req.params.id).populate('user');
        if (!carAd) return res.status(404).json({ message: 'Car ad not found' });
        res.json(carAd);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

// Create new Car Ad (protected)
const createCarAd = async (req, res) => {
    try {
        const imageUrl = req.file
            ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
            : req.body.imageUrl || null;

        const carAdData = {
            ...req.body,
            imageUrl,
            user: req.user.id
        };

        const newCarAd = new CarAd(carAdData);
        const savedAd = await newCarAd.save();
        res.status(201).json(savedAd);
    } catch (error) {
        res.status(500).json({ message: 'Error creating ad', error });
    }
};

// Update Car Ad (protected)
const updateCarAd = async (req, res) => {
    try {
        const carAd = await CarAd.findById(req.params.id);
        if (!carAd) return res.status(404).json({ message: 'Car ad not found' });

        // Kontrollera att det är användarens egen annons
        if (carAd.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to update this ad' });
        }

        const updatedCarAd = await CarAd.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        res.json(updatedCarAd);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete Car Ad (protected)
const deleteCarAd = async (req, res) => {
    try {
        const carAd = await CarAd.findById(req.params.id);
        if (!carAd) return res.status(404).json({ message: 'Car ad not found' });

        // Kontrollera att det är användarens egen annons
        if (carAd.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to delete this ad' });
        }

        await carAd.deleteOne();
        res.json({ message: 'Car ad deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

module.exports = {
    getCarAds,
    getCarAdById,
    createCarAd,
    updateCarAd,
    deleteCarAd
};
