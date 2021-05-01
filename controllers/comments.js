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
            user.comments.push(req.params.id);
            user.save(function(err) { console.log(err) });
        });
        destination.save(function(err) {
            res.redirect(`/destinations/${destination._id}`);
        });
    });
}

function deleteComment(req, res) {
    // find destination of comment
    Destination.findById(req.params.id, function(err, destination) {
        // locate the user's comment
        for (comment of destination.comments) {
            if (comment.writtenBy.toString() === req.user.id.toString()) {
                comment.text = "";
                break;
            };
        };
        destination.save(function(err) {
            res.redirect(`/destinations/${destination._id}`);
        });
    });
}