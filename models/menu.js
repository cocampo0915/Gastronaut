const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    name: {
        type: String,
    },
    image: {
        type: String,
    },
    description: {
        type: String,
    },
    destination: {
        type: Schema.Types.ObjectId,
        ref: 'Destination'
    }
}, { timestamps: true });

module.exports = mongoose.model('Menu', menuSchema);