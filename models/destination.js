const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
}, { timestamps: true });

module.exports = mongoose.model('Destination', destinationSchema);