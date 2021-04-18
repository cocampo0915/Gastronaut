const mongoose = require('mongoose');
const dbURL = 'mongodb+srv://admin:abc1234@cluster0.fvwdp.mongodb.net/gastronaut?retryWrites=true&w=majority';
const db = mongoose.connection; // shortcut to mongoose.connection object

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

db.on('connected', function() {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});