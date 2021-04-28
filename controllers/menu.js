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
                destinationId: req.params.id,
                user: req.user
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
    Menu.findById(req.params.id, function(err, menu) {
        if (err) return res.redirect(`/destinations/${menu.destination}`);
        res.render('menu/edit', { 
            title: 'Update Menu Item',
            menuId: req.params.id, 
            menu,  
        });
    })
}

function update(req, res) {
    if(req.body.done === 'on') {
        req.body.done = true;
    } else {
        req.body.done = false;
    }
    const id = req.params.id;
    Menu.findOne( {_id: id} , function(err, menu) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        if (req.body.name) {
            menu.name = req.body.name;
        }
        if (req.body.image) {
            menu.image = req.body.image;
        }
        if (req.body.description) {
            menu.description = req.body.description;
        }

        menu.save(function(err) {
            if (err) {
                return res.send();
            }
            res.redirect(`/destinations/${menu.destination}` );              
        });
    
    });
}

function returnToDestination(req, res) {
    Destination.findById(req.params.id, function(err, destination) {
        res.redirect(`/destinations/${destination._id}`);
    });
}