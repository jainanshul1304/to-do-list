const { transporter } = require("../nodemailer");
const database = require("../db/db");
const MailStatus = require("../models/mailStatusModel");
const sendEmail = async (recipient, subject, text) => {
  try {
    const mailOptions = {
      from: process.env.MAILER_ID,
      to: recipient,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${recipient}`);
    return Promise.resolve();
  } catch (error) {
    console.error(`Error sending email to ${recipient}:`, error.message);

    await MailStatus.update(
      { recipient_mail_status: "failed" },
      {
        where: {
          recipient_mail_id: recipient,
          recipient_mail_subject: subject,
          recipient_mail_text: text,
        },
      }
    );
    return Promise.reject();
  }
};

module.exports = { sendEmail };
