const Destination = require('../models/destination');
const Menu = require('../models/menu');

module.exports = {
    new: newMenuItem,
    create,
    delete: deleteMenuItem,
    edit,
    update,
    return: returnToDestination
};

function newMenuItem(req, res) {
    Destination.findById(req.params.id, function(err, destination) {
        Menu.find( {destination: destination._id}, function(err, menuItems) {
            res.render('menu/new', {
                title: 'Add Menu Item',
                menuItems,
                destinationId: req.params.id
            });
        });
    });
}

function create(req, res) {

    req.body.destination = req.params.id;

    Destination.findById(req.params.id, function(err, destination) {
        Menu.find({}, function(err, menuItems) {
            let existingMenu = menuItems.map( m => m.name);
            if (existingMenu.includes(req.body.name)) {
                res.redirect(`/destinations/${destination._id}/menu/new`);
            } else {
                Menu.create(req.body, function(err, menu) {
                    res.redirect(`/destinations/${destination._id}/menu/new`);
                });
            }
        });
    });
}

function deleteMenuItem(req, res) {
    Menu.findByIdAndDelete(req.params.id, function(err, menu) {
        res.redirect(`/destinations/${menu.destination}`);
    });
}

function edit(req, res) {

}

function update(req, res) {

}

function returnToDestination(req, res) {
    Destination.findById(req.params.id, function(err, destination) {
        res.redirect(`/destinations/${destination._id}`);
    });
}