const mongoose = require('mongoose');

// Define schema for travel information
const travelSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    people: {
        type: Number,
        required: true
    },
    mode: {
        type: String,
        enum: ['bus', 'train', 'flight', 'sharing_cab', 'other'],
        required: true
    },
    description: {
        type: String
    },
    userId: {
        type:String,
        required:true
    }
});

// Create a model based on the schema
const Travel = mongoose.model('Travel', travelSchema);

module.exports = Travel;
