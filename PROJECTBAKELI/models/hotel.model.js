const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
    title: 
    { type: String,
         required: true
         },
    address: 
    { type: String,
         required: true 
        },
    price: 
    { type: Number, 
        required: true 
    },
    email: 
    { type: String, 
        required: true 
    },
    telephone: 
    { type: String,
         required: true
         },
    devise: 
    { type: String,
         required: true
         },
    photo: 
    { type: String,
         required: true 
        }
});

module.exports = mongoose.model('Hotel', HotelSchema);
