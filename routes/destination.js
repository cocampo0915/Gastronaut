const express = require('express');
const router = express.Router();
const destinationCtrl = require('../controllers/destination');

router.get('/', destinationCtrl.index);
router.get('/new', destinationCtrl.new);
router.get('/:id', destinationCtrl.show);
router.post('/', destinationCtrl.create);
router.delete('/:id', destinationCtrl.delete);
router.get('/:id/edit', destinationCtrl.edit);
router.put('/:id', destinationCtrl.update);


function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) return next();
    res.redirect('/auth/google');
}

module.exports = router;