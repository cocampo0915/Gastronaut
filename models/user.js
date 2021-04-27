const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    text: String,
    destination: {
        type: Schema.Types.ObjectId,
        ref: 'Destination'
    }
}, { timestamps: true });


const userSchema = new Schema({
    name: String,
    email: String,
    avatarURL: String,
    googleId: String,
    comments: [commentSchema]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);