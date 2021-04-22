const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
    username: {
        type: String,
    },
    text: {
        type: String,
    }
}, { timestamps: true });

const destinationSchema = new Schema({
    name: {
        type: String,
    },
    city: {
            type: String,
    },
    state: {
            type: String,
    },
    country: {
            type: String,
    },
    cuisine: [String],
    category: [String],
    price: {
        type: String,
        enum: ['$', '$$', '$$$', '$$$$'],
    },
    image: {
        type: String,
        default: ''
    },
    comments: [commentsSchema],
}, { timestamps: true });

module.exports = mongoose.model('Destination', destinationSchema);