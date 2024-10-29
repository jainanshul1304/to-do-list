const { transporter } = require("../nodemailer");
const database = require("../db/db");

const sendEmail = async(recipient, subject, text) => {
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

    await database.execute(
      "UPDATE mailStatus SET status = ? WHERE recipient_mail_id = ? AND recipient_mail_subject = ? AND recipient_mail_text = ?",
      ["failed", recipient, subject, text]
    );
    return Promise.reject();
  }
  
};



module.exports = { sendEmail};
