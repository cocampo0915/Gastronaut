const express = require('express');
const router = express.Router();
const menuCtrl = require('../controllers/menu');

router.get('/destinations/:id/menu/new', menuCtrl.new);
router.get('/destinations/:id', menuCtrl.return);
router.post('/destinations/:id/menu', menuCtrl.create);
router.delete('/menu/:id', menuCtrl.delete);
router.get('/menu/:id/edit', menuCtrl.edit);
router.put('/menu/:id', menuCtrl.update);

module.exports = router;