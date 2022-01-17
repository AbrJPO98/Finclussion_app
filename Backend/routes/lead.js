const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');

router.post('/registerLead', leadController.registerLead);
router.put('/update', leadController.updateLead);

module.exports = router;