const Destination = require('../models/destination');

module.exports = {
    index,
    show,
    new: newDestination,
    create,
    delete: deleteOne,
};

function index(req, res) { // good
    Destination.find({}, function(err, destinations) {
        res.render('destinations/index', { title: 'All Destinations', destinations});
    });
}

function show(req, res) { // good
    Destination.findById(req.params.id, function(err, destination) {
        res.render('destinations/show', { title: 'Destination Detail', destination });
    });
}

function newDestination(req, res) { // good
    const price = Destination.schema.path('price').enumValues;
    res.render('destinations/new', { title: 'Add Destination', price });
}

function create(req, res) { // good
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }

    Destination.create(req.body, function(err, destination) {
        if (err) return res.redirect('/destinations/new');
        res.redirect('/destinations');
    })
}

function deleteOne(req, res) { // oops forgot this one
    Destination.findByIdAndDelete(req.params.id, function(err, destination) {
        res.redirect(`/destinations`)
    });
}