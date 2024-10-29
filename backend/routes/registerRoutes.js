const express = require('express');
const { registrationHandler } = require('../controllers/registrationController');
const router = express.Router();

router.post('/register',registrationHandler);

module.exports = router;