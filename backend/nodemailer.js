const nodemailer = require("nodemailer");
require('dotenv').config();
const transporter = nodemailer.createTransport({
    service : process.env.MAIL_SERVICE,
    host : process.env.MAIL_HOST,
    port : process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE,
    auth:{
        user: process.env.MAILER_ID,
        pass : process.env.MAILER_PASSWORD
    },
    pool : true,
    maxMessages : Infinity
})

module.exports = {transporter};