const express = require('express');
const router = express.Router();
const mainController = require('../controllers/appController')
/* GET home page. */
router.get('/', mainController.main);
router.get('/registro', mainController.register)

module.exports = router;
