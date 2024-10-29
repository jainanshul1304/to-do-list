const express = require('express');
const { sendEmailHandler } = require('../controllers/mailController');
const authenticateJWT = require('../utils/authenticateJWT');
const router = express.Router();


router.post('/send-mail',authenticateJWT ,sendEmailHandler);

module.exports = router;