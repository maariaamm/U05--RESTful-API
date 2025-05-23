const User = require("../models/Usermodel");
const mongoose = require("mongoose");


const CarAdModelschema = new mongoose.Schema({

    brand: {
        type: String, required: true
    },
    description: {
        type: String, required: true
    },
  
    model: {
        type: String, required: true
    },
    year: {
        type: Number, required: true
    },

    fuelType: {
        type: String, required: true
    },

    price: {
        type: Number, required: true
    },

    createdAt: {
        type: Date, default: Date.now
    },

    imageUrl: {
        type: String,
        required: false
      },
  

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
   
});

module.exports = mongoose.model("CarAd", CarAdModelschema);