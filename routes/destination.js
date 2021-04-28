const express = require('express');
const router = express.Router();
const destinationCtrl = require('../controllers/destination');
const destination = require('../models/destination');

router.get('/', destinationCtrl.index);
router.get('/new', destinationCtrl.new);
router.get('/:id', destinationCtrl.show);
router.post('/', destinationCtrl.create);
router.delete('/:id', destinationCtrl.delete);
router.get('/:id/edit', destinationCtrl.edit);
router.put('/:id', destinationCtrl.update);

// for user comments

router.post('/:id', destinationCtrl.addComment);
router.delete('/:id', destinationCtrl.deleteComment);

module.exports = router;