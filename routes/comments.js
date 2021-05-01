const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');

// POST to comments/:id
router.post('/:id', commentsCtrl.addComment);

// PUT to comments/:id
router.put('/:id/update', commentsCtrl.updateComment);

// DELETE comments/:id
router.delete('/:id', commentsCtrl.deleteComment);

module.exports = router;