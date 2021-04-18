const express = require('express');
const router = express.Router();
const destinationCtrl = require('../controllers/destination');

router.get('/', destinationCtrl.index);
router.get('/new', destinationCtrl.new);
router.get('/:id', destinationCtrl.show);
router.post('/', destinationCtrl.create);
router.get('/', destinationCtrl.delete);

module.exports = router;