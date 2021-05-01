const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    text: String,
    writtenBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
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
    comments: [commentSchema],
}, { timestamps: true });

module.exports = mongoose.model('Destination', destinationSchema);