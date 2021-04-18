const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema({

}, { timestamps: true });

const commentsSchema = new Schema({

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
    menu: [menuSchema],
    image: {
        type: String,
        default: ''
    },
    comments: [commentsSchema],
}, { timestamps: true });

module.exports = mongoose.model('Destination', destinationSchema);