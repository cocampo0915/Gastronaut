const Destination = require('../models/destination');
const User = require('../models/user');

module.exports = {
    addComment,
    deleteComment,
}

function addComment(req, res) {
    Destination.findById(req.params.id, function(err, destination) {
        // pushes the comment to the destination's comments array
        destination.comments.push(req.body);
        // find the user that's creating the comment
        User.findById(req.user, function(err, user) {
            // pushes the comment into the user's array of comments
            user.reviewedDest.push(req.params.id);
            user.save(function(err) { 
                console.log(err);
            });
        });
        destination.save(function(err) {
            res.redirect(`/destinations/${destination._id}`);
        });
    });
}

function deleteComment(req, res) {
    // Find the destination of the comment
    Destination.findById(req.params.id, function(err, dest) {
        for (i = 0; i < dest.comments.length; i++) {
            // find the comment written by the user
            if (dest.comments[i].writtenBy.toString() === req.user.id.toString()) {
                // remove that comment from the array in the destinations model
                dest.comments.splice(i, 1);
                break;
            };
        };

        // Find the user that wrote the comment
        User.findById(req.user, function(err, user) {
            for (i = 0; i < user.reviewedDest.length; i++ ) {
                // remove that comment from the user's comments array
                if (user.reviewedDest[i].toString() === req.params.id.toString()) {
                    user.reviewedDest.splice(i, 1);
                };
            };
            // Save to user
            user.save(function(err) {
                console.log(err);
            });
        });
        
        // Save to destination
        dest.save(function(err) {
            res.redirect(`/destinations/${dest._id}`);
        });
    });
}